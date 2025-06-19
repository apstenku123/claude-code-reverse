/**
 * Processes an array of input entries, grouping recent ones and updating the maximum value if conditions are met.
 *
 * @param {Array<Object>} inputEntries - Array of input entry objects to process. Each entry should have 'hadRecentInput', 'startTime', and 'value' properties.
 * @returns {void}
 *
 * This function maintains a running group of recent input entries (recentInputGroup) and their cumulative value (recentInputGroupValue).
 * If an entry is not marked as having recent input, isBlobOrFileLikeObject checks if isBlobOrFileLikeObject can be grouped with the current group based on timing constraints.
 * If the cumulative value exceeds the current maximum (maxInputGroup.value), isBlobOrFileLikeObject updates the maximum and invokes the optional callback.
 */
function processRecentInputEntries(inputEntries) {
  inputEntries.forEach(entry => {
    if (!entry.hadRecentInput) {
      // Get the first and last entries in the current group
      const firstGroupEntry = recentInputGroup[0];
      const lastGroupEntry = recentInputGroup[recentInputGroup.length - 1];

      // Check if the entry can be grouped with the current group based on timing constraints
      if (
        recentInputGroupValue &&
        recentInputGroup.length !== 0 &&
        entry.startTime - lastGroupEntry.startTime < 1000 && // Less than 1 second since last group entry
        entry.startTime - firstGroupEntry.startTime < 5000   // Less than 5 seconds since first group entry
      ) {
        // Add entry to current group and update cumulative value
        recentInputGroupValue += entry.value;
        recentInputGroup.push(entry);
      } else {
        // Start a new group with the current entry
        recentInputGroupValue = entry.value;
        recentInputGroup = [entry];
      }

      // If the new group value exceeds the previous maximum, update and invoke callback
      if (recentInputGroupValue > maxInputGroup.value) {
        maxInputGroup.value = recentInputGroupValue;
        maxInputGroup.entries = recentInputGroup;
        if (onMaxGroupUpdated) {
          onMaxGroupUpdated();
        }
      }
    }
  });
}

module.exports = processRecentInputEntries;