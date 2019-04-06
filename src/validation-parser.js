//value>=parent[1].options.right[0].value+parent[1].options.left[0].value
// command for chaining the drop+collect with where placed stuff.

export const equation = command => /==|>=|<=|<|!=|>/.exec(command)[0];
export const operator = command => /\+|-|\*|\/|\^/.exec(command) ? /\+|-|\*|\/|\^/.exec(command)[0] : "";

export const tokenizer = command => {
	const equation_sign = equation(command);
	const equation_sides = command.split(equation_sign);
	return {token: equation_sign, data:
		equation_sides.map(side => {
			const operation = operator(side);
			const attributes = operation ? side.split(operation) : [side];
			return {
				token: operation,
				data: attributes.length > 1 ? attributes.map(attribute => ({
					token: "",
					data: attribute,
				})) : attributes[0],
			};
		}),
	};
};

export const evaluator = (path, data) => {
	const nodes = path.split(".");
	const firstNode = nodes[0];

	if (firstNode === "value") {
		return data.value.length > 1 ? data.value.reduce((a, i) => a + i) : data.value;
	}
	const dataIndexPointer = /\[\d+\]/.test(firstNode) ? /\[\d+\]/.exec(firstNode).index + 1 : null;
	const dataPath = dataIndexPointer ? firstNode.slice(0, dataIndexPointer - 1) : firstNode; //"parent"
	const dataIndex = dataIndexPointer !== null ? parseInt(firstNode[dataIndexPointer]) : "";
	switch (dataPath) {
	case "parent":
		return evaluator(nodes.slice(1).join("."), dataIndex !== "" ? data.parent[dataIndex] : data.parent);
	case "options":
		return evaluator(nodes.slice(1).join("."), dataIndex !== "" ? data.options[dataIndex] : data.options);
	case "right":
		return evaluator(nodes.slice(1).join("."), dataIndex !== "" ? data.right[dataIndex] : data.right);
	case "left":
		return evaluator(nodes.slice(1).join("."), dataIndex !== "" ? data.left[dataIndex] : data.left);
	default:
		return null;
	}
};

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
	case "":
		return evaluator(data, struct);
	default:
		return null;
	}
};

export const compile = (command, data) => {
	const tokens = tokenizer(command);
	const parsed = parser(tokens, data);
	return parsed;
};
