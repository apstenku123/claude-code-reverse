/**
 * Applies prototype and static properties to a constructor function.
 *
 * This function assigns properties to the prototype and/or the constructor itself
 * using the provided property objects. It is useful for extending classes or
 * constructor functions with additional methods or static properties.
 *
 * @param {Function} constructorFn - The constructor function to extend.
 * @param {Object} [prototypeProperties] - Properties to assign to the constructor'createInteractionAccessor prototype.
 * @param {Object} [staticProperties] - Properties to assign directly to the constructor function.
 * @returns {Function} The extended constructor function.
 */
function applyPrototypeAndStaticProperties(constructorFn, prototypeProperties, staticProperties) {
  // If prototypeProperties are provided, assign them to the prototype
  if (prototypeProperties) {
    definePropertiesFromDescriptors(constructorFn.prototype, prototypeProperties);
  }
  // If staticProperties are provided, assign them directly to the constructor
  if (staticProperties) {
    definePropertiesFromDescriptors(constructorFn, staticProperties);
  }
  // Return the extended constructor function
  return constructorFn;
}

module.exports = applyPrototypeAndStaticProperties;