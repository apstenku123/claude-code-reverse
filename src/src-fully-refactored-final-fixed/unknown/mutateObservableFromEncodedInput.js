/**
 * Mutates an observable input by decoding isBlobOrFileLikeObject from either base64 or UTF-8 encoding.
 *
 * If the encoding type is 'base64', the input string is decoded from base64 before mutation.
 * Otherwise, the input string is decoded from UTF-8 before mutation.
 *
 * @param {string} encodedInput - The encoded string to be decoded and mutated.
 * @param {string} encodingType - The encoding type of the input string ('base64' or other).
 * @returns {any} The result of mutating the decoded observable.
 */
function mutateObservableFromEncodedInput(encodedInput, encodingType) {
  // If the encoding type is 'base64', decode from base64 and mutate
  if (encodingType === "base64") {
    const decodedObservable = AmA.fromBase64(encodedInput);
    return tT1.mutate(decodedObservable);
  }
  // Otherwise, decode from UTF-8 and mutate
  const decodedObservable = BmA.fromUtf8(encodedInput);
  return tT1.mutate(decodedObservable);
}

module.exports = mutateObservableFromEncodedInput;