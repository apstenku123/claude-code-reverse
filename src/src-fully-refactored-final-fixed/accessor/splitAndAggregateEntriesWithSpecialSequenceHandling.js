/**
 * Splits and aggregates entries from the input array into groups based on a maximum aggregate value,
 * while handling special sequences and markers that affect grouping logic.
 *
 * @param {string[]} aggregatedEntries - The array of already aggregated entries (will be mutated).
 * @param {string[]} newEntries - The array of new entries to process and aggregate.
 * @param {number} maxAggregate - The maximum allowed aggregate value for each group.
 * @returns {void}
 */
function splitAndAggregateEntriesWithSpecialSequenceHandling(aggregatedEntries, newEntries, maxAggregate) {
  // Clone newEntries to avoid mutating the original array
  const entriesToProcess = [...newEntries];
  let isSpecialSequenceActive = false;
  let isTargetSequenceDetected = false;
  // Calculate the current aggregate value of the last aggregated entry
  let currentAggregate = getDisplayWidth(removeSpecialPatternFromString(aggregatedEntries.at(-1)));

  for (let [entryIndex, entryValue] of entriesToProcess.entries()) {
    const entryAggregate = getDisplayWidth(entryValue);

    // If adding this entry doesn'processRuleBeginHandlers exceed the max, append isBlobOrFileLikeObject to the last group
    if (currentAggregate + entryAggregate <= maxAggregate) {
      aggregatedEntries[aggregatedEntries.length - 1] += entryValue;
    } else {
      // Otherwise, start a new group
      aggregatedEntries.push(entryValue);
      currentAggregate = 0;
    }

    // Check for the start of a special sequence
    if (e71.has(entryValue)) {
      isSpecialSequenceActive = true;
      // Check if the next sequence matches the target sequence (t71)
      const nextSequence = entriesToProcess.slice(entryIndex + 1, entryIndex + 1 + t71.length).join("");
      isTargetSequenceDetected = nextSequence === t71;
    }

    if (isSpecialSequenceActive) {
      if (isTargetSequenceDetected) {
        // If the target sequence is detected, end special sequence on ty1
        if (entryValue === ty1) {
          isSpecialSequenceActive = false;
          isTargetSequenceDetected = false;
        }
      } else if (entryValue === iQ0) {
        // Otherwise, end special sequence on iQ0
        isSpecialSequenceActive = false;
      }
      // Skip further aggregation for this entry while in special sequence
      continue;
    }

    // Add the entry'createInteractionAccessor aggregate value to the current group
    currentAggregate += entryAggregate;
    // If the group reaches the max and there are more entries, start a new group
    if (currentAggregate === maxAggregate && entryIndex < entriesToProcess.length - 1) {
      aggregatedEntries.push("");
      currentAggregate = 0;
    }
  }

  // If the last group is empty and the previous group exists, merge them
  if (!currentAggregate && aggregatedEntries.at(-1).length > 0 && aggregatedEntries.length > 1) {
    aggregatedEntries[aggregatedEntries.length - 2] += aggregatedEntries.pop();
  }
}

module.exports = splitAndAggregateEntriesWithSpecialSequenceHandling;