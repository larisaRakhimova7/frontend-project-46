import _ from 'lodash';

const getIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(spacesCount * depth - 2);
const makeString = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => {
    const newKey = value[key];
    return `${getIndent(depth + 1)}  ${key}: ${makeString(newKey, depth + 1)}`;
  });
  return `{\n${result.join('\n')}\n  ${getIndent(depth)}}`;
};

const stylishFormat = (array) => {
  const iter = (node, depth = 1) => {
    const result = node.map((element) => {
      if (element.type === 'nested') {
        return `${getIndent(depth)}  ${element.name}: {\n${iter(element.children, depth + 1)}\n${getIndent(depth)}  }`;
      }
      if (element.type === 'unchanged') {
        return `${getIndent(depth)}  ${element.name}: ${makeString(element.value, depth)}`;
      }
      if (element.type === 'deleted') {
        return `${getIndent(depth)}- ${element.name}: ${makeString(element.value, depth)}`;
      }
      if (element.type === 'added') {
        return `${getIndent(depth)}+ ${element.name}: ${makeString(element.value, depth)}`;
      }
      return `${getIndent(depth)}- ${element.name}: ${makeString(element.value1, depth)}\n${getIndent(depth)}+ ${element.name}: ${makeString(element.value2, depth)}`;
    });

    return result.join('\n');
  };
  return `{\n${iter(array)}\n}`;
};

export default stylishFormat;