/**
 * Validates that all specified properties of an object satisfy their corresponding predicate functions.
 *
 * @param {Object} targetObject - The object whose properties are to be validated.
 * @param {Object.<string, Function>} propertyValidators - An object mapping property names to predicate functions.
 * @param {Array<string>} propertyNames - An array of property names to validate.
 * @returns {boolean} Returns true if all specified properties pass their predicates, false otherwise.
 */
function objectPropertiesValidator(targetObject, propertyValidators, propertyNames) {
  const propertyCount = propertyNames.length;

  // If the target object is null or undefined, only return true if there are no properties to validate
  if (targetObject == null) return propertyCount === 0;

  // Normalize the target object (assumes mergePropertiesWithDescriptors is a normalization utility)
  const normalizedObject = mergePropertiesWithDescriptors(targetObject);

  // Iterate over each property name to validate
  for (let i = propertyCount - 1; i >= 0; i--) {
    const propertyName = propertyNames[i];
    const predicate = propertyValidators[propertyName];
    const propertyValue = normalizedObject[propertyName];

    // If propertyValue is strictly equal to a(assumed to be a special marker, e.g., undefined sentinel)
    // and the property does not exist in the object, or the predicate returns false, validation fails
    if ((propertyValue === a && !(propertyName in normalizedObject)) || !predicate(propertyValue)) {
      return false;
    }
  }

  // All properties passed their predicates
  return true;
}

module.exports = objectPropertiesValidator;