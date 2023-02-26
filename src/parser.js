import yaml from 'js-yaml';

const parser = (file, type) => {
  switch (type) {
    case 'yml':
      return yaml.load(file);
    case 'yaml':
      return yaml.load(file);
    case 'json':
      return JSON.parse(file);
    default:
      throw new Error(`Unknown order state: '${type}'!`);
  }
};

export default parser;
