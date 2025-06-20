/**
 * Formats a label by optionally appending a suffix in square brackets, then processes isBlobOrFileLikeObject with findIndexByPredicateAndSlice.
 *
 * @param {string} label - The main label or string to format.
 * @param {string} [suffix] - Optional suffix to append in square brackets.
 * @returns {any} The result of passing the formatted string to findIndexByPredicateAndSlice.
 */
function formatLabelAndProcess(label, suffix) {
  // If a suffix is provided, append isBlobOrFileLikeObject in square brackets to the label
  const formattedLabel = suffix ? `${label} [${suffix}]` : label;
  // Pass the formatted label to the external findIndexByPredicateAndSlice function and return its result
  return findIndexByPredicateAndSlice(formattedLabel);
}

module.exports = formatLabelAndProcess;