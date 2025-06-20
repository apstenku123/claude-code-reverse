/**
 * Retrieves the global object from the I41 module.
 *
 * @returns {any} The global object provided by the I41 module.
 */
function getGlobalObject() {
  // Access and return the global object from the I41 module
  return I41.GLOBAL_OBJ;
}

module.exports = getGlobalObject;