import _ from 'lodash';
import * as path from 'path';
import * as fs from 'fs';
import stringify from './utils.js';
// import { cwd } from 'process';
const genDiff = (filepath1, filepath2) => {
  const obj1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
  const obj2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = keys1.concat(keys2);
  const sortKey = _.sortBy(allKeys);
  // console.log(sortKey);
  const result = {};
  function compare(key) {
    if (obj1[key] === obj2[key]) {
      const keyUnchanged = `  ${key}`;
      result[keyUnchanged] = obj1[key];
    } else if (!keys2.includes(key)) {
      const keyDeleted = `- ${key}`;
      result[keyDeleted] = obj1[key];
    } else if (!keys1.includes(key)) {
      const keyAdded = `+ ${key}`;
      result[keyAdded] = obj2[key];
    } else {
      const keyChanged1 = `- ${key}`;
      const keyChanged2 = `+ ${key}`;
      result[keyChanged1] = obj1[key];
      result[keyChanged2] = obj2[key];
    }
  }
  sortKey.forEach(compare, {});
  const resultLine = stringify(result);
  return resultLine;
};

console.log(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json'));
// getDiff('../__fixtures__/file1.json', '../__fixtures__/file2.json');
// console.log(getDiff('../__fixtures__/file1.json', '../__fixtures__/file2.json'));
export default genDiff;
