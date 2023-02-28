import * as path from 'path';
import * as fs from 'fs';
import parser from './parser.js';
import getDiff from './getDiff.js';
import getFormat from './formatters/index.js';

const getPath = (way) => path.resolve(process.cwd(), way);

const genDiff = (file1, file2, format = 'stylish') => {
  const absolutePath1 = getPath(file1);
  const absolutePath2 = getPath(file2);

  const content1 = fs.readFileSync(absolutePath1, 'utf-8');
  const content2 = fs.readFileSync(absolutePath2, 'utf-8');
  const getExtension = (file) => path.extname(file);

  const obj1 = parser(content1, getExtension(file1));
  const obj2 = parser(content2, getExtension(file2));

  const differences = getFormat(getDiff(obj1, obj2), format);
  return differences;
};

export default genDiff;
