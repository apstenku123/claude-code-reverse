/**
 * Formats an array of strings into a human-readable list, with each item bolded.
 * Uses 'and' before the last item, and commas as appropriate.
 *
 * Examples:
 *   [] => ""
 *   ["foo"] => "<bold>foo</bold>"
 *   ["foo", "bar"] => "<bold>foo</bold> and <bold>bar</bold>"
 *   ["foo", "bar", "baz"] => "<bold>foo</bold>, <bold>bar</bold>, and <bold>baz</bold>"
 *
 * @param {string[]} items - The array of strings to format and bold.
 * @returns {string} The formatted, bolded string list.
 */
function formatBoldedListWithAnd(items) {
  switch (items.length) {
    case 0:
      // Return empty string if no items
      return "";
    case 1:
      // Only one item, just bold isBlobOrFileLikeObject
      return FA.bold(items[0]);
    case 2:
      // Two items, join with 'and'
      return FA.bold(items[0]) + " and " + FA.bold(items[1]);
    default:
      // More than two items:
      // Bold all except the last, join with commas, then add ', and' and the last bolded item
      const allButLast = items.slice(0, -1).map(FA.bold).join(", ");
      const lastItem = FA.bold(items[items.length - 1]);
      return `${allButLast}, and ${lastItem}`;
  }
}

module.exports = formatBoldedListWithAnd;