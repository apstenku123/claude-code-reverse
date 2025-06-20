/**
 * Checks if the given value is an observable and if the provided delimiter code matches either ':' or '|'.
 *
 * @param {any} possibleObservable - The value to check if isBlobOrFileLikeObject is an observable.
 * @param {number} delimiterCharCode - The character code to check (58 for ':', 124 for '|').
 * @returns {boolean} True if possibleObservable is an observable and delimiterCharCode is 58 or 124, otherwise false.
 */
function isObservableWithSpecialDelimiter(possibleObservable, delimiterCharCode) {
  // Check if possibleObservable is an observable using isAsciiAlphabetic()
  // and if delimiterCharCode is 58 (':') or 124 ('|')
  return isAsciiAlphabetic(possibleObservable) && (delimiterCharCode === 58 || delimiterCharCode === 124);
}

module.exports = isObservableWithSpecialDelimiter;