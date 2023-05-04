import yaml from 'js-yaml';

export default (data, format) => {
  if (format === 'yaml' || format === 'yml') {
    return yaml.load(data);
  }
  if (format === 'json') {
    return JSON.parse(data);
  }

  throw new Error(`Unknown format: '${format}'!`);
};
