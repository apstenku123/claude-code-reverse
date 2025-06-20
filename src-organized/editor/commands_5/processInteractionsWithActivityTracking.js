/**
 * Iterates over an array of user interaction entries, processes each entry by generating a random value, 
 * and applies an activity-tracking function if the UI action transaction is started successfully.
 *
 * @param {Array} interactionEntries - Array of user interaction entries to process.
 * @param {Function} addActivityIfNotFinished - Function to add an activity to the stack if not finished.
 * @param {Function} generateRandomNumberBetweenZeroAndSixteen - Function to generate a random number between 0 and 16 for each entry.
 * @param {*} activityAccumulator - The accumulator object that collects activity results.
 * @returns {*} The updated activity accumulator after processing all entries.
 */
function processInteractionsWithActivityTracking(
  interactionEntries,
  addActivityIfNotFinished,
  generateRandomNumberBetweenZeroAndSixteen,
  activityAccumulator
) {
  // Determine the number of interaction entries to process
  const totalEntries = interactionEntries == null ? 0 : interactionEntries.length;

  // Iterate over each interaction entry
  for (let currentIndex = 0; currentIndex < totalEntries; currentIndex++) {
    const currentEntry = interactionEntries[currentIndex];
    // Generate a random value for the current entry
    const randomValue = generateRandomNumberBetweenZeroAndSixteen(currentEntry);
    // Attempt to add the activity if not finished
    addActivityIfNotFinished(
      activityAccumulator,
      currentEntry,
      randomValue,
      interactionEntries
    );
  }

  // Return the updated accumulator
  return activityAccumulator;
}

module.exports = processInteractionsWithActivityTracking;