/**
 * Aggregates consecutive input entries within specific time windows and updates the maximum aggregate value.
 *
 * @param {Array<Object>} inputEntries - Array of input entry objects to process. Each entry should have at least 'hadRecentInput', 'startTime', and 'value' properties.
 * @returns {void}
 *
 * The function updates the global 'maxAggregate' object if a new maximum aggregate is found, and optionally calls a callback.
 */
function aggregateRecentInputEntries(inputEntries) {
  inputEntries.forEach(entry => {
    // Only process entries that did NOT have recent input
    if (!entry.hadRecentInput) {
      // Get the first and last entries in the current aggregation window
      const firstEntry = aggregationWindow[0];
      const lastEntry = aggregationWindow[aggregationWindow.length - 1];

      // Check if handleMissingDoctypeError can aggregate this entry with the current window
      if (
        currentAggregateValue &&
        aggregationWindow.length !== 0 &&
        entry.startTime - lastEntry.startTime < 1000 && // Less than 1s since last entry
        entry.startTime - firstEntry.startTime < 5000   // Less than 5s since first entry
      ) {
        // Aggregate the value and add entry to window
        currentAggregateValue += entry.value;
        aggregationWindow.push(entry);
      } else {
        // Start a new aggregation window
        currentAggregateValue = entry.value;
        aggregationWindow = [entry];
      }

      // If the new aggregate is greater than the previous maximum, update isBlobOrFileLikeObject
      if (currentAggregateValue > maxAggregate.value) {
        maxAggregate.value = currentAggregateValue;
        maxAggregate.entries = aggregationWindow;
        if (onAggregateUpdate) {
          onAggregateUpdate();
        }
      }
    }
  });
}

module.exports = aggregateRecentInputEntries;