/**
 * Applies prototype and/or static property extensions to a given constructor function.
 *
 * If a prototype extension object is provided, its properties are added to the constructor'createInteractionAccessor prototype.
 * If a static extension object is provided, its properties are added directly to the constructor.
 *
 * @param {Function} constructorFn - The constructor function to be extended.
 * @param {Object} [prototypeExtensions] - An object containing properties to add to the constructor'createInteractionAccessor prototype.
 * @param {Object} [staticExtensions] - An object containing properties to add directly to the constructor function.
 * @returns {Function} The extended constructor function.
 */
function applyPrototypeAndStaticExtensions(constructorFn, prototypeExtensions, staticExtensions) {
  // If prototype extensions are provided, add them to the prototype
  if (prototypeExtensions) {
    defineProperties(constructorFn.prototype, prototypeExtensions);
  }
  // If static extensions are provided, add them directly to the constructor
  if (staticExtensions) {
    defineProperties(constructorFn, staticExtensions);
  }
  return constructorFn;
}

module.exports = applyPrototypeAndStaticExtensions;