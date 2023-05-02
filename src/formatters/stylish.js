import _ from 'lodash';

const getIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(spacesCount * depth - 2);
const makeString = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => {
    const newKey = value[key];
    return `${getIndent(depth + 1)}  ${key}: ${makeString(newKey, depth + 1)}`;
  });
  return `{\n${result.join('\n')}\n  ${getIndent(depth)}}`;
};

const stylishFormat = (ast) => {
  const iter = (tree, depth = 1) => {
    const result = tree.map((node) => {
      switch (node.type) {
        case 'nested':
          return `${getIndent(depth)}  ${node.name}: {\n${iter(node.children, depth + 1)}\n${getIndent(depth)}  }`;
        case 'unchanged':
          return `${getIndent(depth)}  ${node.name}: ${makeString(node.value, depth)}`;
        case 'deleted':
          return `${getIndent(depth)}- ${node.name}: ${makeString(node.value, depth)}`;
        case 'added':
          return `${getIndent(depth)}+ ${node.name}: ${makeString(node.value, depth)}`;
        case 'updated': {
          const from = `${getIndent(depth)}- ${node.name}: ${makeString(node.value1, depth)}`;
          const to = `${getIndent(depth)}+ ${node.name}: ${makeString(node.value2, depth)}`;
          return `${from}\n${to}`;
        }
        default:
          throw new Error(`Unexpected node type: ${node.type}`);
      }
    });

    return result.join('\n');
  };
  return `{\n${iter(ast)}\n}`;
};

export default stylishFormat;
