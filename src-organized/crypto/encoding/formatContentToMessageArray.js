/**
 * Converts various content source objects into a standardized message array format.
 * Handles text, image (base64), and resource types (with text or blob data).
 *
 * @param {Object} contentSource - The source object containing content data. Must have a 'type' property.
 * @param {Object} config - Additional configuration (currently unused).
 * @returns {Array<Object>} An array of message objects formatted for downstream consumption.
 */
function formatContentToMessageArray(contentSource, config) {
  switch (contentSource.type) {
    case "text":
      // Simple text message
      return [
        {
          type: "text",
          text: contentSource.text
        }
      ];
    case "image":
      // Image message with base64 data
      return [
        {
          type: "image",
          source: {
            data: String(contentSource.data),
            media_type: contentSource.mimeType || "image/jpeg",
            type: "base64"
          }
        }
      ];
    case "resource": {
      const resource = contentSource.resource;
      // If resource contains text, return as text message
      if ("text" in resource) {
        return [
          {
            type: "text",
            text: `${resource.text}`
          }
        ];
      } else if ("blob" in resource) {
        // If resource contains a blob, check if the mimeType is supported for images
        if (p95.has(resource.mimeType ?? "")) {
          // Supported image type, return as image message
          return [
            {
              type: "image",
              source: {
                data: resource.blob,
                media_type: resource.mimeType || "image/jpeg",
                type: "base64"
              }
            }
          ];
        } else {
          // Unsupported blob type, return as text with base64 data
          return [
            {
              type: "text",
              text: `Base64 data (${resource.mimeType || "unknown type"}) ${resource.blob}`
            }
          ];
        }
      }
      // If resource does not contain text or blob, return empty array
      return [];
    }
    default:
      // Unsupported type, return empty array
      return [];
  }
}

module.exports = formatContentToMessageArray;