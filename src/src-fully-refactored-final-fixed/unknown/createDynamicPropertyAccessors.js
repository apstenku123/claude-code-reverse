/**
 * Generates an object with dynamic property accessors for each key in the `yO2` object.
 * Each property is defined with a getter that, when accessed, calls `createStyledFunction` with the property name.
 *
 * @returns {Object} An object whose properties correspond to the keys of `yO2`, each with a getter that returns the result of `createStyledFunction([propertyName])`.
 */
function createDynamicPropertyAccessors() {
  const dynamicAccessors = {};
  // Iterate over each key in the yO2 object
  Object.keys(yO2).forEach(function(propertyName) {
    // Define a getter for each property that calls createStyledFunction with the property name
    dynamicAccessors[propertyName] = {
      get: function() {
        return createStyledFunction([propertyName]);
      }
    };
  });
  return dynamicAccessors;
}

module.exports = createDynamicPropertyAccessors;