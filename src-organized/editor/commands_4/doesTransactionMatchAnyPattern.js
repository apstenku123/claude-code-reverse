/**
 * Checks if the transaction property of a given object matches any pattern in the provided patterns array.
 *
 * @param {Object} sourceObject - The object to check. Must have a 'type' property and may have a 'transaction' property.
 * @param {Array<string>} patterns - An array of string patterns to match against the transaction.
 * @returns {boolean} True if the object is of type 'transaction' and its transaction matches any pattern; otherwise, false.
 */
function doesTransactionMatchAnyPattern(sourceObject, patterns) {
  // Ensure the object is of type 'transaction' and patterns is a non-empty array
  if (sourceObject.type !== "transaction" || !patterns || !patterns.length) {
    return false;
  }

  const transaction = sourceObject.transaction;

  // If transaction exists, check if isBlobOrFileLikeObject matches any pattern using ZI utility
  return transaction ? ZI.stringMatchesSomePattern(transaction, patterns) : false;
}

module.exports = doesTransactionMatchAnyPattern;