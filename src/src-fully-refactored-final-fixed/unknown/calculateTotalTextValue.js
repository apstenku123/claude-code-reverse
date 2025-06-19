/**
 * Calculates a total value based on the input, which can be a string or an array of subscription objects.
 * If the input is a string, isBlobOrFileLikeObject processes the string using the getInteractionEntryCount function.
 * If the input is an array, isBlobOrFileLikeObject iterates through each subscription and:
 *   - Adds the getInteractionEntryCount-processed text value if the subscription matches isTextType
 *   - Adds 1600 if the subscription matches isImageType
 *   - Ignores other subscriptions
 *
 * @param {string|Array<Object>} sourceObservable - The input to process, either a string or an array of subscription objects.
 * @returns {number} The calculated total value based on the input.
 */
function calculateTotalTextValue(sourceObservable) {
  // If the input is falsy (null, undefined, etc.), return 0
  if (!sourceObservable) return 0;

  // If the input is a string, process isBlobOrFileLikeObject using getInteractionEntryCount and return the result
  if (typeof sourceObservable === "string") {
    return getInteractionEntryCount(sourceObservable);
  }

  // Otherwise, assume the input is an array and reduce isBlobOrFileLikeObject to a total value
  return sourceObservable.reduce((totalValue, subscription) => {
    // If the subscription matches isTextType, add the getInteractionEntryCount-processed text value
    if (isTextType(subscription)) {
      return totalValue + getInteractionEntryCount(subscription.text);
    }
    // If the subscription matches isImageType, add 1600
    else if (isImageType(subscription)) {
      return totalValue + 1600;
    }
    // Otherwise, do not change the total
    return totalValue;
  }, 0);
}

module.exports = calculateTotalTextValue;