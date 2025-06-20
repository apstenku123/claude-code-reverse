/**
 * Clones a given RegExp object, preserving its flags and lastIndex property.
 *
 * @param {RegExp} originalRegExp - The RegExp instance to clone.
 * @returns {RegExp} a new RegExp object with the same pattern, flags, and lastIndex as the original.
 */
function cloneRegExpWithFlagsAndLastIndex(originalRegExp) {
  // Extract the RegExp constructor from the original instance
  const RegExpConstructor = originalRegExp.constructor;

  // Use an external function (kf2.exec) to get the flags for the new RegExp
  // (Assumes kf2.exec returns the flags string, e.g., 'gim')
  const regExpFlags = kf2.exec(originalRegExp);

  // Create a new RegExp with the same pattern and flags
  const clonedRegExp = new RegExpConstructor(originalRegExp.source, regExpFlags);

  // Preserve the lastIndex property for global/multiline regexes
  clonedRegExp.lastIndex = originalRegExp.lastIndex;

  return clonedRegExp;
}

module.exports = cloneRegExpWithFlagsAndLastIndex;