/**
 * Extracts and normalizes image data from an object containing base64-encoded PNG or JPEG images.
 *
 * @param {Object} imageObject - An object that may contain base64-encoded image data under the keys 'image/png' or 'image/jpeg'.
 * @returns {Object|undefined} An object with normalized image data and its media type, or undefined if neither image type is present.
 */
function extractImageData(imageObject) {
  // Check if the object contains a PNG image as a base64 string
  if (typeof imageObject["image/png"] === "string") {
    return {
      // Remove all whitespace characters from the base64 string
      image_data: imageObject["image/png"].replace(/\s/g, ""),
      media_type: "image/png"
    };
  }
  // Check if the object contains a JPEG image as a base64 string
  if (typeof imageObject["image/jpeg"] === "string") {
    return {
      // Remove all whitespace characters from the base64 string
      image_data: imageObject["image/jpeg"].replace(/\s/g, ""),
      media_type: "image/jpeg"
    };
  }
  // Return undefined if neither image type is present
  return;
}

module.exports = extractImageData;