/**
 * Attempts to register an extension field within its parent scope if isBlobOrFileLikeObject does not already exist.
 *
 * @param {Object} sourceObservable - The source object (unused in this function, but may be required for interface compatibility).
 * @param {Object} config - The configuration object for the extension field.
 * @param {Object} config.parent - The parent scope in which to look up or register the extension field.
 * @param {Function} config.extend - Function or property used to extend the parent scope.
 * @param {string} config.fullName - The full name of the extension field.
 * @param {string|number} config.id - The unique identifier for the extension field.
 * @param {string} config.type - The data type of the extension field.
 * @param {string} config.rule - The rule associated with the extension field.
 * @param {Object} [config.options] - Additional options for the extension field.
 * @returns {boolean} Returns true if the extension field was registered or already exists, false otherwise.
 */
function registerExtensionFieldIfNotExists(sourceObservable, config) {
  // Attempt to look up the parent scope using the provided extension logic
  const parentScope = config.parent.lookup(config.extend);
  if (parentScope) {
    // Create a new extension field instance
    const extensionField = new cg1(
      config.fullName,
      config.id,
      config.type,
      config.rule,
      undefined, // The fifth parameter is intentionally undefined
      config.options
    );

    // If the extension field already exists in the parent scope, return true
    if (parentScope.get(extensionField.name)) {
      return true;
    }

    // Link the extension field and config objects for reference
    extensionField.declaringField = config;
    config.extensionField = extensionField;

    // Add the new extension field to the parent scope
    parentScope.add(extensionField);
    return true;
  }
  // Parent scope not found; registration failed
  return false;
}

module.exports = registerExtensionFieldIfNotExists;