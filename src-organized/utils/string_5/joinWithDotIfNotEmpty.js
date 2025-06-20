/**
 * Concatenates two strings with a dot separator if the first string is not empty.
 * If the first string is empty, returns the second string as is.
 *
 * @param {string} prefix - The prefix string. If empty, only the suffix is returned.
 * @param {string} suffix - The suffix string to append after the dot if prefix is not empty.
 * @returns {string} The concatenated string in the form 'prefix.suffix' or just 'suffix' if prefix is empty.
 */
function joinWithDotIfNotEmpty(prefix, suffix) {
  // If the prefix is an empty string, return the suffix as is
  if (prefix === "") {
    return suffix;
  } else {
    // Otherwise, concatenate prefix and suffix with a dot separator
    return `${prefix}.${suffix}`;
  }
}

module.exports = joinWithDotIfNotEmpty;