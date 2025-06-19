/**
 * Processes a source observable by iterating over its items and performing an activity if not finished,
 * using a randomly generated number for each item, and starts a UI action click transaction.
 *
 * @param {Observable} sourceObservable - The observable or iterable to process.
 * @param {Function} addActivityIfNotFinished - Function to add an activity to the stack if not finished.
 * @param {Function} generateRandomNumberBetweenZeroAndSixteen - Function that generates a random float >= 0 and < 16.
 * @param {Function} startUiActionClickTransaction - Function to start a new UI action click transaction.
 * @returns {Function} The startUiActionClickTransaction function, as per original behavior.
 */
function processActivitiesWithRandomNumbers(
  sourceObservable,
  addActivityIfNotFinished,
  generateRandomNumberBetweenZeroAndSixteen,
  startUiActionClickTransaction
) {
  // Iterate over the sourceObservable using E4A, performing the activity for each item
  E4A(sourceObservable, function (currentItem, index, extraData) {
    // For each item, add an activity if not finished, passing the random number and extra data
    addActivityIfNotFinished(
      startUiActionClickTransaction,
      currentItem,
      generateRandomNumberBetweenZeroAndSixteen(currentItem),
      extraData
    );
  });
  // Return the transaction starter as per original contract
  return startUiActionClickTransaction;
}

module.exports = processActivitiesWithRandomNumbers;