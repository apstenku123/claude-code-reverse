/**
 * Updates the timestamp fields for each configuration entry in the global J3[wG] array.
 * For every entry with more than two elements, sets the 4th and 5th elements to the current timestamp.
 * Then triggers the processPendingTasks function to perform any necessary follow-up actions.
 *
 * @returns {void} This function does not return a value.
 */
function updateTimestampsForConfigEntries() {
  // Get the current timestamp in milliseconds
  const currentTimestamp = Date.now();

  // Ensure J3[wG] exists and is an array
  if (!Array.isArray(J3[wG])) {
    return;
  }

  // Iterate over each configuration entry in J3[wG]
  for (let entryIndex = 0; entryIndex < J3[wG].length; ++entryIndex) {
    const configEntry = J3[wG][entryIndex];
    // Only update entries with more than two elements
    if (configEntry.length > 2) {
      // Set the 4th and 5th elements to the current timestamp
      configEntry[3] = currentTimestamp;
      configEntry[4] = currentTimestamp;
    }
  }

  // Call processPendingTasks to perform any necessary follow-up actions
  processPendingTasks();
}

module.exports = updateTimestampsForConfigEntries;