/**
 * Updates the timestamp fields (indices 3 and 4) for each entry in the J3[wG] array
 * if the entry has more than two elements. Uses the current timestamp from Date.now().
 * Finally, calls the processPendingTasks function to perform any necessary follow-up actions.
 *
 * @returns {void} This function does not return a value.
 */
function updateTimestampsForJ3Entries() {
  // Get the current timestamp in milliseconds
  const currentTimestamp = Date.now();

  // Ensure J3[wG] exists and is an array before proceeding
  if (!Array.isArray(J3[wG])) {
    return;
  }

  // Iterate over each entry in the J3[wG] array
  for (let entryIndex = 0; entryIndex < J3[wG].length; ++entryIndex) {
    const entry = J3[wG][entryIndex];
    // Only update entries that have more than two elements
    if (entry.length > 2) {
      // Set both the 4th and 5th elements (indices 3 and 4) to the current timestamp
      entry[3] = currentTimestamp;
      entry[4] = currentTimestamp;
    }
  }

  // Call processPendingTasks to perform any additional required actions
  processPendingTasks();
}

module.exports = updateTimestampsForJ3Entries;