import _ from 'lodash';

const getDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = keys1.concat(keys2);

  const uniqKeys = _.uniq(allKeys);
  const sortedUniqs = _.sortBy(uniqKeys);

  const result = sortedUniqs.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        type: 'nested',
        name: key,
        children: getDiff(value1, value2),
      };
    }
    if (!keys1.includes(key)) {
      return {
        type: 'added',
        name: key,
        value: obj2[key],
      };
    }
    if (!keys2.includes(key)) {
      return {
        type: 'deleted',
        name: key,
        value: obj1[key],
      };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        type: 'updated',
        name: key,
        value1: obj1[key],
        value2: obj2[key],
      };
    }
    // if (obj1[key] === obj2[key]) {
    return {
      type: 'unchanged',
      name: key,
      value: obj1[key],
    };
  });
  return result;
};

export default getDiff;
