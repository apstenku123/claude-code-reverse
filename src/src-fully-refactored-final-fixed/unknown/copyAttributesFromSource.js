/**
 * Copies attributes from a source object to the current instance.
 *
 * This function acts as a constructor or mixin, initializing the current instance
 * by copying all attributes from the source object'createInteractionAccessor _attrsByQName and _attrsByLName properties.
 *
 * @param {Object} sourceObject - The object containing attribute maps and keys to copy from.
 * @returns {void}
 */
function copyAttributesFromSource(sourceObject) {
  // Call the parent constructor with the source object context
  vq2.call(this, sourceObject);

  // Copy all attributes from the _attrsByQName map to this instance
  for (const attributeName in sourceObject._attrsByQName) {
    if (Object.prototype.hasOwnProperty.call(sourceObject._attrsByQName, attributeName)) {
      this[attributeName] = sourceObject._attrsByQName[attributeName];
    }
  }

  // Copy all attributes from the _attrsByLName map using the ordered _attrKeys array
  for (let index = 0; index < sourceObject._attrKeys.length; index++) {
    const key = sourceObject._attrKeys[index];
    this[index] = sourceObject._attrsByLName[key];
  }
}

module.exports = copyAttributesFromSource;