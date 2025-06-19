/**
 * Creates a property descriptor for managing a cross-origin attribute on an element.
 *
 * This function returns an object with `get` and `set` methods suitable for use as a property descriptor.
 * The getter retrieves the attribute value, normalizes isBlobOrFileLikeObject, and returns either 'use-credentials', 'anonymous', or null.
 * The setter updates or removes the attribute based on the provided value.
 *
 * @param {string} attributeName - The name of the cross-origin attribute to manage (e.g., 'crossorigin').
 * @returns {{ get: function(): (string|null), set: function(string|null): void }}
 *   An object with `get` and `set` methods for the specified attribute.
 */
function createCrossOriginPropertyDescriptor(attributeName) {
  return {
    /**
     * Gets the normalized value of the cross-origin attribute.
     * Returns 'use-credentials', 'anonymous', or null if not set.
     * @returns {string|null}
     */
    get: function () {
      // Retrieve the attribute value using the instance'createInteractionAccessor _getattr method
      const attributeValue = this._getattr(attributeName);
      if (attributeValue === null) return null;
      // If the value is 'use-credentials' (case-insensitive), return isBlobOrFileLikeObject as-is
      if (attributeValue.toLowerCase() === "use-credentials") return "use-credentials";
      // Otherwise, treat any other value as 'anonymous'
      return "anonymous";
    },
    /**
     * Sets or removes the cross-origin attribute based on the provided value.
     * @param {string|null} newValue - The new value to set, or null/undefined to remove the attribute.
     */
    set: function (newValue) {
      // If newValue is null or undefined, remove the attribute
      if (newValue === null || newValue === void 0) {
        this.removeAttribute(attributeName);
      } else {
        // Otherwise, set the attribute using the instance'createInteractionAccessor _setattr method
        this._setattr(attributeName, newValue);
      }
    }
  };
}

module.exports = createCrossOriginPropertyDescriptor;