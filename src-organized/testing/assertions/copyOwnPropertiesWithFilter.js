/**
 * Copies own properties from a source object and its prototype chain to a target object, with optional filtering and prototype traversal control.
 *
 * @param {Object} sourceObject - The object from which to copy properties.
 * @param {Object} [targetObject={}] - The object to which properties will be copied. If not provided, a new object is used.
 * @param {Function|boolean} [prototypePredicate] - Optional. If a function, called with (proto, targetObject) to determine if prototype should be traversed. If false, prototype chain is not traversed.
 * @param {Function} [propertyFilter] - Optional. Function called with (propertyName, sourceObject, targetObject) to determine if a property should be copied.
 * @returns {Object} The target object with copied properties.
 */
function copyOwnPropertiesWithFilter(
  sourceObject,
  targetObject = {},
  prototypePredicate,
  propertyFilter
) {
  // Track which properties have already been copied to avoid duplicates
  const copiedProperties = {};

  // If source is null or undefined, return the target as is
  if (sourceObject == null) return targetObject;

  do {
    // Get all own property names of the current source object
    const propertyNames = Object.getOwnPropertyNames(sourceObject);
    let propertyIndex = propertyNames.length;

    // Iterate over all property names
    while (propertyIndex-- > 0) {
      const propertyName = propertyNames[propertyIndex];
      // Check if property passes the filter (if provided) and hasn'processRuleBeginHandlers been copied yet
      const shouldCopy = (!propertyFilter || propertyFilter(propertyName, sourceObject, targetObject)) && !copiedProperties[propertyName];
      if (shouldCopy) {
        targetObject[propertyName] = sourceObject[propertyName];
        copiedProperties[propertyName] = true;
      }
    }

    // Move up the prototype chain if allowed
    // z$1 is assumed to be a function that returns the prototype of the object
    sourceObject = prototypePredicate !== false && typeof z$1 === 'function' ? z$1(sourceObject) : undefined;
  } while (
    sourceObject &&
    (!prototypePredicate || (typeof prototypePredicate === 'function' && prototypePredicate(sourceObject, targetObject))) &&
    sourceObject !== Object.prototype
  );

  return targetObject;
}

module.exports = copyOwnPropertiesWithFilter;