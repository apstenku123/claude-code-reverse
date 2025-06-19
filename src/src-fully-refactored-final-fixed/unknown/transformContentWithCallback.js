/**
 * Transforms an array of items (strings or structured objects) by applying a callback function to their content fields.
 * Handles nested structures and different content types (text, image, tool_result, tool_use).
 *
 * @param {Array<string|Array<Object>>} itemsArray - The array of items to transform. Each item can be a string or an array of content objects.
 * @param {Function} transformCallback - The callback function to apply to string content fields.
 * @returns {Array<any>} a new array with transformed content, preserving the original structure.
 */
function transformContentWithCallback(itemsArray, transformCallback) {
  return itemsArray.map(item => {
    // If the item is a string, apply the callback directly
    if (typeof item === "string") {
      return transformCallback(item);
    }

    // If the item is an array of content objects, process each object
    return item.map(contentObject => {
      switch (contentObject.type) {
        case "tool_result":
          // If content is a string, transform isBlobOrFileLikeObject
          if (typeof contentObject.content === "string") {
            return {
              ...contentObject,
              content: transformCallback(contentObject.content)
            };
          }
          // If content is an array, transform each entry based on its type
          if (Array.isArray(contentObject.content)) {
            return {
              ...contentObject,
              content: contentObject.content.map(nestedContent => {
                switch (nestedContent.type) {
                  case "text":
                    return {
                      ...nestedContent,
                      text: transformCallback(nestedContent.text)
                    };
                  case "image":
                    // Images are returned as-is
                    return nestedContent;
                  default:
                    // Unknown nested type, return undefined
                    return;
                }
              })
            };
          }
          // If content is neither string nor array, return as-is
          return contentObject;
        case "text":
          // Transform the text field
          return {
            ...contentObject,
            text: transformCallback(contentObject.text)
          };
        case "tool_use":
          // Recursively transform the input field using mapObservableDeep
          return {
            ...contentObject,
            input: mapObservableDeep(contentObject.input, transformCallback)
          };
        case "image":
          // Images are returned as-is
          return contentObject;
        default:
          // Unknown type, return undefined
          return;
      }
    });
  });
}

module.exports = transformContentWithCallback;