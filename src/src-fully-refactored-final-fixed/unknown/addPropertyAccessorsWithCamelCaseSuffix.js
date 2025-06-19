/**
 * Adds 'get', 'set', and 'has' property accessors to the target object, each suffixed with a camel-cased version of the provided property name.
 * The accessor methods delegate to the original 'get', 'set', or 'has' methods of the target object, passing the original property name as the first argument.
 *
 * @param {Object} targetObject - The object to which the accessor methods will be added.
 * @param {string} propertyName - The property name to be camel-cased and suffixed to the accessor method names.
 */
function addPropertyAccessorsWithCamelCaseSuffix(targetObject, propertyName) {
  // Convert the property name to camelCase, prefixing with a space to ensure proper casing
  const camelCasedSuffix = DA.toCamelCase(" " + propertyName);

  // For each accessor type, define a new method on the target object
  ["get", "set", "has"].forEach((accessorType) => {
    Object.defineProperty(targetObject, accessorType + camelCasedSuffix, {
      value: function (arg1, arg2, arg3) {
        // Delegate to the original accessor, always passing the original property name as the first argument
        return this[accessorType].call(this, propertyName, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}

module.exports = addPropertyAccessorsWithCamelCaseSuffix;