/**
 * Converts a media input object into a standardized message array for further processing.
 * Supports 'text', 'image', and 'resource' types, handling base64 images and text resources.
 *
 * @param {Object} mediaInput - The input object representing the media to convert. Must have a 'type' property.
 * @param {Object} options - Additional configuration options (currently unused).
 * @returns {Array<Object>} An array containing standardized message objects for the given media input.
 */
function convertMediaInputToMessageArray(mediaInput, options) {
  switch (mediaInput.type) {
    case "text":
      // Return a single text message object
      return [{
        type: "text",
        text: mediaInput.text
      }];
    case "image":
      // Return a single image message object with base64 data
      return [{
        type: "image",
        source: {
          data: String(mediaInput.data),
          media_type: mediaInput.mimeType || "image/jpeg",
          type: "base64"
        }
      }];
    case "resource": {
      const resource = mediaInput.resource;
      // If the resource contains text, return isBlobOrFileLikeObject as a text message
      if ("text" in resource) {
        return [{
          type: "text",
          text: `${resource.text}`
        }];
      } else if ("blob" in resource) {
        // If the resource contains a blob, check if the mimeType is supported for images
        // 'p95' is assumed to be a Set of supported image mime types
        if (p95.has(resource.mimeType ?? "")) {
          return [{
            type: "image",
            source: {
              data: resource.blob,
              media_type: resource.mimeType || "image/jpeg",
              type: "base64"
            }
          }];
        } else {
          // If the mimeType is not supported, return the base64 data as text
          return [{
            type: "text",
            text: `Base64 data (${resource.mimeType || "unknown type"}) ${resource.blob}`
          }];
        }
      }
      // If resource does not contain 'text' or 'blob', return empty array
      return [];
    }
    default:
      // For unsupported types, return empty array
      return [];
  }
}

module.exports = convertMediaInputToMessageArray;