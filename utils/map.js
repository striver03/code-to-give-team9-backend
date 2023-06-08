const mapToObject = (map) => {
  const obj = {};
  for (let [k, v] of map) {
    obj[k] = v;
  }
  return obj;
};

module.exports = {
  mapToObjet: mapToObject,
};
