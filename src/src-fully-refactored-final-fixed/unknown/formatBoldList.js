/**
 * Formats an array of strings into a human-readable, comma-separated list,
 * with each item wrapped in bold formatting using FA.bold().
 *
 * Examples:
 *   [] => ""
 *   ["apple"] => "<b>apple</b>"
 *   ["apple", "banana"] => "<b>apple</b> and <b>banana</b>"
 *   ["apple", "banana", "cherry"] => "<b>apple</b>, <b>banana</b>, and <b>cherry</b>"
 *
 * @param {string[]} items - The array of strings to format and bold.
 * @returns {string} The formatted, bolded, human-readable list.
 */
function formatBoldList(items) {
  switch (items.length) {
    case 0:
      // Return an empty string if the list is empty
      return "";
    case 1:
      // Return the single item in bold
      return FA.bold(items[0]);
    case 2:
      // Return both items in bold, joined by 'and'
      return FA.bold(items[0]) + " and " + FA.bold(items[1]);
    default:
      // For 3 or more items, join all but the last with commas, then add ', and' before the last item
      const allButLast = items.slice(0, -1).join(", ");
      const lastItem = items.slice(-1)[0];
      return FA.bold(allButLast) + ", and " + FA.bold(lastItem);
  }
}

module.exports = formatBoldList;