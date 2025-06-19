/**
 * Transforms nested content structures by applying a transformation function to specific fields.
 *
 * @param {Array} contentGroups - An array of content groups, each group can be a string or an array of content items.
 * @param {Function} transformFn - a function to transform string fields within content items.
 * @returns {Array} a new array with transformed content structures.
 */
function transformNestedContent(contentGroups, transformFn) {
  return contentGroups.map(contentGroup => {
    // If the group is a string, apply the transformation function directly
    if (typeof contentGroup === "string") {
      return transformFn(contentGroup);
    }

    // Otherwise, process each content item in the group
    return contentGroup.map(contentItem => {
      switch (contentItem.type) {
        case "tool_result": {
          // If content is a string, transform isBlobOrFileLikeObject
          if (typeof contentItem.content === "string") {
            return {
              ...contentItem,
              content: transformFn(contentItem.content)
            };
          }
          // If content is an array, transform each nested item
          if (Array.isArray(contentItem.content)) {
            return {
              ...contentItem,
              content: contentItem.content.map(nestedContent => {
                switch (nestedContent.type) {
                  case "text":
                    return {
                      ...nestedContent,
                      text: transformFn(nestedContent.text)
                    };
                  case "image":
                    // Images are returned as-is
                    return nestedContent;
                  default:
                    // Unknown types are ignored
                    return;
                }
              })
            };
          }
          // If content is neither string nor array, return as-is
          return contentItem;
        }
        case "text":
          // Transform the text field
          return {
            ...contentItem,
            text: transformFn(contentItem.text)
          };
        case "tool_use":
          // Recursively transform the input field using mapObservableDeep
          return {
            ...contentItem,
            input: mapObservableDeep(contentItem.input, transformFn)
          };
        case "image":
          // Images are returned as-is
          return contentItem;
        default:
          // Unknown types are ignored
          return;
      }
    });
  });
}

module.exports = transformNestedContent;