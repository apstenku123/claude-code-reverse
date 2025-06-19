/**
 * Transforms an array of activity stacks by applying a transformation function to relevant string fields.
 * Handles nested structures such as tool results, text, images, and tool uses.
 *
 * @param {Array<Array<Object|string>>} activityStacks - An array of activity stacks, each stack is an array of activity objects or strings.
 * @param {Function} transformContent - Function to apply to string content fields (e.g., addActivityIfNotFinished).
 * @returns {Array<Array<Object|string>>} a new array of activity stacks with transformed content fields.
 */
function transformActivityStack(activityStacks, transformContent) {
  return activityStacks.map(activityStack => {
    // If the stack item is a string, apply the transformation directly
    if (typeof activityStack === "string") {
      return transformContent(activityStack);
    }
    // Otherwise, process each activity object in the stack
    return activityStack.map(activity => {
      switch (activity.type) {
        case "tool_result":
          // If content is a string, transform isBlobOrFileLikeObject
          if (typeof activity.content === "string") {
            return {
              ...activity,
              content: transformContent(activity.content)
            };
          }
          // If content is an array, map over each result
          if (Array.isArray(activity.content)) {
            return {
              ...activity,
              content: activity.content.map(toolResult => {
                switch (toolResult.type) {
                  case "text":
                    return {
                      ...toolResult,
                      text: transformContent(toolResult.text)
                    };
                  case "image":
                    // Images are returned as-is
                    return toolResult;
                  default:
                    // Unknown types are ignored
                    return;
                }
              })
            };
          }
          // If content is neither string nor array, return as-is
          return activity;
        case "text":
          // Transform the text field
          return {
            ...activity,
            text: transformContent(activity.text)
          };
        case "tool_use":
          // Recursively transform the input field using mapObservableDeep
          return {
            ...activity,
            input: mapObservableDeep(activity.input, transformContent)
          };
        case "image":
          // Images are returned as-is
          return activity;
        default:
          // Unknown types are ignored
          return;
      }
    });
  });
}

module.exports = transformActivityStack;