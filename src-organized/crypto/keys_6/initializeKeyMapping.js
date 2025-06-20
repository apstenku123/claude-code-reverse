/**
 * Initializes a key mapping for the current instance.
 *
 * Calls the Pg1 constructor with the provided parameters, validates the key type,
 * and sets up instance properties for keyType, resolvedKeyType, and map.
 *
 * @param {Object} sourceObservable - The source observable or data provider.
 * @param {Object} config - Configuration options for the mapping.
 * @param {string} keyType - The type of key to use for mapping (must be a string).
 * @param {any} index - Optional index or identifier (passed to Pg1).
 * @param {any} group - Optional group or context (passed to Pg1).
 * @param {any} zone - Optional zone or environment (passed to Pg1).
 * @returns {void}
 * @throws {TypeError} If keyType is not a string.
 */
function initializeKeyMapping(sourceObservable, config, keyType, index, group, zone) {
  // Call the Pg1 constructor with the provided arguments
  Pg1.call(this, sourceObservable, config, index, undefined, undefined, group, zone);

  // Validate that keyType is a string
  if (!qs.isString(keyType)) {
    throw new TypeError("keyType must be a string");
  }

  // Set instance properties
  this.keyType = keyType;
  this.resolvedKeyType = null;
  this.map = true;
}

module.exports = initializeKeyMapping;