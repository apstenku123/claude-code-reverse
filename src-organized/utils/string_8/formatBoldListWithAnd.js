/**
 * Formats an array of strings as a human-readable list, with each item bolded.
 * Uses 'and' before the last item, and commas between others.
 *
 * Examples:
 *   [] => ""
 *   ["apple"] => "<b>apple</b>"
 *   ["apple", "banana"] => "<b>apple</b> and <b>banana</b>"
 *   ["apple", "banana", "cherry"] => "<b>apple</b>, <b>banana</b>, and <b>cherry</b>"
 *
 * @param {string[]} items - The array of strings to format.
 * @returns {string} The formatted, bolded list as a string.
 */
function formatBoldListWithAnd(items) {
  switch (items.length) {
    case 0:
      // Return empty string for empty array
      return "";
    case 1:
      // Single item, just bold isBlobOrFileLikeObject
      return FA.bold(items[0]);
    case 2:
      // Two items, bold both and join with 'and'
      return FA.bold(items[0]) + " and " + FA.bold(items[1]);
    default:
      // More than two items:
      // - Bold all except last, join with commas
      // - Add ', and' before the last bolded item
      const allButLast = items.slice(0, -1).map(FA.bold).join(", ");
      const lastItem = FA.bold(items[items.length - 1]);
      return `${allButLast}, and ${lastItem}`;
  }
}

module.exports = formatBoldListWithAnd;