/**
 * Normalizes and synchronizes leading and trailing whitespace between related input fields.
 *
 * This function adjusts the whitespace at the start and end of the values of up to four input-like objects,
 * ensuring consistency between them. It uses several helper functions to compute and apply the necessary changes.
 *
 * @param {Object} sourceField - The primary field whose value may be updated (e.g., the main input).
 * @param {Object} configField - The configuration field whose whitespace is used for comparison and normalization.
 * @param {Object} subscriptionField - The subscription field whose whitespace is also synchronized.
 * @param {Object} trailingField - An optional field for trailing whitespace normalization.
 * @returns {void}
 */
function normalizeWhitespaceBetweenFields(sourceField, configField, subscriptionField, trailingField) {
  // Case 1: Both configField and subscriptionField are provided
  if (configField && subscriptionField) {
    // Extract leading and trailing whitespace from configField and subscriptionField
    const configLeadingWhitespace = configField.value.match(/^\s*/)[0];
    const configTrailingWhitespace = configField.value.match(/\s*$/)[0];
    const subscriptionLeadingWhitespace = subscriptionField.value.match(/^\s*/)[0];
    const subscriptionTrailingWhitespace = subscriptionField.value.match(/\s*$/)[0];

    // If sourceField exists, synchronize leading whitespace
    if (sourceField) {
      // Compute the merged leading whitespace
      const mergedLeadingWhitespace = getCommonPrefix(configLeadingWhitespace, subscriptionLeadingWhitespace);
      // Update values with normalized leading whitespace
      sourceField.value = replaceStringSuffix(sourceField.value, subscriptionLeadingWhitespace, mergedLeadingWhitespace);
      configField.value = combineObservablesWithConfig(configField.value, mergedLeadingWhitespace);
      subscriptionField.value = combineObservablesWithConfig(subscriptionField.value, mergedLeadingWhitespace);
    }
    // If trailingField exists, synchronize trailing whitespace
    if (trailingField) {
      // Compute the merged trailing whitespace
      const mergedTrailingWhitespace = getCommonSuffixFromStrings(configTrailingWhitespace, subscriptionTrailingWhitespace);
      // Update values with normalized trailing whitespace
      trailingField.value = fo1(trailingField.value, subscriptionTrailingWhitespace, mergedTrailingWhitespace);
      configField.value = DK1(configField.value, mergedTrailingWhitespace);
      subscriptionField.value = DK1(subscriptionField.value, mergedTrailingWhitespace);
    }
  }
  // Case 2: Only subscriptionField is provided
  else if (subscriptionField) {
    if (sourceField) {
      // Remove leading whitespace from subscriptionField
      subscriptionField.value = subscriptionField.value.replace(/^\s*/, "");
    }
    if (trailingField) {
      // Remove leading whitespace from trailingField
      trailingField.value = trailingField.value.replace(/^\s*/, "");
    }
  }
  // Case 3: sourceField and trailingField are provided, but not subscriptionField
  else if (sourceField && trailingField) {
    // Extract leading whitespace from trailingField and configField
    const trailingFieldLeadingWhitespace = trailingField.value.match(/^\s*/)[0];
    const configLeadingWhitespace = configField.value.match(/^\s*/)[0];
    // Extract trailing whitespace from configField
    const configTrailingWhitespace = configField.value.match(/\s*$/)[0];
    // Compute merged leading whitespace
    const mergedLeadingWhitespace = getCommonPrefix(trailingFieldLeadingWhitespace, configLeadingWhitespace);
    // Update configField with normalized leading whitespace
    configField.value = combineObservablesWithConfig(configField.value, mergedLeadingWhitespace);
    // Compute merged trailing whitespace
    const mergedTrailingWhitespace = getCommonSuffixFromStrings(combineObservablesWithConfig(trailingFieldLeadingWhitespace, mergedLeadingWhitespace), configTrailingWhitespace);
    // Update all fields with normalized trailing whitespace
    configField.value = DK1(configField.value, mergedTrailingWhitespace);
    trailingField.value = fo1(trailingField.value, trailingFieldLeadingWhitespace, mergedTrailingWhitespace);
    sourceField.value = replaceStringSuffix(
      sourceField.value,
      trailingFieldLeadingWhitespace,
      trailingFieldLeadingWhitespace.slice(0, trailingFieldLeadingWhitespace.length - mergedTrailingWhitespace.length)
    );
  }
  // Case 4: Only trailingField is provided
  else if (trailingField) {
    // Extract leading whitespace from trailingField and trailing whitespace from configField
    const trailingFieldLeadingWhitespace = trailingField.value.match(/^\s*/)[0];
    const configTrailingWhitespace = configField.value.match(/\s*$/)[0];
    // Compute the difference in whitespace
    const whitespaceDifference = uz2(configTrailingWhitespace, trailingFieldLeadingWhitespace);
    // Update configField with normalized trailing whitespace
    configField.value = DK1(configField.value, whitespaceDifference);
  }
  // Case 5: Only sourceField is provided
  else if (sourceField) {
    // Extract trailing whitespace from sourceField and leading whitespace from configField
    const sourceFieldTrailingWhitespace = sourceField.value.match(/\s*$/)[0];
    const configLeadingWhitespace = configField.value.match(/^\s*/)[0];
    // Compute the difference in whitespace
    const whitespaceDifference = uz2(sourceFieldTrailingWhitespace, configLeadingWhitespace);
    // Update configField with normalized leading whitespace
    configField.value = combineObservablesWithConfig(configField.value, whitespaceDifference);
  }
}

module.exports = normalizeWhitespaceBetweenFields;