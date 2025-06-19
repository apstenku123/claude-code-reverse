/**
 * Adds prefixed accessor methods (get, set, has) to the target object for a given property name.
 *
 * For a given property name, this function creates methods like getPropertyName, setPropertyName, and hasPropertyName
 * on the target object. These methods internally call the corresponding original methods (get, set, has) with the property name as the first argument.
 *
 * @param {Object} targetObject - The object to which the accessor methods will be added.
 * @param {string} propertyName - The property name for which accessor methods will be created.
 * @returns {void}
 */
function addPrefixedPropertyAccessors(targetObject, propertyName) {
  // Convert the property name to camelCase with a leading space to ensure proper formatting
  const camelCasedProperty = DA.toCamelCase(" " + propertyName);

  // Define accessor methods: getProperty, setProperty, hasProperty
  ["get", "set", "has"].forEach((accessorType) => {
    Object.defineProperty(targetObject, accessorType + camelCasedProperty, {
      value: function (arg1, arg2, arg3) {
        // Call the original accessor with the property name as the first argument
        return this[accessorType].call(this, propertyName, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}

module.exports = addPrefixedPropertyAccessors;