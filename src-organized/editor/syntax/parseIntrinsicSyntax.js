/**
 * Parses a string for intrinsic syntax delimited by '%' characters and extracts relevant segments.
 * Throws an error if the syntax is invalid (unmatched opening or closing '%').
 *
 * @param {string} inputString - The string to parse for intrinsic syntax.
 * @returns {Array<string>} An array of extracted segments based on the intrinsic syntax.
 * @throws {Ex} If the intrinsic syntax is invalid (unmatched '%' delimiters).
 */
function parseIntrinsicSyntax(inputString) {
  // Get the first character
  const firstChar = M41(inputString, 0, 1);
  // Get the last character
  const lastChar = M41(inputString, -1);

  // Validate that if there is an opening '%', there is a closing '%', and vice versa
  if (firstChar === "%" && lastChar !== "%") {
    throw new Ex("invalid intrinsic syntax, expected closing `%`");
  } else if (lastChar === "%" && firstChar !== "%") {
    throw new Ex("invalid intrinsic syntax, expected opening `%`");
  }

  const extractedSegments = [];

  // UJA iterates over the inputString, using BV9 as a pattern, and calls the callback for each match
  UJA(inputString, BV9, function (fullMatch, groupMatch, isIntrinsic, remainder) {
    // If isIntrinsic is truthy, process the remainder with QV9 and extract the first group
    // Otherwise, use groupMatch or fullMatch
    extractedSegments[extractedSegments.length] = isIntrinsic ? UJA(remainder, QV9, "$1") : groupMatch || fullMatch;
  });

  return extractedSegments;
}

module.exports = parseIntrinsicSyntax;