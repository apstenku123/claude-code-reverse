/**
 * Creates an accessor object for managing a credential-related attribute on an element.
 * Provides getter and setter methods to handle the attribute value according to credential policy.
 *
 * @param {string} attributeName - The name of the attribute to manage (e.g., 'crossorigin').
 * @returns {{ get: function(): (string|null), set: function(value: string|null): void }}
 *   An object with 'get' and 'set' methods for the specified attribute.
 */
function createCredentialAttributeAccessor(attributeName) {
  return {
    /**
     * Gets the value of the specified attribute from the current element context.
     * Returns 'use-credentials' if the attribute value matches (case-insensitive),
     * otherwise returns 'anonymous'. Returns null if the attribute is not set.
     *
     * @returns {string|null} The credential policy ('use-credentials', 'anonymous', or null).
     */
    get: function () {
      // Retrieve the attribute value using the element'createInteractionAccessor _getattr method
      const attributeValue = this._getattr(attributeName);
      if (attributeValue === null) {
        // Attribute is not set
        return null;
      }
      // Check if the attribute value is 'use-credentials' (case-insensitive)
      if (attributeValue.toLowerCase() === "use-credentials") {
        return "use-credentials";
      }
      // For any other value, return 'anonymous'
      return "anonymous";
    },

    /**
     * Sets the value of the specified attribute on the current element context.
     * If the value is null or undefined, removes the attribute.
     * Otherwise, sets the attribute using the element'createInteractionAccessor _setattr method.
     *
     * @param {string|null} newValue - The new value to set for the attribute.
     */
    set: function (newValue) {
      if (newValue === null || newValue === undefined) {
        // Remove the attribute if value is null or undefined
        this.removeAttribute(attributeName);
      } else {
        // Set the attribute to the provided value
        this._setattr(attributeName, newValue);
      }
    }
  };
}

module.exports = createCredentialAttributeAccessor;