/**
 * Adds or updates an entry in the internal data map, increments the size if the key is new.
 * If the value is undefined and the global flag `oE` is true, assigns the default value `yy2`.
 *
 * @param {string|number} key - The key to set in the data map.
 * @param {*} value - The value to associate with the key. If undefined and `oE` is true, uses `yy2`.
 * @returns {this} Returns the current instance for chaining.
 */
function setEntryInDataMap(key, value) {
  const dataMap = this.__data__;

  // If the key does not exist, increment the size
  if (!this.has(key)) {
    this.size += 1;
  }

  // If value is undefined and oE is true, use yy2 as the value
  dataMap[key] = (typeof oE !== 'undefined' && oE && value === undefined) ? yy2 : value;

  return this;
}

module.exports = setEntryInDataMap;