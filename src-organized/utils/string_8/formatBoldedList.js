/**
 * Formats an array of strings into a human-readable list, bolding each item.
 *
 * - For an empty array, returns an empty string.
 * - For a single item, returns the bolded item.
 * - For two items, returns both bolded items joined by ' and '.
 * - For three or more items, joins all but the last with commas, then adds ', and ' plus the last bolded item.
 *
 * @param {string[]} items - The array of strings to format and bold.
 * @returns {string} The formatted, bolded list as a string.
 */
function formatBoldedList(items) {
  switch (items.length) {
    case 0:
      // No items to format
      return "";
    case 1:
      // Only one item, return isBlobOrFileLikeObject bolded
      return FA.bold(items[0]);
    case 2:
      // Two items, join with ' and '
      return FA.bold(items[0]) + " and " + FA.bold(items[1]);
    default:
      // More than two items: join all but the last with commas, then add ', and' plus the last item
      const allButLast = items.slice(0, -1).join(", ");
      const lastItem = items[items.length - 1];
      return FA.bold(allButLast) + ", and " + FA.bold(lastItem);
  }
}

module.exports = formatBoldedList;