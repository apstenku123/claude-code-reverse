/**
 * Synchronizes leading and trailing whitespace between multiple input fields, ensuring consistent formatting.
 *
 * This function compares the leading and trailing whitespace of the provided fields and updates their values
 * to maintain consistent whitespace, using a set of helper functions for prefix/suffix detection and replacement.
 *
 * @param {HTMLInputElement} sourceField - The primary input field whose whitespace may be synchronized.
 * @param {HTMLInputElement} referenceField - The field used as a reference for whitespace synchronization.
 * @param {HTMLInputElement} targetField - The field whose whitespace is compared and potentially updated.
 * @param {HTMLInputElement} trailingField - An optional field for synchronizing trailing whitespace.
 * @returns {void}
 */
function synchronizeWhitespaceBetweenFields(sourceField, referenceField, targetField, trailingField) {
  if (referenceField && targetField) {
    // Extract leading and trailing whitespace from reference and target fields
    const referenceLeadingWhitespace = referenceField.value.match(/^\s*/)[0];
    const referenceTrailingWhitespace = referenceField.value.match(/\s*$/)[0];
    const targetLeadingWhitespace = targetField.value.match(/^\s*/)[0];
    const targetTrailingWhitespace = targetField.value.match(/\s*$/)[0];

    // Synchronize leading whitespace if sourceField is provided
    if (sourceField) {
      // Find the common prefix (leading whitespace) between reference and target
      const commonLeadingWhitespace = getCommonPrefix(referenceLeadingWhitespace, targetLeadingWhitespace);
      // Update source, reference, and target fields to use the common leading whitespace
      sourceField.value = replaceStringSuffix(sourceField.value, targetLeadingWhitespace, commonLeadingWhitespace);
      referenceField.value = replacePrefixIfPresent(referenceField.value, commonLeadingWhitespace);
      targetField.value = replacePrefixIfPresent(targetField.value, commonLeadingWhitespace);
    }

    // Synchronize trailing whitespace if trailingField is provided
    if (trailingField) {
      // Find the common suffix (trailing whitespace) between reference and target
      const commonTrailingWhitespace = getCommonSuffixFromStrings(referenceTrailingWhitespace, targetTrailingWhitespace);
      // Update trailing, reference, and target fields to use the common trailing whitespace
      trailingField.value = prependPrefixIfPresent(trailingField.value, targetTrailingWhitespace, commonTrailingWhitespace);
      referenceField.value = DK1(referenceField.value, commonTrailingWhitespace);
      targetField.value = DK1(targetField.value, commonTrailingWhitespace);
    }
  } else if (targetField) {
    // If only targetField is present, remove leading whitespace from target and trailing fields
    if (sourceField) {
      targetField.value = targetField.value.replace(/^\s*/, "");
    }
    if (trailingField) {
      trailingField.value = trailingField.value.replace(/^\s*/, "");
    }
  } else if (sourceField && trailingField) {
    // Synchronize leading and trailing whitespace between source, reference, and trailing fields
    const trailingLeadingWhitespace = trailingField.value.match(/^\s*/)[0];
    const referenceLeadingWhitespace = referenceField.value.match(/^\s*/)[0];
    const referenceTrailingWhitespace = referenceField.value.match(/\s*$/)[0];
    // Find common prefix for leading whitespace
    const commonLeadingWhitespace = getCommonPrefix(trailingLeadingWhitespace, referenceLeadingWhitespace);
    referenceField.value = replacePrefixIfPresent(referenceField.value, commonLeadingWhitespace);
    // Find common suffix for trailing whitespace
    const commonTrailingWhitespace = getCommonSuffixFromStrings(replacePrefixIfPresent(trailingLeadingWhitespace, commonLeadingWhitespace), referenceTrailingWhitespace);
    referenceField.value = DK1(referenceField.value, commonTrailingWhitespace);
    trailingField.value = prependPrefixIfPresent(trailingField.value, trailingLeadingWhitespace, commonTrailingWhitespace);
    // Update sourceField with the adjusted leading whitespace
    sourceField.value = replaceStringSuffix(sourceField.value, trailingLeadingWhitespace, trailingLeadingWhitespace.slice(0, trailingLeadingWhitespace.length - commonTrailingWhitespace.length));
  } else if (trailingField) {
    // If only trailingField is present, synchronize trailing whitespace with referenceField
    const trailingLeadingWhitespace = trailingField.value.match(/^\s*/)[0];
    const referenceTrailingWhitespace = referenceField.value.match(/\s*$/)[0];
    const commonWhitespace = uz2(referenceTrailingWhitespace, trailingLeadingWhitespace);
    referenceField.value = DK1(referenceField.value, commonWhitespace);
  } else if (sourceField) {
    // If only sourceField is present, synchronize trailing whitespace with referenceField
    const sourceTrailingWhitespace = sourceField.value.match(/\s*$/)[0];
    const referenceLeadingWhitespace = referenceField.value.match(/^\s*/)[0];
    const commonWhitespace = uz2(sourceTrailingWhitespace, referenceLeadingWhitespace);
    referenceField.value = replacePrefixIfPresent(referenceField.value, commonWhitespace);
  }
}

module.exports = synchronizeWhitespaceBetweenFields;