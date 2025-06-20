/**
 * Extracts a file name from an object by checking common file-related properties.
 *
 * The function inspects the input object for the following properties, in order:
 *   - name
 *   - url
 *   - filename
 *   - path
 * If any of these properties exist and are truthy, their string value is used.
 * The function then splits the string by both forward and backward slashes to extract the last segment (the file name).
 * If no valid property is found or the input is not an object, undefined is returned.
 *
 * @param {object} fileObject - The object potentially containing file information.
 * @returns {string|undefined} The extracted file name, or undefined if not found.
 */
function extractFileNameFromObject(fileObject) {
  // Ensure the input is a non-null object
  if (typeof fileObject !== "object" || fileObject === null) {
    return undefined;
  }

  // Attempt to extract a string from the first available property
  let fileString = "";
  if ("name" in fileObject && fileObject.name) {
    fileString = String(fileObject.name);
  } else if ("url" in fileObject && fileObject.url) {
    fileString = String(fileObject.url);
  } else if ("filename" in fileObject && fileObject.filename) {
    fileString = String(fileObject.filename);
  } else if ("path" in fileObject && fileObject.path) {
    fileString = String(fileObject.path);
  }

  // Split the string by both forward and backward slashes to get the file name
  const segments = fileString.split(/[\\/]/);
  const fileName = segments.pop();

  // If fileName is an empty string, return undefined
  return fileName || undefined;
}

module.exports = extractFileNameFromObject;