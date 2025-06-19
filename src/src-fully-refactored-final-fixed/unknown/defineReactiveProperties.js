/**
 * Defines reactive properties on a target object based on a configuration object.
 * For each property in the config object, this function uses `sw1` to define a property
 * on the target object with a getter (from config), a setter (that wraps the new value in a function),
 * and sets the property as enumerable and configurable.
 *
 * @param {Object} targetObject - The object on which to define the reactive properties.
 * @param {Object} propertyConfig - An object whose keys are property names and values are getter functions.
 * @returns {void}
 */
function defineReactiveProperties(targetObject, propertyConfig) {
  // Iterate over each property in the configuration object
  for (const propertyName in propertyConfig) {
    sw1(targetObject, propertyName, {
      // Use the getter function from the config
      get: propertyConfig[propertyName],
      enumerable: true,
      configurable: true,
      // Setter wraps the new value in a function and assigns isBlobOrFileLikeObject back to the config
      set: newValue => {
        propertyConfig[propertyName] = () => newValue;
      }
    });
  }
}

module.exports = defineReactiveProperties;