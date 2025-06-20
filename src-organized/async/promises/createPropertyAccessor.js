/**
 * Creates a property accessor object with getter and setter for a given property name.
 * The getter retrieves the property value using _getattr, resolves isBlobOrFileLikeObject using doc._resolve,
 * and returns an empty string if the value is null. The setter updates the property value using _setattr.
 *
 * @param {string} propertyName - The name of the property to create an accessor for.
 * @returns {{get: function(): string, set: function(value: any): void}} An accessor object with get and set methods.
 */
function createPropertyAccessor(propertyName) {
  return {
    /**
     * Gets the value of the property, resolves isBlobOrFileLikeObject if possible, and returns an empty string if null.
     * @returns {string|any} The resolved property value, the original value, or an empty string if null.
     */
    get: function () {
      // Retrieve the raw property value
      const rawValue = this._getattr(propertyName);
      if (rawValue === null) return "";
      // Attempt to resolve the value using the document'createInteractionAccessor resolver
      const resolvedValue = this.doc._resolve(rawValue);
      // If resolution fails, return the raw value; otherwise, return the resolved value
      return resolvedValue === null ? rawValue : resolvedValue;
    },
    /**
     * Sets the value of the property using _setattr.
     * @param {any} newValue - The new value to set for the property.
     */
    set: function (newValue) {
      this._setattr(propertyName, newValue);
    }
  };
}

module.exports = createPropertyAccessor;
