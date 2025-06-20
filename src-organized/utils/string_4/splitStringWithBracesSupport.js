/**
 * Splits a string by commas, but treats curly-brace-enclosed sections as atomic (not split).
 * For example, 'a,b,{c,d},e' => ['a', 'b', '{c,d}', 'e']
 *
 * @param {string} input - The string to split, possibly containing comma-separated values and curly-brace-enclosed sections.
 * @returns {string[]} An array of split string segments, with curly-brace sections preserved as single elements.
 */
function splitStringWithBracesSupport(input) {
  if (!input) {
    // If input is falsy (null, undefined, empty string), return array with empty string
    return [""];
  }

  const result = [];
  const braceSection = bKA("{", "}", input); // Extracts the first curly-brace-enclosed section, if any

  if (!braceSection) {
    // No curly-brace section found, split by comma as usual
    return input.split(",");
  }

  const { pre: prefix, body: braceBody, post: suffix } = braceSection;
  const prefixParts = prefix.split(",");

  // Append the curly-brace section to the last prefix part
  prefixParts[prefixParts.length - 1] += `{${braceBody}}`;

  // Recursively process the suffix (after the curly-brace section)
  const suffixParts = splitStringWithBracesSupport(suffix);

  if (suffix.length) {
    // If there is a suffix, append its first part to the last prefix part
    prefixParts[prefixParts.length - 1] += suffixParts.shift();
    // Add any remaining suffix parts
    prefixParts.push(...suffixParts);
  }

  result.push(...prefixParts);
  return result;
}

module.exports = splitStringWithBracesSupport;