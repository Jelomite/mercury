//everything here is responsible to parse the validation attribute inside of the form data.
//TODO: add documentation about the syntax of the validation string.

// strips out the equation sign of our equation
export const equation = command => /==|>=|<=|<|!=|>/.exec(command)[0];
//each side has an option for an operator, which means we need a function to strip that for us.
export const operator = command => /\+|-|\*|\/|\^/.test(command) ? /\+|-|\*|\/|\^/.exec(command)[0] : "";

// this function takes in a command as a string and creates an AST to be parsed later.
// the order of building the AST goes like this: equation sign -> operators -> attributes.
export const tokenizer = command => {
	const equationSign = equation(command);
	const expressions = command.split(equationSign);
	return {token: equationSign, data: // here we begin the root node of our tree.
		expressions.map(expr => {
			const operation = operator(expr);
			return operation ? { // if we have an operation - we have to go deeper, otherwise, we've reached the bottom of the AST.
				token: operation,
				data: expr.split(operation).map(attribute => ({
					token: "",
					data: attribute,
				})),
			} : {
				token: "",
				data: expr,
			};
		}),
	};
};

// convert path to actual numbers.
export const evaluator = (path, data) => {
	// the idea is to run the function recursively untill we reach a "value" node.
	// each time we go deeper in the recursion, we remove the first node from the path
	// and pass the new data object that gets us closer to the destination.
	const firstNode = path[0];

	if (firstNode === "value") { // our exit condition
		// in case the value is an array, we just return the sum of it (even if its an array of booleans - will be most of the time).
		return data.value.length > 1 ? data.value.reduce((a, i) => a + i) : data.value;
	}
	// to parse our path, we must first understand the structure of it:
	// i.e. parent[1].options.right[0].value
	// the syntax is built from few things:
	// 1. the dot (".") represents parent-child relation, everything between the dots we'll call a node.
	// 2. it always ends with value. because that's what we're after.
	// 3. a node can have an ending of [NUMBER]. this means we want to access an index, just like an array.
	// now that we know the syntax, and we're looking at the first node, we need to see if it has an array indexing ([NUMBER]).

	// we want to find the string index where the NUMBER is written, i.e. in "parent[1]" the dataIndexPointer == 7.
	const dataIndexPointer = /\[\d+\]/.test(firstNode) ? /\[\d+\]/.exec(firstNode).index + 1 : null;
	// so here we get the NUMBER inside of the brackets.
	const dataIndex = dataIndexPointer !== null ? parseInt(firstNode[dataIndexPointer]) : "";
	// what's the node itself? dataPath has you covered. it'll strip the indexing and keep only the node object path.
	const dataPath = dataIndexPointer ? firstNode.slice(0, dataIndexPointer - 1) : firstNode;

	// now we begin the fun part of the recursion, each time we check what is the path of our node and call the evaluation function.
	// as said before, the new arguments just slice the first node, and pass the new data.
	switch (dataPath) {
	case "parent":
		return evaluator(path.slice(1), dataIndex !== "" ? data.parent[dataIndex] : data.parent);
	case "options":
		return evaluator(path.slice(1), dataIndex !== "" ? data.options[dataIndex] : data.options);
	case "right":
		return evaluator(path.slice(1), dataIndex !== "" ? data.right[dataIndex] : data.right);
	case "left":
		return evaluator(path.slice(1), dataIndex !== "" ? data.left[dataIndex] : data.left);
	default: // we should never get here.
		return null;
	}
};

// the parser just goes over the AST and translates the tokens into mathematical operations.
export const parser = ({token, data}, struct) => {
	switch(token) {
	case "+":
		return parser(data[0], struct) + parser(data[1], struct);
	case "/":
		return parser(data[0], struct) / parser(data[1], struct);
	case "-":
		return parser(data[0], struct) - parser(data[1], struct);
	case "*":
		return parser(data[0], struct) * parser(data[1], struct);
	case "==":
		return parser(data[0], struct) === parser(data[1], struct);
	case ">=":
		return parser(data[0], struct) >= parser(data[1], struct);
	case "<=":
		return parser(data[0], struct) <= parser(data[1], struct);
	case "<":
		return parser(data[0], struct) < parser(data[1], struct);
	case "!=":
		return parser(data[0], struct) !== parser(data[1], struct);
	case ">":
		return parser(data[0], struct) > parser(data[1], struct);
	case "": // once we reach the end of the branch we evaluate the path using the evaluator function.
		return evaluator(data.split("."), struct);
	default:
		return null;
	}
};

// wrapping everything neatly into a single function.
export const compile = (command, data) => {
	return parser(tokenizer(command), data);
};
