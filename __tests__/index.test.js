import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedStylish = fs.readFileSync(getFixturePath('stylish.txt'), 'utf-8').trim();
const expectedPlain = fs.readFileSync(getFixturePath('plain.txt'), 'utf-8');
const expectedJson = fs.readFileSync(getFixturePath('json.txt'), 'utf-8');

describe.each([
  ['json', 'json'],
  ['yaml', 'yml'],
])('extension %s', (ext1, ext2) => {
  test.each([
    ['stylish', expectedStylish],
    ['plain', expectedPlain],
    ['json', expectedJson],
  ])('formatter %s test', (format, expected) => {
    expect(gendiff(getFixturePath(`file1.${ext1}`), getFixturePath(`file2.${ext2}`), format)).toBe(expected);
  });
});
