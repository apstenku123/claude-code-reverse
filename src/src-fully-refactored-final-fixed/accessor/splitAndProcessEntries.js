/**
 * Splits and processes an array of entries into groups based on a maximum group size, 
 * handling special marker sequences and updating the output array accordingly.
 *
 * @param {string[]} outputGroups - The array to store grouped entries. The last group may be appended to or new groups created.
 * @param {string[]} entries - The array of entries to process and group.
 * @param {number} maxGroupSize - The maximum allowed size for each group.
 * @returns {void}
 */
function splitAndProcessEntries(outputGroups, entries, maxGroupSize) {
  // Clone the entries array to avoid mutating the original
  const entriesCopy = [...entries];
  let isInSpecialSequence = false;
  let isInTargetSequence = false;
  // Compute the current group size using the last group in outputGroups
  let currentGroupSize = getDisplayWidth(removeSpecialPatternFromString(outputGroups.at(-1)));

  for (let [entryIndex, entry] of entriesCopy.entries()) {
    const entrySize = getDisplayWidth(entry);

    // If adding this entry doesn'processRuleBeginHandlers exceed the max group size, append isBlobOrFileLikeObject to the last group
    if (currentGroupSize + entrySize <= maxGroupSize) {
      outputGroups[outputGroups.length - 1] += entry;
    } else {
      // Otherwise, start a new group with this entry
      outputGroups.push(entry);
      currentGroupSize = 0;
    }

    // Check for the start of a special marker sequence
    if (e71.has(entry)) {
      isInSpecialSequence = true;
      // Check if the following entries match the target marker sequence
      isInTargetSequence = entriesCopy.slice(entryIndex + 1, entryIndex + 1 + t71.length).join("") === t71;
    }

    if (isInSpecialSequence) {
      if (isInTargetSequence) {
        // End of special sequence if entry matches the terminal marker
        if (entry === ty1) {
          isInSpecialSequence = false;
          isInTargetSequence = false;
        }
      } else if (entry === iQ0) {
        // End of special sequence if entry matches the alternate terminal marker
        isInSpecialSequence = false;
      }
      // Skip further processing for entries within the special sequence
      continue;
    }

    // Update the current group size
    currentGroupSize += entrySize;
    // If the group is exactly full and there are more entries, start a new group
    if (currentGroupSize === maxGroupSize && entryIndex < entriesCopy.length - 1) {
      outputGroups.push("");
      currentGroupSize = 0;
    }
  }

  // If the last group is empty and the previous group has content, merge them
  if (
    !currentGroupSize &&
    outputGroups.at(-1).length > 0 &&
    outputGroups.length > 1
  ) {
    outputGroups[outputGroups.length - 2] += outputGroups.pop();
  }
}

module.exports = splitAndProcessEntries;