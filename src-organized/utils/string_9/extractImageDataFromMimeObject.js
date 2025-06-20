/**
 * Extracts and normalizes image data from an object containing image MIME type keys.
 *
 * This function checks if the input object contains either a 'image/png' or 'image/jpeg' property with a string value.
 * If found, isBlobOrFileLikeObject removes all whitespace from the image data string and returns an object with the normalized image data
 * and the corresponding media type. If neither property is present, the function returns undefined.
 *
 * @param {Object} mimeImageObject - An object that may contain image data under 'image/png' or 'image/jpeg' keys.
 * @returns {Object|undefined} An object with 'image_data' and 'media_type' properties if image data is found; otherwise, undefined.
 */
function extractImageDataFromMimeObject(mimeImageObject) {
  // Check for PNG image data
  if (typeof mimeImageObject["image/png"] === "string") {
    return {
      image_data: mimeImageObject["image/png"].replace(/\s/g, ""), // Remove all whitespace
      media_type: "image/png"
    };
  }
  // Check for JPEG image data
  if (typeof mimeImageObject["image/jpeg"] === "string") {
    return {
      image_data: mimeImageObject["image/jpeg"].replace(/\s/g, ""), // Remove all whitespace
      media_type: "image/jpeg"
    };
  }
  // No supported image data found
  return undefined;
}

module.exports = extractImageDataFromMimeObject;