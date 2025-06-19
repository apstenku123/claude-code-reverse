/**
 * Formats the given text as a list item by prepending a dash and a space.
 *
 * @param {string} listItemText - The text to format as a list item.
 * @returns {string} The formatted list item string.
 */
const formatAsListItem = (listItemText) => {
  // Prepend '- ' to the input text to create a list item
  return `- ${listItemText}`;
};

module.exports = formatAsListItem;