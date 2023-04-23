import yaml from 'js-yaml';

const parser = (data, format) => {
  switch (format) {
    case '.yml':
      return yaml.load(data);
    case '.yaml':
      return yaml.load(data);
    case '.json':
      return JSON.parse(data);
    default:
      throw new Error(`Unknown order state: '${format}'!`);
  }
};

export default parser;
