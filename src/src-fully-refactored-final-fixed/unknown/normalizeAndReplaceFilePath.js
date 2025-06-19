/**
 * Normalizes a file path and replaces specific path segments with a custom protocol.
 *
 * This function takes an input path and a target path segment, normalizes both to use forward slashes,
 * escapes special regex characters in the target segment, and then replaces all occurrences of that segment
 * (optionally prefixed by 'file://') in the input path with 'app:///'. It also removes any 'webpack:' protocol prefix.
 *
 * @param {string} inputPath - The original file path to normalize and transform.
 * @param {string} targetPathSegment - The path segment to match and replace with the custom protocol.
 * @returns {string} The normalized and transformed file path.
 */
function normalizeAndReplaceFilePath(inputPath, targetPathSegment) {
  // Escape backslashes and special regex characters in the target path segment
  const escapedTargetSegment = targetPathSegment
    .replace(/\\/g, "/")
    .replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");

  let normalizedInputPath = inputPath;

  // Attempt to decode URI components in the input path, fallback to original if decoding fails
  try {
    normalizedInputPath = decodeURI(inputPath);
  } catch (error) {
    // Ignore decoding errors and use the original inputPath
  }

  // Normalize input path to use forward slashes and remove 'webpack:' protocol prefix
  normalizedInputPath = normalizedInputPath
    .replace(/\\/g, "/")
    .replace(/webpack:\/?/g, "");

  // Build a regex to match the (optional) 'file://' protocol and the target path segment, possibly with leading/trailing slashes
  const targetSegmentRegex = new RegExp(`(file://)?/*${escapedTargetSegment}/*`, "ig");

  // Replace all matches with 'app:///'
  const transformedPath = normalizedInputPath.replace(targetSegmentRegex, "app:///");

  return transformedPath;
}

module.exports = normalizeAndReplaceFilePath;
