/**
 * Expands a comma-separated string that may contain brace-enclosed substrings (e.g., "a,b{c,d},e")
 * into an array of strings, handling nested braces recursively.
 *
 * For example:
 *   expandCommaSeparatedBraces("a,b{c,d},e")
 *   => ["a", "b{c,d}", "e"]
 *
 * If no braces are present, splits the string by commas.
 *
 * @param {string} inputString - The comma-separated string to expand, possibly containing braces.
 * @returns {string[]} An array of expanded strings, with brace groups preserved as single elements.
 */
function expandCommaSeparatedBraces(inputString) {
  if (!inputString) {
    // If input is falsy (empty string, null, undefined), return array with empty string
    return [""];
  }

  const expandedList = [];
  const braceGroup = bKA("{", "}", inputString); // Extracts the first top-level brace group, if any

  if (!braceGroup) {
    // No braces found, just split by comma
    return inputString.split(",");
  }

  // Destructure the brace group into pre-brace, body, and post-brace parts
  const { pre: prefix, body: braceBody, post: suffix } = braceGroup;

  // Split the prefix by commas
  const prefixParts = prefix.split(",");

  // Append the brace group as a single element to the last prefix part
  prefixParts[prefixParts.length - 1] += `{${braceBody}}`;

  // Recursively expand the suffix (the part after the closing brace)
  const expandedSuffix = expandCommaSeparatedBraces(suffix);

  if (suffix.length) {
    // If there is a suffix, append its first element to the last prefix part
    prefixParts[prefixParts.length - 1] += expandedSuffix.shift();
    // Add any remaining suffix elements as new elements
    prefixParts.push(...expandedSuffix);
  }

  // Add all parts to the result array
  expandedList.push(...prefixParts);
  return expandedList;
}

module.exports = expandCommaSeparatedBraces;