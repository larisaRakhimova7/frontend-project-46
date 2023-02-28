import _ from 'lodash';

const getDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = keys1.concat(keys2);

  const uniqKeys = _.uniq(allKeys);
  const sortedUniqs = _.sortBy(uniqKeys);
  const result = sortedUniqs.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { name: key, type: 'nested', children: getDiff(obj1[key], obj2[key]) };
    }
    if (!_.has(obj1, key)) {
      return { name: key, type: 'added', value: obj2[key] };
    }
    if (!_.has(obj2, key)) {
      return { name: key, type: 'deleted', value: obj1[key] };
    }

    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        name: key, type: 'updated', value1: obj1[key], value2: obj2[key],
      };
    }

    return { name: key, type: 'unchanged', value: obj1[key] };
  });

  return result;
};

export default getDiff;
