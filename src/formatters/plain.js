// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

const buildString = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  return typeof data === 'string' ? `'${data}'` : String(data);
};

const plain = (data) => {
  const iter = (current, path) => {
    const result = current
      .filter((element) => element.type !== 'unchanged')
      .flatMap((element) => {
        const { name } = element;
        const newPath = [...path, name];

        switch (element.type) {
          case 'added':
            return `Property '${newPath.join('.')}' was added with value: ${buildString(element.value)}`;
          case 'deleted':
            return `Property '${newPath.join('.')}' was removed`;
          case 'updated':
            return `Property '${newPath.join('.')}' was updated. From ${buildString(element.value1)} to ${buildString(element.value2)}`;
          case 'nested':
            return iter(element.children, newPath);
          default:
            throw new Error(`Unknown type: ${element.type}`);
        }
      });

    return `${result.join('\n')}`;
  };

  return iter(data, []);
};

export default plain;
