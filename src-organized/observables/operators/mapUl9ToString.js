/**
 * Applies the getSourceString transformation to each provided argument and concatenates the results into a single string.
 *
 * @param {...any} items - The list of items to be transformed by getSourceString.
 * @returns {string} The concatenated string result after applying getSourceString to each item.
 */
function mapUl9ToString(...items) {
  // Apply getSourceString to each item and join the results into a single string
  return items.map(item => getSourceString(item)).join("");
}

module.exports = mapUl9ToString;