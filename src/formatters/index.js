import plain from './plain.js';
import stylish from './stylish.js';

const getFormat = (tree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return JSON.stringify(tree, null, 2);
    default:
      throw new Error(`Unexpected format: ${format}`);
  }
};

export default getFormat;
