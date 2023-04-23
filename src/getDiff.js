import _ from 'lodash';

const getDiff = (obj1, obj2) => {
  const sortedKeys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));
  const result = sortedKeys.map((key) => {
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
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
