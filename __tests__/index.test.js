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
  ['file1.json', 'file2.json'],
  ['file1.yaml', 'file2.yml'],
])('formatter %s', (file1, file2) => {
  test.each([
    ['stylish', expectedStylish],
    ['plain', expectedPlain],
    ['json', expectedJson],
  ])('extension %s test', (format, expected) => {
    expect(gendiff(getFixturePath(file1), getFixturePath(file2), format)).toBe(expected);
  });
});
