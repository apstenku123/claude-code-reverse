/**
 * Creates a property descriptor for getting and setting a cross-origin attribute (e.g., 'crossorigin') on a DOM element.
 *
 * @param {string} attributeName - The name of the attribute to get/set (e.g., 'crossorigin').
 * @returns {Object} An object with 'get' and 'set' methods for the attribute.
 */
function createCrossOriginAttributeAccessor(attributeName) {
  return {
    /**
     * Gets the value of the specified attribute from the element.
     * Returns null if the attribute is not set.
     * If the value is 'use-credentials' (case-insensitive), returns 'use-credentials'.
     * Otherwise, returns 'anonymous'.
     *
     * @returns {string|null}
     */
    get: function () {
      // Retrieve the attribute value using the element'createInteractionAccessor internal _getattr method
      const attributeValue = this._getattr(attributeName);
      if (attributeValue === null) return null;
      // Check if the value is 'use-credentials' (case-insensitive)
      if (attributeValue.toLowerCase() === "use-credentials") return "use-credentials";
      // Default to 'anonymous' for any other value
      return "anonymous";
    },
    /**
     * Sets the value of the specified attribute on the element.
     * If the value is null or undefined, removes the attribute.
     * Otherwise, sets the attribute using the element'createInteractionAccessor internal _setattr method.
     *
     * @param {string|null|undefined} newValue - The value to set for the attribute.
     */
    set: function (newValue) {
      if (newValue === null || newValue === undefined) {
        // Remove the attribute if value is null or undefined
        this.removeAttribute(attributeName);
      } else {
        // Set the attribute using the element'createInteractionAccessor internal _setattr method
        this._setattr(attributeName, newValue);
      }
    }
  };
}

module.exports = createCrossOriginAttributeAccessor;