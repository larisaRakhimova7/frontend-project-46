import _ from 'lodash';
import * as path from 'path';
import * as fs from 'fs';
import { cwd } from 'process';

console.log(`${cwd()}`);
// const extname1 = extname('file1.json');
// const extname2 = extname('file2.json');
// l et obj1 = {};
// l et obj2 = {};
// if (extname1 === '.json' && extname2 === '.json') {
// obj1 = JSON.parse(fs.readFileSync('__tests__/fixtures/file1.json', ));
// obj2 = JSON.parse(fs.readFileSync('__tests__/fixtures/file2.json', 'utf8'));'utf8'
// }

const compare = (obj1, obj2) => {
  const result = [];
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = keys1.concat(keys2);
  const sortKey = _.sortBy(allKeys);
  // .sort(function compare(a, b) {return a.charCodeAt(0) - b.charCodeAt(0)});
  const uniqKeys = sortKey.filter((key, id) => sortKey.indexOf(key) === id);
  function getLine(uniqKey) {
    if (obj1[uniqKey] === obj2[uniqKey]) {
      result.push(`  ${uniqKey}: ${obj1[uniqKey]} \n`);
    } else if (!keys2.includes(uniqKey)) {
      result.push(`- ${uniqKey}: ${obj1[uniqKey]} \n`);
    } else if (!keys1.includes(uniqKey)) {
      result.push(`+ ${uniqKey}: ${obj2[uniqKey]} \n`);
    } else {
      result.push(`- ${uniqKey}: ${obj1[uniqKey]} \n`);
      result.push(`+ ${uniqKey}: ${obj2[uniqKey]} \n`);
    }
  }
  uniqKeys.map(getLine);
  result.unshift('{ \n');
  result.push('}');
  return result.join('');
};

const getDiff = (filepath1, filepath2) => {
  const obj1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
  const obj2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));
  const obj3 = compare(obj1, obj2);
  return obj3;
  // console.log(obj3);
};

// getDiff('../__fixtures__/file1.json', '../__fixtures__/file2.json');
// console.log(getDiff('../__fixtures__/file1.json', '../__fixtures__/file2.json'));
export default getDiff;

/*
const obj1 = {
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false,
  };
const obj2 = {
    "timeout": 20,
    "verbose": true,
    "host": "hexlet.io"
  };

function getLine(uniqKey) {
 if (obj1[uniqKey] === obj2[uniqKey]) {
result.push(`  ${uniqKey}: ${obj1[uniqKey]} \n`);
}else if (!keys2.includes(uniqKey)) {
result.push(`- ${uniqKey}: ${obj1[uniqKey]} \n`);
} else if (!keys1.includes(uniqKey)) {
result.push(`+ ${uniqKey}: ${obj2[uniqKey]} \n`);
} else {
result.push(`- ${uniqKey}: ${obj1[uniqKey]} \n`);
result.push(`+ ${uniqKey}: ${obj2[uniqKey]} \n`);
}
return result;
}
*/
