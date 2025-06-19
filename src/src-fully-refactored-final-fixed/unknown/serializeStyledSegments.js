/**
 * Serializes an array of styled text segments into a single string, applying style transitions.
 * Each segment contains a value and associated styles. The function ensures that style changes
 * between segments are handled by applying the appropriate style transitions.
 *
 * @param {Array<{value: string, styles: Array<any>}>} segments - Array of text segments with styles.
 * @returns {string} The serialized string with style transitions applied.
 */
function serializeStyledSegments(segments) {
  let serialized = "";
  for (let index = 0; index < segments.length; index++) {
    const currentSegment = segments[index];
    // For the first segment, apply its styles directly
    if (index === 0) {
      serialized += Ea(currentSegment.styles);
    } else {
      // For subsequent segments, apply the transition from previous styles to current styles
      const previousStyles = segments[index - 1].styles;
      serialized += Ea(TI1(previousStyles, currentSegment.styles));
    }
    // Append the segment'createInteractionAccessor value
    serialized += currentSegment.value;
    // If this is the last segment, close any remaining styles
    if (index === segments.length - 1) {
      serialized += Ea(TI1(currentSegment.styles, []));
    }
  }
  return serialized;
}

module.exports = serializeStyledSegments;