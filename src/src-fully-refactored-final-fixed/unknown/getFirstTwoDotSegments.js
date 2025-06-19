/**
 * Returns the input string truncated after the second dot ('.'),
 * or the whole string if there are fewer than two dots.
 *
 * For example:
 *   'a.b.c.d' => 'a.b'
 *   'foo.bar' => 'foo.bar'
 *   'single' => 'single'
 *
 * @param {string} inputString - The string to extract the first two dot-separated segments from.
 * @returns {string} The string up to the second dot, or the original string if fewer than two segments exist.
 */
function getFirstTwoDotSegments(inputString) {
  // Split the string at dots, but only into two parts (before and after the first dot)
  // The second argument to split limits the number of splits to 2
  // Then join the resulting array with a dot to reconstruct the string up to the second segment
  return inputString.split('.', 2).join('.');
}

module.exports = getFirstTwoDotSegments;