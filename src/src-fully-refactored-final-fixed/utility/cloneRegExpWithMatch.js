/**
 * Creates a new RegExp object cloned from the given RegExp, preserving its lastIndex property.
 * The new RegExp is constructed using the same constructor, pattern, and flags as the original,
 * and is initialized with the result of kf2.exec on the original RegExp.
 *
 * @param {RegExp} originalRegExp - The RegExp instance to clone.
 * @returns {RegExp} a new RegExp instance with the same pattern, flags, and lastIndex as the original.
 */
function cloneRegExpWithMatch(originalRegExp) {
  // Execute kf2.exec on the original RegExp to get additional constructor arguments
  const execResult = kf2.exec(originalRegExp);
  // Create a new RegExp using the same constructor, pattern, and exec result
  const clonedRegExp = new originalRegExp.constructor(originalRegExp.source, execResult);
  // Preserve the lastIndex property
  clonedRegExp.lastIndex = originalRegExp.lastIndex;
  return clonedRegExp;
}

module.exports = cloneRegExpWithMatch;