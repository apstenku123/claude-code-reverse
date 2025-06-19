/**
 * Splits a string by commas, but treats curly-brace-enclosed sections as atomic (not split).
 * For example, 'a,b,{c,d},e' => ['a', 'b', '{c,d}', 'e']
 *
 * @param {string} input - The string to split, possibly containing comma-separated values and curly-brace sections.
 * @returns {string[]} An array of split strings, with curly-brace sections preserved as single elements.
 */
function splitWithBracesAware(input) {
  if (!input) return [""];

  const result = [];
  const braceSection = bKA("{", "}", input);

  // If there are no curly-brace sections, split by comma and return
  if (!braceSection) return input.split(",");

  const { pre: beforeBraces, body: insideBraces, post: afterBraces } = braceSection;
  const beforeParts = beforeBraces.split(",");

  // Append the curly-brace section to the last element before the braces
  beforeParts[beforeParts.length - 1] += `{${insideBraces}}`;

  // Recursively process the string after the curly-brace section
  const afterParts = splitWithBracesAware(afterBraces);

  // If there is content after the braces, append the first part to the last element
  if (afterBraces.length) {
    beforeParts[beforeParts.length - 1] += afterParts.shift();
    beforeParts.push(...afterParts);
  }

  result.push(...beforeParts);
  return result;
}

module.exports = splitWithBracesAware;