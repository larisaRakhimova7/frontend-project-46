import * as path from 'path';
import * as fs from 'fs';
import parser from './parser.js';
import getDiff from './getDiff.js';
import getFormat from './formatters/index.js';

const getPath = (way) => path.resolve(process.cwd(), way);
const getExtension = (file) => path.extname(file);

const getData = (file) => {
  const absolutePath1 = getPath(file);
  const content = fs.readFileSync(absolutePath1, 'utf-8');
  return parser(content, getExtension(file));
};

const genDiff = (file1, file2, format = 'stylish') => {
  const obj1 = getData(file1);
  const obj2 = getData(file2);
  return getFormat(getDiff(obj1, obj2), format);
};

export default genDiff;
