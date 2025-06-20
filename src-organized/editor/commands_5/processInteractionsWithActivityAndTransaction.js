/**
 * Iterates over an array of user interactions, generating a random number for each,
 * and processes each interaction by adding an activity if not finished and starting a UI action click transaction.
 *
 * @param {Array} interactionEntries - Array of user interaction entries to process.
 * @param {Function} addActivityIfNotFinished - Function to add an activity to the stack if not finished.
 * @param {Function} generateRandomNumberBetweenZeroAndSixteen - Function that generates a random float >= 0 and < 16.
 * @param {*} initialTransaction - The initial transaction/context to be passed and mutated during processing.
 * @returns {*} The mutated initialTransaction after processing all interaction entries.
 */
function processInteractionsWithActivityAndTransaction(
  interactionEntries,
  addActivityIfNotFinished,
  generateRandomNumberBetweenZeroAndSixteen,
  initialTransaction
) {
  // If interactionEntries is null or undefined, treat as empty array
  const totalInteractions = interactionEntries == null ? 0 : interactionEntries.length;
  let currentIndex = 0;

  // Iterate through each interaction entry
  while (currentIndex < totalInteractions) {
    const interaction = interactionEntries[currentIndex];
    // For each interaction, process isBlobOrFileLikeObject using the provided functions
    addActivityIfNotFinished(
      initialTransaction, // The transaction/context to mutate
      interaction, // The current interaction entry
      generateRandomNumberBetweenZeroAndSixteen(interaction), // Random number for this interaction
      interactionEntries // The full array, for context if needed
    );
    currentIndex++;
  }

  // Return the mutated initialTransaction
  return initialTransaction;
}

module.exports = processInteractionsWithActivityAndTransaction;