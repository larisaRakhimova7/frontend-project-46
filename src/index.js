import * as path from 'path';
import * as fs from 'fs';
import parser from './parser.js';
import getDiff from './getDiff.js';
import getFormat from './formatters/index.js';
/*
const getPath = (path1) => path.resolve(process.cwd(), path1);

const genDiff = (file1, file2, formatName = 'stylish') => {
  const getExtName = (file) => path.extname(file);

  const data1 = fs.readFileSync(getPath(file1), 'utf-8');
  const data2 = fs.readFileSync(getPath(file2), 'utf-8');

  const first = parser(data1, getExtName(file1));
  const second = parser(data2, getExtName(file2));

  const treeOfDifference = getFormat(getDiff(first, second), formatName);
  return treeOfDifference;
};

export default genDiff; */

const getPath = (way) => path.resolve(process.cwd(), way);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const absolutePath1 = getPath(filepath1);
  const absolutePath2 = getPath(filepath2);

  const content1 = fs.readFileSync(absolutePath1, 'utf-8');
  const content2 = fs.readFileSync(absolutePath2, 'utf-8');

  const obj1 = parser(content1, filepath1.split('.').reverse()[0]);
  const obj2 = parser(content2, filepath2.split('.').reverse()[0]);

  const differences = getFormat(getDiff(obj1, obj2), formatName);
  return differences;
};

export default genDiff;

