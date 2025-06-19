/**
 * Formats a media content object into a standardized array of content descriptors.
 * Supports 'text', 'image', and 'resource' types, converting them to a consistent structure for downstream processing.
 *
 * @param {Object} mediaContent - The input media content object to format. Must have a 'type' property.
 * @param {Object} options - Additional options (currently unused, reserved for future use).
 * @returns {Array<Object>} An array containing formatted content descriptor objects.
 */
function formatMediaContent(mediaContent, options) {
  switch (mediaContent.type) {
    case "text":
      // Return a standardized text object
      return [
        {
          type: "text",
          text: mediaContent.text
        }
      ];

    case "image":
      // Return a standardized image object with base64 data
      return [
        {
          type: "image",
          source: {
            data: String(mediaContent.data),
            media_type: mediaContent.mimeType || "image/jpeg",
            type: "base64"
          }
        }
      ];

    case "resource": {
      const resource = mediaContent.resource;
      // If the resource contains text, return as text
      if ("text" in resource) {
        return [
          {
            type: "text",
            text: `${resource.text}`
          }
        ];
      }
      // If the resource contains a blob (e.g., image data)
      else if ("blob" in resource) {
        // p95 is assumed to be a Set of supported mime types (e.g., images)
        if (p95.has(resource.mimeType ?? "")) {
          // Return as an image object
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
          // Unsupported mime type: return as a text description
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
      // Unsupported type: return empty array
      return [];
  }
}

module.exports = formatMediaContent;