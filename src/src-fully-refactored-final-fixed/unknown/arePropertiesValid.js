/**
 * Checks if all specified properties of an object satisfy corresponding predicate functions.
 *
 * @param {Object} targetObject - The object whose properties are to be validated.
 * @param {Object.<string, Function>} propertyValidators - An object mapping property names to predicate functions.
 * @param {string[]} propertyNames - An array of property names to validate.
 * @returns {boolean} True if all specified properties exist (or are undefined but present in the object) and pass their corresponding predicate functions; false otherwise.
 */
function arePropertiesValid(targetObject, propertyValidators, propertyNames) {
  let propertyCount = propertyNames.length;

  // If the target object is null or undefined, only return true if there are no properties to check
  if (targetObject == null) return propertyCount === 0;

  // Normalize the target object (mergePropertiesWithDescriptors is assumed to be a normalization function)
  const normalizedObject = mergePropertiesWithDescriptors(targetObject);

  // Iterate over each property to validate
  while (propertyCount--) {
    const propertyName = propertyNames[propertyCount];
    const validator = propertyValidators[propertyName];
    const propertyValue = normalizedObject[propertyName];

    // If the property value is strictly equal to the special 'a' value (likely 'undefined'),
    // and the property does not exist in the object, or the validator returns false, return false
    if ((propertyValue === a && !(propertyName in normalizedObject)) || !validator(propertyValue)) {
      return false;
    }
  }

  // All properties passed their validators
  return true;
}

module.exports = arePropertiesValid;