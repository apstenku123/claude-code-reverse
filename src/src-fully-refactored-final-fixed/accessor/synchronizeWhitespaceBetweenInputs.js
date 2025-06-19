/**
 * Synchronizes leading and trailing whitespace between multiple input-like objects.
 *
 * This function ensures that the whitespace (prefixes and suffixes) of the values in the provided objects
 * (such as input fields or similar) are consistent with each other, using a set of utility functions to
 * find common prefixes/suffixes and update the values accordingly. It supports several combinations of
 * provided parameters and updates their `.value` properties in-place.
 *
 * @param {Object} sourceInput - The primary input object whose value'createInteractionAccessor whitespace may be synchronized.
 *   Must have a `.value` property (string). Can be null.
 * @param {Object} referenceInput - The secondary input object used as a reference for whitespace synchronization.
 *   Must have a `.value` property (string). Can be null.
 * @param {Object} targetInput - The target input object whose value'createInteractionAccessor whitespace may be synchronized.
 *   Must have a `.value` property (string). Can be null.
 * @param {Object} trailingInput - An optional input object for trailing whitespace synchronization.
 *   Must have a `.value` property (string). Can be null.
 * @returns {void}
 */
function synchronizeWhitespaceBetweenInputs(sourceInput, referenceInput, targetInput, trailingInput) {
  if (referenceInput && targetInput) {
    // Extract leading and trailing whitespace from reference and target inputs
    const referenceLeadingWhitespace = referenceInput.value.match(/^\s*/)[0];
    const referenceTrailingWhitespace = referenceInput.value.match(/\s*$/)[0];
    const targetLeadingWhitespace = targetInput.value.match(/^\s*/)[0];
    const targetTrailingWhitespace = targetInput.value.match(/\s*$/)[0];

    if (sourceInput) {
      // Synchronize leading whitespace using the longest common prefix
      const commonLeadingWhitespace = getCommonPrefix(referenceLeadingWhitespace, targetLeadingWhitespace);
      sourceInput.value = replaceStringSuffix(sourceInput.value, targetLeadingWhitespace, commonLeadingWhitespace);
      referenceInput.value = replacePrefixIfPresent(referenceInput.value, commonLeadingWhitespace);
      targetInput.value = replacePrefixIfPresent(targetInput.value, commonLeadingWhitespace);
    }
    if (trailingInput) {
      // Synchronize trailing whitespace using the longest common suffix
      const commonTrailingWhitespace = getCommonSuffixFromStrings(referenceTrailingWhitespace, targetTrailingWhitespace);
      trailingInput.value = prependPrefixIfPresent(trailingInput.value, targetTrailingWhitespace, commonTrailingWhitespace);
      referenceInput.value = DK1(referenceInput.value, commonTrailingWhitespace);
      targetInput.value = DK1(targetInput.value, commonTrailingWhitespace);
    }
  } else if (targetInput) {
    // Only targetInput is present; trim leading whitespace from target and trailing inputs if present
    if (sourceInput) {
      targetInput.value = targetInput.value.replace(/^\s*/, "");
    }
    if (trailingInput) {
      trailingInput.value = trailingInput.value.replace(/^\s*/, "");
    }
  } else if (sourceInput && trailingInput) {
    // Only sourceInput and trailingInput are present; synchronize leading and trailing whitespace
    const trailingLeadingWhitespace = trailingInput.value.match(/^\s*/)[0];
    const referenceLeadingWhitespace = referenceInput.value.match(/^\s*/)[0];
    const referenceTrailingWhitespace = referenceInput.value.match(/\s*$/)[0];
    const commonLeadingWhitespace = getCommonPrefix(trailingLeadingWhitespace, referenceLeadingWhitespace);
    referenceInput.value = replacePrefixIfPresent(referenceInput.value, commonLeadingWhitespace);
    const commonTrailingWhitespace = getCommonSuffixFromStrings(
      replacePrefixIfPresent(trailingLeadingWhitespace, commonLeadingWhitespace),
      referenceTrailingWhitespace
    );
    referenceInput.value = DK1(referenceInput.value, commonTrailingWhitespace);
    trailingInput.value = prependPrefixIfPresent(trailingInput.value, trailingLeadingWhitespace, commonTrailingWhitespace);
    sourceInput.value = replaceStringSuffix(
      sourceInput.value,
      trailingLeadingWhitespace,
      trailingLeadingWhitespace.slice(0, trailingLeadingWhitespace.length - commonTrailingWhitespace.length)
    );
  } else if (trailingInput) {
    // Only trailingInput is present; synchronize trailing whitespace with referenceInput
    const trailingLeadingWhitespace = trailingInput.value.match(/^\s*/)[0];
    const referenceTrailingWhitespace = referenceInput.value.match(/\s*$/)[0];
    const commonWhitespace = uz2(referenceTrailingWhitespace, trailingLeadingWhitespace);
    referenceInput.value = DK1(referenceInput.value, commonWhitespace);
  } else if (sourceInput) {
    // Only sourceInput is present; synchronize trailing whitespace with referenceInput
    const sourceTrailingWhitespace = sourceInput.value.match(/\s*$/)[0];
    const referenceLeadingWhitespace = referenceInput.value.match(/^\s*/)[0];
    const commonWhitespace = uz2(sourceTrailingWhitespace, referenceLeadingWhitespace);
    referenceInput.value = replacePrefixIfPresent(referenceInput.value, commonWhitespace);
  }
}

module.exports = synchronizeWhitespaceBetweenInputs;