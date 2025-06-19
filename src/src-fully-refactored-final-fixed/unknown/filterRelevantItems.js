/**
 * Filters out items of type 'progress' and, if the external source type is not 'ant', also filters out items of type 'attachment'.
 *
 * @param {Array<Object>} items - The array of items to filter. Each item should have a 'type' property.
 * @returns {Array<Object>} The filtered array of items.
 */
function filterRelevantItems(items) {
  return items.filter(item => {
    // Exclude items of type 'progress'
    if (item.type === "progress") {
      return false;
    }
    // Exclude 'attachment' items unless the external source type is 'ant'
    if (item.type === "attachment" && getExternalSourceType() !== "ant") {
      return false;
    }
    // Include all other items
    return true;
  });
}

module.exports = filterRelevantItems;