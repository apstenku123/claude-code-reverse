/**
 * Mutates an observable by decoding an input string from either base64 or UTF-8 encoding.
 *
 * @param {string} encodedString - The input string to decode and mutate.
 * @param {string} encodingType - The encoding type of the input string. Accepts 'base64' or any other value for UTF-8.
 * @returns {any} The result of mutating the decoded observable.
 */
function mutateObservableFromEncodedString(encodedString, encodingType) {
  // If the encoding type is 'base64', decode using c82.fromBase64
  if (encodingType === "base64") {
    const decodedObservable = c82.fromBase64(encodedString);
    return li1.mutate(decodedObservable);
  }
  // Otherwise, decode using l82.fromUtf8
  const decodedObservable = l82.fromUtf8(encodedString);
  return li1.mutate(decodedObservable);
}

module.exports = mutateObservableFromEncodedString;