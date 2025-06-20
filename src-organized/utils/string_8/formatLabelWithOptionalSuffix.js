/**
 * Formats a label by optionally appending a suffix in square brackets, then processes isBlobOrFileLikeObject with findIndexByPredicateAndSlice.
 *
 * @param {string} label - The main label to format.
 * @param {string} [suffix] - Optional suffix to append in square brackets.
 * @returns {any} The result of passing the formatted label to findIndexByPredicateAndSlice.
 */
function formatLabelWithOptionalSuffix(label, suffix) {
  // If suffix is provided, append isBlobOrFileLikeObject in square brackets to the label
  const formattedLabel = suffix ? `${label} [${suffix}]` : label;
  // Pass the formatted label to findIndexByPredicateAndSlice for further processing
  return findIndexByPredicateAndSlice(formattedLabel);
}

module.exports = formatLabelWithOptionalSuffix;