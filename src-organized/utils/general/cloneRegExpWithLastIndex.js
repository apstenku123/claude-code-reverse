/**
 * Creates a clone of the given RegExp object, preserving its source, flags, and lastIndex.
 * Uses the result of kf2.exec on the original RegExp as the flags for the clone.
 *
 * @param {RegExp} originalRegExp - The RegExp instance to clone.
 * @returns {RegExp} a new RegExp object with the same source and flags, and lastIndex copied from the original.
 */
function cloneRegExpWithLastIndex(originalRegExp) {
  // Create a new RegExp using the same constructor, source, and flags (from kf2.exec)
  const clonedRegExp = new originalRegExp.constructor(
    originalRegExp.source,
    kf2.exec(originalRegExp)
  );
  // Preserve the lastIndex property
  clonedRegExp.lastIndex = originalRegExp.lastIndex;
  return clonedRegExp;
}

module.exports = cloneRegExpWithLastIndex;