/**
 * Checks if the provided object'createInteractionAccessor 'type' property is undefined.
 *
 * @param {Object} targetObject - The object to check for the 'type' property.
 * @returns {boolean} Returns true if 'type' is undefined, otherwise false.
 */
function isTypePropertyUndefined(targetObject) {
  // The 'void 0' expression is equivalent to 'undefined' in JavaScript
  return targetObject.type === undefined;
}

module.exports = isTypePropertyUndefined;