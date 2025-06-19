/**
 * Extends the prototype of the given constructor with accessor methods.
 *
 * This function takes a constructor (typically for an Observable or similar object)
 * and augments its prototype with additional accessor methods/properties returned by createBodyParsers.
 *
 * @param {Function} targetConstructor - The constructor whose prototype will be extended.
 * @returns {void}
 */
function extendPrototypeWithAccessors(targetConstructor) {
  // Merge the accessor methods/properties into the prototype of the target constructor
  Object.assign(targetConstructor.prototype, createBodyParsers(targetConstructor));
}

module.exports = extendPrototypeWithAccessors;