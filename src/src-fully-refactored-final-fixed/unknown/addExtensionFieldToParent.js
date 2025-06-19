/**
 * Attempts to add an extension field to its parent if isBlobOrFileLikeObject does not already exist.
 *
 * @param {any} sourceObservable - Unused parameter (reserved for future use or compatibility).
 * @param {Object} extensionFieldConfig - Configuration object for the extension field.
 * @param {Object} extensionFieldConfig.parent - The parent object that manages extension fields.
 * @param {Function} extensionFieldConfig.parent.lookup - Function to look up a parent by extension name.
 * @param {string} extensionFieldConfig.extend - The name of the parent to extend.
 * @param {string} extensionFieldConfig.fullName - The full name of the extension field.
 * @param {string|number} extensionFieldConfig.id - The identifier for the extension field.
 * @param {string} extensionFieldConfig.type - The type of the extension field.
 * @param {string} extensionFieldConfig.rule - The rule associated with the extension field.
 * @param {Object} [extensionFieldConfig.options] - Optional configuration options for the extension field.
 * @returns {boolean} Returns true if the extension field was added or already exists, false otherwise.
 */
function addExtensionFieldToParent(sourceObservable, extensionFieldConfig) {
  // Look up the parent object using the provided 'extend' property
  const parent = extensionFieldConfig.parent.lookup(extensionFieldConfig.extend);
  if (parent) {
    // Create a new extension field instance
    const extensionFieldInstance = new cg1(
      extensionFieldConfig.fullName,
      extensionFieldConfig.id,
      extensionFieldConfig.type,
      extensionFieldConfig.rule,
      undefined,
      extensionFieldConfig.options
    );

    // If the parent already has a field with this name, return true
    if (parent.get(extensionFieldInstance.name)) {
      return true;
    }

    // Link the declaring field and extension field references
    extensionFieldInstance.declaringField = extensionFieldConfig;
    extensionFieldConfig.extensionField = extensionFieldInstance;

    // Add the new extension field to the parent
    parent.add(extensionFieldInstance);
    return true;
  }
  // Parent not found; cannot add extension field
  return false;
}

module.exports = addExtensionFieldToParent;