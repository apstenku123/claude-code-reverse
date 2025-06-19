/**
 * Enhances a constructor function by applying prototype and static property enhancements.
 *
 * If a prototypeEnhancements object is provided, its properties are applied to the constructor'createInteractionAccessor prototype.
 * If a staticEnhancements object is provided, its properties are applied directly to the constructor.
 *
 * @param {Function} constructorFn - The constructor function to enhance.
 * @param {Object} [prototypeEnhancements] - Properties/methods to add to the prototype.
 * @param {Object} [staticEnhancements] - Properties/methods to add as static members.
 * @returns {Function} The enhanced constructor function.
 */
function applyPrototypeAndStaticEnhancements(constructorFn, prototypeEnhancements, staticEnhancements) {
  // Apply enhancements to the prototype if provided
  if (prototypeEnhancements) {
    defineProperties(constructorFn.prototype, prototypeEnhancements);
  }

  // Apply static enhancements if provided
  if (staticEnhancements) {
    defineProperties(constructorFn, staticEnhancements);
  }

  return constructorFn;
}

module.exports = applyPrototypeAndStaticEnhancements;