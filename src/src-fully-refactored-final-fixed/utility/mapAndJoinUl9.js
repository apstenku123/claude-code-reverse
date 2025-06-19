/**
 * Applies the getSourceString transformation function to each input argument and concatenates the results into a single string.
 *
 * @param {...any} items - The items to be transformed and joined.
 * @returns {string} The concatenated string after applying getSourceString to each item.
 */
function mapAndJoinUl9(...items) {
  // Apply getSourceString to each item and join the results into a single string
  return items.map(item => getSourceString(item)).join("");
}

module.exports = mapAndJoinUl9;