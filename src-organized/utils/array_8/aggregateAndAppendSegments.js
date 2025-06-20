/**
 * Aggregates segments from the input array into the result array, ensuring that each segment'createInteractionAccessor total size does not exceed the given limit.
 * Handles special control sequences and markers to manage segment grouping and boundaries.
 *
 * @param {string[]} resultSegments - The array of string segments to which new segments will be appended or merged.
 * @param {string[]} inputSegments - The array of input string segments to process and aggregate.
 * @param {number} maxSegmentSize - The maximum allowed size for each segment aggregation.
 * @returns {void} This function mutates the resultSegments array in place.
 */
const aggregateAndAppendSegments = (resultSegments, inputSegments, maxSegmentSize) => {
  // Clone the inputSegments to avoid mutating the original array
  const segmentsToProcess = [...inputSegments];

  // Flags for control sequence detection
  let isInControlSequence = false;
  let isInSpecialSequence = false;

  // Get the size of the last segment in the resultSegments array
  let currentSegmentSize = getDisplayWidth(removeSpecialPatternFromString(resultSegments.at(-1)));

  for (const [segmentIndex, segmentValue] of segmentsToProcess.entries()) {
    const segmentSize = getDisplayWidth(segmentValue);

    // If adding this segment does not exceed the max size, append to the last segment
    if (currentSegmentSize + segmentSize <= maxSegmentSize) {
      resultSegments[resultSegments.length - 1] += segmentValue;
    } else {
      // Otherwise, start a new segment
      resultSegments.push(segmentValue);
      currentSegmentSize = 0;
    }

    // Check for control sequence start
    if (e71.has(segmentValue)) {
      isInControlSequence = true;
      // Check if the next sequence matches the special control sequence t71
      isInSpecialSequence = segmentsToProcess.slice(segmentIndex + 1, segmentIndex + 1 + t71.length).join("") === t71;
    }

    // Handle control sequence logic
    if (isInControlSequence) {
      if (isInSpecialSequence) {
        // End special sequence if marker ty1 is found
        if (segmentValue === ty1) {
          isInControlSequence = false;
          isInSpecialSequence = false;
        }
      } else if (segmentValue === iQ0) {
        // End regular control sequence if marker iQ0 is found
        isInControlSequence = false;
      }
      // Skip further processing for this segment
      continue;
    }

    // Update the current segment size
    currentSegmentSize += segmentSize;

    // If the current segment size exactly matches the max and there are more segments to process, start a new segment
    if (currentSegmentSize === maxSegmentSize && segmentIndex < segmentsToProcess.length - 1) {
      resultSegments.push("");
      currentSegmentSize = 0;
    }
  }

  // If the last segment is empty and the previous segment exists, merge them
  if (
    !currentSegmentSize &&
    resultSegments.at(-1).length > 0 &&
    resultSegments.length > 1
  ) {
    resultSegments[resultSegments.length - 2] += resultSegments.pop();
  }
};

module.exports = aggregateAndAppendSegments;