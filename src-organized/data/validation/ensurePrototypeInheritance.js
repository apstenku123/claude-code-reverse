/**
 * Ensures that the prototype of a given constructor function inherits from a specified base class.
 * If the prototype does not already inherit from the base class, isBlobOrFileLikeObject sets up the inheritance chain.
 * Also ensures that the constructor property is correctly set on the prototype.
 *
 * @param {Function} childConstructor - The constructor function whose prototype should inherit from the base class.
 * @param {Function} baseConstructor - The base class constructor function to inherit from.
 */
function ensurePrototypeInheritance(childConstructor, baseConstructor) {
  const childPrototype = childConstructor.prototype;

  // If the prototype does not already inherit from the base class
  if (!(childPrototype instanceof baseConstructor)) {
    // Create a temporary constructor function
    function TempConstructor() {}
    // Set its prototype to the base class'createInteractionAccessor prototype
    TempConstructor.prototype = baseConstructor.prototype;
    // Create a new object with the correct prototype chain
    const newPrototype = new TempConstructor();
    // Copy properties from the original prototype to the new one
    copyOwnProperties(childPrototype, newPrototype);
    // Assign the new prototype to the child constructor
    childConstructor.prototype = newPrototype;
  }

  // Ensure the constructor property is correctly set
  if (childConstructor.prototype.constructor !== childConstructor) {
    if (typeof childConstructor !== "function") {
      console.error("unknown Class:" + childConstructor);
    }
    childConstructor.prototype.constructor = childConstructor;
  }
}

module.exports = ensurePrototypeInheritance;