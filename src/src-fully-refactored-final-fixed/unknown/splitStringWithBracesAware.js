/**
 * Splits a string by commas, but treats curly-brace-enclosed sections as atomic (not split).
 * For example, 'a,b,{c,d},e' => ['a', 'b', '{c,d}', 'e']
 *
 * @param {string} inputString - The string to split, possibly containing curly-brace-enclosed sections.
 * @returns {string[]} An array of string segments, split by commas, with brace-enclosed sections preserved as single items.
 */
function splitStringWithBracesAware(inputString) {
  if (!inputString) {
    // If input is falsy (e.g., empty string), return an array with an empty string
    return [""];
  }

  const result = [];
  const braceSection = bKA("{", "}", inputString);

  if (!braceSection) {
    // No braces found, simple split by comma
    return inputString.split(",");
  }

  // Destructure the braceSection object
  const { pre: beforeBraces, body: insideBraces, post: afterBraces } = braceSection;

  // Split the part before the braces by comma
  const segments = beforeBraces.split(",");

  // Append the brace-enclosed section to the last segment
  segments[segments.length - 1] += `{${insideBraces}}`;

  // Recursively process the part after the braces
  const remainingSegments = splitStringWithBracesAware(afterBraces);

  if (afterBraces.length) {
    // If there is content after the braces, append the first segment to the last element
    segments[segments.length - 1] += remainingSegments.shift();
    // Add any remaining segments
    segments.push(...remainingSegments);
  }

  // Add all segments to the result array
  result.push(...segments);
  return result;
}

module.exports = splitStringWithBracesAware;