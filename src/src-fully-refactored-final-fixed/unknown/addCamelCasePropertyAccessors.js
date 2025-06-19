/**
 * Adds camelCase accessor methods (get, set, has) for a given property name to an object.
 *
 * For a given property name, this function creates new methods on the target object:
 *   - get<PropertyCamelCase>
 *   - set<PropertyCamelCase>
 *   - has<PropertyCamelCase>
 * Each method delegates to the corresponding original method (get, set, has) with the property name as the first argument.
 *
 * @param {Object} targetObject - The object to which accessor methods will be added.
 * @param {string} propertyName - The property name for which to create accessor methods.
 * @returns {void}
 */
function addCamelCasePropertyAccessors(targetObject, propertyName) {
  // Convert the property name to camelCase, prefixing with a space to match original logic
  const camelCaseProperty = DA.toCamelCase(" " + propertyName);

  // For each accessor type, define a new method on the target object
  ["get", "set", "has"].forEach((accessorType) => {
    Object.defineProperty(targetObject, accessorType + camelCaseProperty, {
      value: function (arg1, arg2, arg3) {
        // Delegate to the original accessor method, passing propertyName as the first argument
        return this[accessorType].call(this, propertyName, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}

module.exports = addCamelCasePropertyAccessors;