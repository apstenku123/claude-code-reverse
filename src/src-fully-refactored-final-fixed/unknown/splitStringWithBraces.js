/**
 * Splits a string by commas, but treats comma-separated sections within curly braces as a single segment.
 * For example, 'a,b,{c,d},e' => ['a', 'b', '{c,d}', 'e']
 *
 * @param {string} input - The input string to split.
 * @returns {string[]} An array of string segments, split by commas, with curly-brace groups preserved.
 */
function splitStringWithBraces(input) {
  if (!input) return [""];

  const result = [];
  // Attempt to extract the first curly-brace group (if any)
  const braceGroup = bKA("{", "}", input);

  // If no curly-brace group is found, split the string by commas
  if (!braceGroup) return input.split(",");

  // Destructure the result of bKA
  const {
    pre: prefix,
    body: braceBody,
    post: suffix
  } = braceGroup;

  // Split the prefix by commas
  const prefixSegments = prefix.split(",");
  // Append the curly-brace group to the last prefix segment
  prefixSegments[prefixSegments.length - 1] += `{${braceBody}}`;

  // Recursively process the suffix (the part after the curly-brace group)
  const suffixSegments = splitStringWithBraces(suffix);

  // If there is a suffix, append the first segment to the last prefix segment
  if (suffix.length) {
    prefixSegments[prefixSegments.length - 1] += suffixSegments.shift();
    // Add any remaining suffix segments to the prefixSegments array
    prefixSegments.push(...suffixSegments);
  }

  // Add all segments to the result array
  result.push(...prefixSegments);
  return result;
}

module.exports = splitStringWithBraces;