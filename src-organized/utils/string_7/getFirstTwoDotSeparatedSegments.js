/**
 * Returns the first two segments of a dot-separated string, joined by a dot.
 *
 * For example:
 *   'foo.bar.baz' => 'foo.bar'
 *   'foo' => 'foo'
 *   'foo.bar' => 'foo.bar'
 *
 * @param {string} inputString - The dot-separated string to process.
 * @returns {string} The first two segments of the input string, joined by a dot.
 */
function getFirstTwoDotSeparatedSegments(inputString) {
  // Split the string at most once (into two parts), then join them back with a dot
  return inputString.split(".", 2).join(".");
}

module.exports = getFirstTwoDotSeparatedSegments;