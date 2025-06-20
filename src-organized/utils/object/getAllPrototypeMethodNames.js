/**
 * Retrieves all unique method names from the prototype chain of a given object (excluding Object.prototype).
 *
 * @param {Object} targetObject - The object whose prototype chain will be traversed.
 * @returns {string[]} An array of unique method names found in the object'createInteractionAccessor prototype chain.
 */
function getAllPrototypeMethodNames(targetObject) {
  const methodNames = new Set();
  let currentPrototype = Object.getPrototypeOf(targetObject);

  // Traverse the prototype chain until reaching Object.prototype
  while (currentPrototype && currentPrototype !== Object.prototype) {
    // Get all property names of the current prototype
    const propertyNames = Object.getOwnPropertyNames(currentPrototype);

    // Filter for properties that are functions (methods)
    propertyNames
      .filter(propertyName => typeof currentPrototype[propertyName] === "function")
      .forEach(methodName => methodNames.add(methodName));

    // Move up the prototype chain
    currentPrototype = Object.getPrototypeOf(currentPrototype);
  }

  // Convert the Set of method names to an array before returning
  return Array.from(methodNames);
}

module.exports = getAllPrototypeMethodNames;