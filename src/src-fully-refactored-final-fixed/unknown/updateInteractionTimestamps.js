/**
 * Updates the timestamp metadata for interaction entries in the global J3[wG] array.
 * For each entry with more than two elements, sets the 4th and 5th elements to the current timestamp.
 * Finally, triggers any post-update processing via processPendingTasks().
 *
 * @returns {void} No return value.
 */
function updateInteractionTimestamps() {
  // Get the current timestamp in milliseconds
  const currentTimestamp = Date.now();

  // Ensure J3[wG] exists and is an array
  if (!Array.isArray(J3[wG])) {
    return;
  }

  // Iterate over each interaction entry in J3[wG]
  for (let entryIndex = 0; entryIndex < J3[wG].length; ++entryIndex) {
    const interactionEntry = J3[wG][entryIndex];
    // Only update entries that have more than two elements
    if (interactionEntry.length > 2) {
      // Set the 4th and 5th elements to the current timestamp
      interactionEntry[3] = currentTimestamp;
      interactionEntry[4] = currentTimestamp;
    }
  }

  // Call the post-update handler
  processPendingTasks();
}

module.exports = updateInteractionTimestamps;