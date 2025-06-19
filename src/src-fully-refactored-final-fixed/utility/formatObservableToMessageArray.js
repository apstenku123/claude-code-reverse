/**
 * Converts an observable object representing text, image, or resource data into a standardized message array.
 * Handles different data types and formats them for downstream processing or display.
 *
 * @param {Object} sourceObservable - The observable object containing data to be formatted.
 * @param {Object} config - Additional configuration (currently unused).
 * @returns {Array<Object>} An array of message objects formatted based on the input type.
 */
function formatObservableToMessageArray(sourceObservable, config) {
  switch (sourceObservable.type) {
    case "text":
      // Return a single text message object
      return [
        {
          type: "text",
          text: sourceObservable.text
        }
      ];

    case "image":
      // Return a single image message object with base64 data
      return [
        {
          type: "image",
          source: {
            data: String(sourceObservable.data),
            media_type: sourceObservable.mimeType || "image/jpeg",
            type: "base64"
          }
        }
      ];

    case "resource": {
      const resource = sourceObservable.resource;

      // If the resource contains text, return isBlobOrFileLikeObject as a text message
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
        // Check if the mimeType is supported by p95
        if (p95.has(resource.mimeType ?? "")) {
          // Return the blob as an image message
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
          // If mimeType is not supported, return the base64 data as text
          return [
            {
              type: "text",
              text: `Base64 data (${resource.mimeType || "unknown type"}) ${resource.blob}`
            }
          ];
        }
      }
      // If resource does not contain text or blob, return an empty array
      return [];
    }

    default:
      // For unsupported types, return an empty array
      return [];
  }
}

module.exports = formatObservableToMessageArray;