import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const recieveJsonStylish = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
const expectedStylish = fs.readFileSync(getFixturePath('stylish.txt'), 'utf-8');
const expectTrim = expectedStylish.trim();

test('gendiff-test-json-stylish', () => {
  expect(recieveJsonStylish).toBe(expectTrim);
});

test('gendiff-test-yaml-stylish', () => {
  const recieveYamlStylish = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  const expectedYamlStylish = fs.readFileSync(getFixturePath('stylish.txt'), 'utf-8');

  expect(recieveYamlStylish).toBe(expectedYamlStylish);
});

test('gendiff-test-json-plain', () => {
  const recieveJsonPlain = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  const expectedJsonPlain = fs.readFileSync(getFixturePath('plain.txt'), 'utf-8');

  expect(recieveJsonPlain).toBe(expectedJsonPlain);
});

test('gendiff-test-yaml-plain', () => {
  const recieveYmlPlain = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain');
  const expectedYamlPlain = fs.readFileSync(getFixturePath('plain.txt'), 'utf-8');

  expect(recieveYmlPlain).toBe(expectedYamlPlain);
});

test('gendiff-test-json-json', () => {
  const recieveJson = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  const expectedJson = fs.readFileSync(getFixturePath('json.txt'), 'utf-8');

  expect(recieveJson).toBe(expectedJson);
});

test('gendiff-test-yaml-json', () => {
  const recieveYamlJson = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json');
  const expectedYamlJson = fs.readFileSync(getFixturePath('json.txt'), 'utf-8');

  expect(recieveYamlJson).toBe(expectedYamlJson);
});
