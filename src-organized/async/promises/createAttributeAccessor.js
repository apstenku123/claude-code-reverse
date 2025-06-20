/**
 * Creates a property accessor object with custom getter and setter for a given attribute name.
 * The getter retrieves the attribute value using _getattr, resolves isBlobOrFileLikeObject via doc._resolve, and handles nulls gracefully.
 * The setter updates the attribute value using _setattr.
 *
 * @param {string} attributeName - The name of the attribute to create accessors for.
 * @returns {{get: function(): string, set: function(value: any): void}} An object with get and set methods for the attribute.
 */
function createAttributeAccessor(attributeName) {
  return {
    /**
     * Gets the value of the attribute, resolving references if necessary.
     * Returns an empty string if the attribute value is null.
     *
     * @returns {string} The resolved attribute value or an empty string if null.
     */
    get: function () {
      // Retrieve the raw attribute value
      const attributeValue = this._getattr(attributeName);
      if (attributeValue === null) {
        // If the attribute is null, return an empty string
        return "";
      }
      // Attempt to resolve the attribute value (could be a reference)
      const resolvedValue = this.doc._resolve(attributeValue);
      // If resolution fails (null), return the original value; otherwise, return the resolved value
      return resolvedValue === null ? attributeValue : resolvedValue;
    },

    /**
     * Sets the value of the attribute.
     *
     * @param {any} value - The value to set for the attribute.
     */
    set: function (value) {
      this._setattr(attributeName, value);
    }
  };
}

module.exports = createAttributeAccessor;