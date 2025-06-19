/**
 * Attempts to add an extension field to a parent lookup if isBlobOrFileLikeObject does not already exist.
 *
 * @param {Object} context - The context object (unused in this function, but passed for compatibility).
 * @param {Object} extensionConfig - The configuration object for the extension field.
 * @param {Object} extensionConfig.parent - The parent object containing the lookup method.
 * @param {string} extensionConfig.extend - The key or identifier to lookup in the parent.
 * @param {string} extensionConfig.fullName - The full name of the extension field.
 * @param {string|number} extensionConfig.id - The identifier for the extension field.
 * @param {string} extensionConfig.type - The type of the extension field.
 * @param {string} extensionConfig.rule - The rule associated with the extension field.
 * @param {Object} [extensionConfig.options] - Optional additional options for the extension field.
 * @returns {boolean} Returns true if the extension field was added or already exists, false otherwise.
 */
function addExtensionFieldIfNotExists(context, extensionConfig) {
  // Lookup the parent object using the provided 'extend' key
  const parentLookup = extensionConfig.parent.lookup(extensionConfig.extend);
  if (parentLookup) {
    // Create a new extension field instance
    const extensionField = new cg1(
      extensionConfig.fullName,
      extensionConfig.id,
      extensionConfig.type,
      extensionConfig.rule,
      undefined,
      extensionConfig.options
    );
    // If the field already exists in the parent, return true
    if (parentLookup.get(extensionField.name)) {
      return true;
    }
    // Link the declaring and extension fields for reference
    extensionField.declaringField = extensionConfig;
    extensionConfig.extensionField = extensionField;
    // Add the new extension field to the parent
    parentLookup.add(extensionField);
    return true;
  }
  // Parent lookup failed; cannot add extension field
  return false;
}

module.exports = addExtensionFieldIfNotExists;