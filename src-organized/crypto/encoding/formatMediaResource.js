/**
 * Formats various media resource objects into a standardized array of output objects.
 *
 * Supported types: 'text', 'image', 'resource'.
 * For 'resource', handles embedded text or base64-encoded blobs (images or other data).
 *
 * @param {Object} mediaResource - The input media resource object to format.
 * @param {Object} options - Additional options (currently unused).
 * @returns {Array<Object>} An array containing formatted output objects (text or image).
 */
function formatMediaResource(mediaResource, options) {
  switch (mediaResource.type) {
    case "text":
      // Simple text resource
      return [{
        type: "text",
        text: mediaResource.text
      }];
    case "image":
      // Image resource with base64 data
      return [{
        type: "image",
        source: {
          data: String(mediaResource.data),
          media_type: mediaResource.mimeType || "image/jpeg",
          type: "base64"
        }
      }];
    case "resource": {
      const resourceContent = mediaResource.resource;
      // If the resource contains text, return as text
      if ("text" in resourceContent) {
        return [{
          type: "text",
          text: `${resourceContent.text}`
        }];
      } else if ("blob" in resourceContent) {
        // If the resource contains a blob, check if the mimeType is supported as an image
        // p95 is assumed to be a Set of supported image mime types
        if (p95.has(resourceContent.mimeType ?? "")) {
          return [{
            type: "image",
            source: {
              data: resourceContent.blob,
              media_type: resourceContent.mimeType || "image/jpeg",
              type: "base64"
            }
          }];
        } else {
          // If not a supported image, return as text with base64 data and mime type
          return [{
            type: "text",
            text: `Base64 data (${resourceContent.mimeType || "unknown type"}) ${resourceContent.blob}`
          }];
        }
      }
      // If resource has neither text nor blob, return empty array
      return [];
    }
    default:
      // Unsupported type
      return [];
  }
}

module.exports = formatMediaResource;