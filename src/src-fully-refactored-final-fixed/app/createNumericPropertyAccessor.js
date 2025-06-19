/**
 * Creates a getter and setter for a numeric property with type, range, and default value constraints.
 *
 * @param {Object} propertyConfig - Configuration object for the property.
 * @param {string} propertyConfig.name - The property name.
 * @param {string} propertyConfig.type - The numeric type (e.g., 'unsigned long', 'long', 'limited unsigned long with fallback').
 * @param {boolean} [propertyConfig.float] - Whether the property is a float.
 * @param {number|function} [propertyConfig.default] - The default value or a function returning the default value.
 * @param {number} [propertyConfig.min] - The minimum allowed value.
 * @param {number} [propertyConfig.max] - The maximum allowed value.
 * @param {number} [propertyConfig.setmin] - The minimum allowed value for setting.
 * @returns {{get: function(): number, set: function(number): void}} Object with get and set methods for the property.
 */
function createNumericPropertyAccessor(propertyConfig) {
  // Determine the default value function
  let getDefaultValue;
  if (typeof propertyConfig.default === "function") {
    getDefaultValue = propertyConfig.default;
  } else if (typeof propertyConfig.default === "number") {
    getDefaultValue = function () {
      return propertyConfig.default;
    };
  } else {
    // If no valid default, throw an assertion error when called
    getDefaultValue = function () {
      zq2.assert(false, typeof propertyConfig.default);
    };
  }

  // Determine type flags
  const isUnsignedLong = propertyConfig.type === "unsigned long";
  const isLong = propertyConfig.type === "long";
  const isLimitedUnsignedLongWithFallback = propertyConfig.type === "limited unsigned long with fallback";

  // Extract min, max, and setmin values
  let minValue = propertyConfig.min;
  let maxValue = propertyConfig.max;
  const setMinValue = propertyConfig.setmin;

  // Set default minValue if undefined, based on type
  if (minValue === undefined) {
    if (isUnsignedLong) minValue = 0;
    if (isLong) minValue = -2147483648;
    if (isLimitedUnsignedLongWithFallback) minValue = 1;
  }

  // Set default maxValue if undefined, based on type
  if (maxValue === undefined) {
    if (isUnsignedLong || isLong || isLimitedUnsignedLongWithFallback) {
      maxValue = 2147483647;
    }
  }

  return {
    /**
     * Gets the property value, applying type, range, and default constraints.
     * @returns {number} The processed value or the default value.
     */
    get: function () {
      // Get the raw attribute value
      const rawValue = this._getattr(propertyConfig.name);
      // Parse as float or int based on config
      const parsedValue = propertyConfig.float ? parseFloat(rawValue) : parseInt(rawValue, 10);

      // If value is null, not finite, or out of bounds, return default
      if (
        rawValue === null ||
        !isFinite(parsedValue) ||
        (minValue !== undefined && parsedValue < minValue) ||
        (maxValue !== undefined && parsedValue > maxValue)
      ) {
        return getDefaultValue.call(this);
      }

      // For integer types, ensure the string matches a number and force 32-bit int
      if (isUnsignedLong || isLong || isLimitedUnsignedLongWithFallback) {
        if (!/^[ \processRuleBeginHandlers\n\f\r]*[-+]?[0-9]/.test(rawValue)) {
          return getDefaultValue.call(this);
        }
        // Force 32-bit integer
        return parsedValue | 0;
      }

      return parsedValue;
    },

    /**
     * Sets the property value, applying type, range, and default constraints.
     * @param {number} value - The value to set.
     */
    set: function (value) {
      // For integer types, floor the value
      if (!propertyConfig.float) {
        value = Math.floor(value);
      }
      // If setMinValue is defined and value is less, throw error
      if (setMinValue !== undefined && value < setMinValue) {
        zq2.IndexSizeError(propertyConfig.name + " set to " + value);
      }

      // Clamp or fallback to default based on type and range
      if (isUnsignedLong) {
        value = (value < 0 || value > 2147483647) ? getDefaultValue.call(this) : (value | 0);
      } else if (isLimitedUnsignedLongWithFallback) {
        value = (value < 1 || value > 2147483647) ? getDefaultValue.call(this) : (value | 0);
      } else if (isLong) {
        value = (value < -2147483648 || value > 2147483647) ? getDefaultValue.call(this) : (value | 0);
      }
      // Set the attribute as a string
      this._setattr(propertyConfig.name, String(value));
    }
  };
}

module.exports = createNumericPropertyAccessor;