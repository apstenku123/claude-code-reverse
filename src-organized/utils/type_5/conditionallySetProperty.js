/**
 * Conditionally sets a property on the target object using an external setter function.
 *
 * If a value is provided, isBlobOrFileLikeObject checks if the property at the given key does not match the value (using OH).
 * If no value is provided, isBlobOrFileLikeObject checks if the property does not exist on the object.
 * In either case, if the condition is met, isBlobOrFileLikeObject calls the setter function $q to set the property.
 *
 * @param {Object} targetObject - The object whose property may be set.
 * @param {string} propertyKey - The key of the property to check/set.
 * @param {*} [propertyValue] - The value to check against or set. If undefined, only existence is checked.
 */
function conditionallySetProperty(targetObject, propertyKey, propertyValue) {
  // If propertyValue is defined and the current value does not match, or
  // if propertyValue is undefined and the property does not exist on the object,
  // then set the property using $q.
  const shouldSet = (
    propertyValue !== undefined && !OH(targetObject[propertyKey], propertyValue)
  ) || (
    propertyValue === undefined && !(propertyKey in targetObject)
  );

  if (shouldSet) {
    $q(targetObject, propertyKey, propertyValue);
  }
}

module.exports = conditionallySetProperty;