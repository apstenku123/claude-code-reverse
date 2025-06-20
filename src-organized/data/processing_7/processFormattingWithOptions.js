/**
 * Processes a formatting operation on a given text segment, applying formatting options if provided.
 * Adjusts the segment boundaries to include relevant context and applies formatting transformations.
 *
 * @param {string} originalText - The full source text to process.
 * @param {Object} segment - The segment of the text to process, with properties: offset, length, content.
 * @param {Object} options - Options object, may include formattingOptions.
 * @returns {Array<Object>} An array with a single object representing the processed segment: { offset, length, content }.
 */
function processFormattingWithOptions(originalText, segment, options) {
  // If no formatting options are provided, return the segment as-is
  if (!options.formattingOptions) {
    return [segment];
  }

  // Apply initial transformation to the text and segment
  let transformedText = I81(originalText, segment);
  let segmentStart = segment.offset;
  let segmentEnd = segment.offset + segment.content.length;

  // If the segment is empty, expand boundaries to include adjacent context
  if (segment.length === 0 || segment.content.length === 0) {
    // Move segmentStart left until a boundary is found or start of text is reached
    while (segmentStart > 0 && !Ni(transformedText, segmentStart - 1)) {
      segmentStart--;
    }
    // Move segmentEnd right until a boundary is found or end of text is reached
    while (segmentEnd < transformedText.length && !Ni(transformedText, segmentEnd)) {
      segmentEnd++;
    }
  }

  // Apply formatting transformations to the expanded segment
  const formattedSegments = executeAsyncCallback(
    transformedText,
    {
      offset: segmentStart,
      length: segmentEnd - segmentStart
    },
    {
      ...options.formattingOptions,
      keepLines: false // Force keepLines to false
    }
  );

  // For each formatted segment, update the transformed text and adjust boundaries
  for (let i = formattedSegments.length - 1; i >= 0; i--) {
    const formattedSegment = formattedSegments[i];
    transformedText = I81(transformedText, formattedSegment);
    segmentStart = Math.min(segmentStart, formattedSegment.offset);
    segmentEnd = Math.max(segmentEnd, formattedSegment.offset + formattedSegment.length);
    // Adjust segmentEnd for any change in content length
    segmentEnd += formattedSegment.content.length - formattedSegment.length;
  }

  // Calculate the new length of the processed segment
  const processedLength = originalText.length - (transformedText.length - segmentEnd) - segmentStart;

  // Return the processed segment as an array
  return [{
    offset: segmentStart,
    length: processedLength,
    content: transformedText.substring(segmentStart, segmentEnd)
  }];
}

module.exports = processFormattingWithOptions;