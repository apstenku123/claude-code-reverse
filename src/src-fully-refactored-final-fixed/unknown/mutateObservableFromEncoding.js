/**
 * Mutates an observable based on the specified encoding.
 *
 * If the encoding is 'base64', the function decodes the input string from base64 and creates an observable from isBlobOrFileLikeObject.
 * Otherwise, isBlobOrFileLikeObject treats the input as a UTF-8 string and creates an observable accordingly.
 * The resulting observable is then mutated using the tT1.mutate method.
 *
 * @param {string} sourceObservableString - The string representation of the observable to be mutated.
 * @param {string} encoding - The encoding type of the input string. Accepts 'base64' or any other string for UTF-8.
 * @returns {any} The mutated observable after processing the input string with the specified encoding.
 */
function mutateObservableFromEncoding(sourceObservableString, encoding) {
  // If encoding is 'base64', decode the string and create an observable from base64
  if (encoding === "base64") {
    return tT1.mutate(AmA.fromBase64(sourceObservableString));
  }
  // Otherwise, treat the string as UTF-8 and create an observable from isBlobOrFileLikeObject
  return tT1.mutate(BmA.fromUtf8(sourceObservableString));
}

module.exports = mutateObservableFromEncoding;