/**
 * Formats a media entry object into a standardized array of message objects.
 * Supports 'text', 'image', and 'resource' types, handling base64 images and text extraction.
 *
 * @param {Object} mediaEntry - The input media entry object to format. Must have a 'type' property.
 * @param {Object} options - Additional configuration options (currently unused).
 * @returns {Array<Object>} An array containing formatted message objects based on the input type.
 */
function formatMediaEntry(mediaEntry, options) {
  switch (mediaEntry.type) {
    case "text":
      // Return a single text message object
      return [
        {
          type: "text",
          text: mediaEntry.text
        }
      ];

    case "image":
      // Return a single image message object with base64 data
      return [
        {
          type: "image",
          source: {
            data: String(mediaEntry.data),
            media_type: mediaEntry.mimeType || "image/jpeg",
            type: "base64"
          }
        }
      ];

    case "resource": {
      const resource = mediaEntry.resource;

      // If resource contains text, return as text message
      if ("text" in resource) {
        return [
          {
            type: "text",
            text: `${resource.text}`
          }
        ];
      }
      // If resource contains a blob (base64 data)
      else if ("blob" in resource) {
        // p95 is an external Set of supported image mime types
        if (p95.has(resource.mimeType ?? "")) {
          // Supported image type: return as image message
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
          // Unsupported image type: return as text message with base64 info
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
      // Unknown type: return empty array
      return [];
  }
}

module.exports = formatMediaEntry;