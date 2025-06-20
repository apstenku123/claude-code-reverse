/**
 * Applies mixin properties to a constructor'createInteractionAccessor prototype and/or the constructor itself.
 *
 * This function allows you to extend a constructor (class or function) with additional properties or methods.
 * If `prototypeMixins` is provided, its properties are copied to the constructor'createInteractionAccessor prototype (affecting all instances).
 * If `staticMixins` is provided, its properties are copied directly to the constructor (as static properties/methods).
 *
 * @param {Function} constructor - The constructor function or class to extend.
 * @param {Object} [prototypeMixins] - An object containing properties/methods to add to the constructor'createInteractionAccessor prototype.
 * @param {Object} [staticMixins] - An object containing static properties/methods to add directly to the constructor.
 * @returns {Function} The extended constructor.
 */
function applyPrototypeAndStaticMixins(constructor, prototypeMixins, staticMixins) {
  // If prototype mixins are provided, copy them to the constructor'createInteractionAccessor prototype
  if (prototypeMixins) {
    defineProperties(constructor.prototype, prototypeMixins);
  }
  // If static mixins are provided, copy them directly to the constructor
  if (staticMixins) {
    defineProperties(constructor, staticMixins);
  }
  // Return the extended constructor
  return constructor;
}

module.exports = applyPrototypeAndStaticMixins;