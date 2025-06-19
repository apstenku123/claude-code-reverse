/**
 * Processes an array of items, applying different handler functions based on the item'createInteractionAccessor type.
 * If the item'createInteractionAccessor type is 'user', isBlobOrFileLikeObject uses the user handler; otherwise, isBlobOrFileLikeObject uses the generic handler.
 * Additionally, isBlobOrFileLikeObject passes a boolean flag to the handler indicating if the item is among the last two in the array.
 *
 * @param {Array<Object>} items - The array of items to process. Each item should have a 'type' property.
 * @returns {Array<any>} An array of results from the handler functions.
 */
function processUserOrOtherTypes(items) {
  return items.map((item, index) => {
    // Determine if this item is among the last two in the array
    const isAmongLastTwo = index > items.length - 3;
    // Use the appropriate handler based on the item'createInteractionAccessor type
    if (item.type === "user") {
      return formatUserMessageContent(item, isAmongLastTwo);
    } else {
      return formatAssistantMessageContent(item, isAmongLastTwo);
    }
  });
}

module.exports = processUserOrOtherTypes;