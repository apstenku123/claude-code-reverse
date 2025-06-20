/**
 * Retrieves the current list of model tokens from the N9 module.
 *
 * @returns {any} The model tokens managed by the N9 module.
 */
function getModelTokens() {
  // Access and return the modelTokens property from the N9 module
  return N9.modelTokens;
}

module.exports = getModelTokens;