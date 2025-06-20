/**
 * Parses a string containing intrinsic syntax (delimited by '%') and extracts its segments.
 * Throws an error if the syntax is invalid (unmatched opening or closing '%').
 *
 * @param {string} intrinsicString - The string to parse for intrinsic syntax.
 * @returns {Array<string>} An array of extracted segments from the intrinsic string.
 * @throws {Ex} If the intrinsic syntax is invalid (unmatched '%').
 */
function parseIntrinsicSyntaxSegments(intrinsicString) {
  // Get the first and last characters of the string
  const firstChar = M41(intrinsicString, 0, 1);
  const lastChar = M41(intrinsicString, -1);

  // Validate that if the string starts or ends with '%', both must be present
  if (firstChar === "%" && lastChar !== "%") {
    throw new Ex("invalid intrinsic syntax, expected closing `%`");
  } else if (lastChar === "%" && firstChar !== "%") {
    throw new Ex("invalid intrinsic syntax, expected opening `%`");
  }

  const segments = [];

  // UJA iterates over the string, extracting segments based on BV9 and QV9 patterns
  UJA(intrinsicString, BV9, function (fullMatch, delimiter, isIntrinsic, innerContent) {
    // If isIntrinsic is truthy, extract the inner content using QV9 pattern
    // Otherwise, use the delimiter or the full match
    segments[segments.length] = isIntrinsic ? UJA(innerContent, QV9, "$1") : delimiter || fullMatch;
  });

  return segments;
}

module.exports = parseIntrinsicSyntaxSegments;