/**
 * Checks if all specified properties of an object satisfy corresponding predicate functions.
 *
 * @param {Object} targetObject - The object whose properties will be checked.
 * @param {Object} predicateMap - An object mapping property names to predicate functions.
 * @param {Array<string>} propertyKeys - An array of property names to check.
 * @returns {boolean} True if all specified properties exist and their values satisfy the predicates; false otherwise.
 */
function objectPropertiesMatchPredicates(targetObject, predicateMap, propertyKeys) {
  const numberOfProperties = propertyKeys.length;
  // If the target object is null or undefined, only return true if there are no properties to check
  if (targetObject == null) return numberOfProperties === 0;

  // Normalize the target object (e.g., convert to Object if needed)
  const normalizedObject = mergePropertiesWithDescriptors(targetObject);

  // Iterate over each property key
  for (let i = numberOfProperties - 1; i >= 0; i--) {
    const propertyName = propertyKeys[i];
    const predicateFunction = predicateMap[propertyName];
    const propertyValue = normalizedObject[propertyName];

    // If propertyValue is strictly equal to the special 'a' value (undefined sentinel),
    // and the property does not exist in the object, or the predicate returns false,
    // then return false immediately
    if ((propertyValue === a && !(propertyName in normalizedObject)) || !predicateFunction(propertyValue)) {
      return false;
    }
  }
  // All properties passed the predicate checks
  return true;
}

module.exports = objectPropertiesMatchPredicates;