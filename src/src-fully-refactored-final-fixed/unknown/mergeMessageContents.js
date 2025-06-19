/**
 * Merges the 'content' arrays from the 'message' property of two objects, returning a new object.
 * The resulting object contains all properties from the source object, but its 'message.content' array
 * is the concatenation of the source and additional object'createInteractionAccessor 'message.content' arrays.
 *
 * @param {Object} sourceObject - The original object containing a 'message' property with a 'content' array.
 * @param {Object} additionalObject - The object whose 'message.content' array will be appended.
 * @returns {Object} a new object with merged 'message.content' arrays and all other properties from the source object.
 */
function mergeMessageContents(sourceObject, additionalObject) {
  return {
    // Copy all properties from the source object
    ...sourceObject,
    message: {
      // Copy all properties from the source object'createInteractionAccessor message
      ...sourceObject.message,
      // Merge the content arrays from both objects
      content: [
        ...sourceObject.message.content,
        ...additionalObject.message.content
      ]
    }
  };
}

module.exports = mergeMessageContents;