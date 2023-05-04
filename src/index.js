import * as path from 'path';
import * as fs from 'fs';
import parser from './parser.js';
import getDiff from './getDiff.js';
import getFormat from './formatters/index.js';

const getPath = (pathFile) => path.resolve(process.cwd(), pathFile);
const getExtension = (file) => path.extname(file).slice(1);

const getData = (file) => {
  const absolutePath1 = getPath(file);
  const content = fs.readFileSync(absolutePath1, 'utf-8');
  return parser(content, getExtension(file));
};

const genDiff = (file1, file2, format = 'stylish') => {
  const data1 = getData(file1);
  const data2 = getData(file2);
  return getFormat(getDiff(data1, data2), format);
};

export default genDiff;
