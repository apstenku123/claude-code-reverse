/**
 * Creates a Proxy around a source object (typically an observable or response object),
 * allowing for property overrides and controlled property setting.
 *
 * The proxy will prioritize properties from the config object (which always includes
 * an 'internalResponse' property pointing to the source object), falling back to the
 * source object for any missing properties. Property sets are only allowed if the property
 * does not exist in the config object, and a guard function (hu1) is called to enforce this.
 *
 * @param {Object} sourceObject - The original object to be proxied (e.g., an observable or response).
 * @param {Object} [overrides={}] - An object containing properties to override or extend on the proxy.
 * @returns {Proxy} a Proxy object that merges the source object and overrides, with controlled property access and mutation.
 */
function createObservableProxy(sourceObject, overrides = {}) {
  // Create a config object that always includes a reference to the source object
  const config = {
    internalResponse: sourceObject,
    ...overrides
  };

  return new Proxy(sourceObject, {
    /**
     * Property getter: prioritize config properties, fallback to sourceObject
     * @param {Object} target - The proxied source object
     * @param {string|symbol} property - The property being accessed
     * @returns {*} The property value from config or sourceObject
     */
    get(target, property) {
      return property in config ? config[property] : target[property];
    },

    /**
     * Property setter: only allow setting properties not in config
     * Calls hu1 as a guard/validator before setting
     * @param {Object} target - The proxied source object
     * @param {string|symbol} property - The property being set
     * @param {*} value - The value to set
     * @returns {boolean} Always true (indicates success)
     */
    set(target, property, value) {
      // Prevent setting properties that exist in config
      hu1(!(property in config));
      target[property] = value;
      return true;
    }
  });
}

module.exports = createObservableProxy;