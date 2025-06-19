/**
 * Serializes an array of styled value objects into a single string, applying style transitions between each value.
 *
 * Each element in the input array should have a `styles` property (an array or object representing styles)
 * and a `value` property (the string content). The function applies the initial styles, then for each subsequent
 * value, applies only the style differences from the previous value. At the end, isBlobOrFileLikeObject applies the transition from the
 * last value'createInteractionAccessor styles to an empty style set.
 *
 * @param {Array<{styles: any, value: string}>} styledValueSequence - Array of objects with `styles` and `value` properties.
 * @returns {string} The serialized string with style transitions applied.
 */
function serializeStyledValueSequence(styledValueSequence) {
  let serializedString = "";
  for (let index = 0; index < styledValueSequence.length; index++) {
    const currentEntry = styledValueSequence[index];
    // For the first entry, apply its full styles; for subsequent entries, apply only the style difference from the previous entry
    if (index === 0) {
      serializedString += Ea(currentEntry.styles);
    } else {
      const previousEntry = styledValueSequence[index - 1];
      serializedString += Ea(TI1(previousEntry.styles, currentEntry.styles));
    }
    // Append the value itself
    serializedString += currentEntry.value;
    // For the last entry, apply the transition from its styles to an empty style set
    if (index === styledValueSequence.length - 1) {
      serializedString += Ea(TI1(currentEntry.styles, []));
    }
  }
  return serializedString;
}

module.exports = serializeStyledValueSequence;