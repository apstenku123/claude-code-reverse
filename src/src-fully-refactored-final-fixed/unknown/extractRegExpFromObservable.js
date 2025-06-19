/**
 * Extracts a RegExp object from the provided observable using the isObjectType utility function.
 *
 * @param {any} sourceObservable - The observable or value from which to extract the RegExp.
 * @returns {any} The result of invoking isObjectType with the sourceObservable and 'RegExp'.
 */
function extractRegExpFromObservable(sourceObservable) {
  // Delegates extraction to the isObjectType utility, specifying 'RegExp' as the type to extract
  return isObjectType(sourceObservable, "RegExp");
}

module.exports = extractRegExpFromObservable;