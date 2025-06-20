/**
 * Adds or updates an entry in the internal data store.
 *
 * If the key does not already exist, increments the size counter.
 * If the value is undefined and the global flag 'oE' is true, assigns the default value 'yy2'.
 * Returns the current instance for chaining.
 *
 * @param {string|number} key - The key to set in the data store.
 * @param {*} value - The value to associate with the key. If undefined and 'oE' is true, 'yy2' is used instead.
 * @returns {this} The current instance for chaining.
 */
function setDataEntry(key, value) {
  // Access the internal data storage object
  const dataStore = this.__data__;

  // If the key does not exist, increment the size
  if (!this.has(key)) {
    this.size += 1;
  }

  // If value is undefined and oE is true, use yy2 as the value; otherwise, use the provided value
  dataStore[key] = (typeof oE !== 'undefined' && oE && value === undefined) ? yy2 : value;

  // Return the current instance for chaining
  return this;
}

module.exports = setDataEntry;