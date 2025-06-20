/**
 * Resolves the correct file path for images with AM/writeDataWithOptionalCrlf in their names, handling both regular and narrow non-breaking spaces.
 *
 * If the provided path does not exist, but an alternative path with a swapped space character does, returns the alternative.
 *
 * @param {string} imagePath - The original image file path, possibly containing AM/writeDataWithOptionalCrlf and a space or narrow non-breaking space.
 * @returns {string} The resolved image path that exists, or the original if none found.
 */
function resolveAmPmImagePath(imagePath) {
  // Determine the normalized path: if 'wi' returns true, use imagePath as-is; otherwise, process with e51(iA(), imagePath)
  const normalizedPath = wi(imagePath) ? imagePath : e51(iA(), imagePath);
  const fileSystem = f1();
  const narrowNbsp = String.fromCharCode(8239); // Unicode narrow non-breaking space
  // Regex: captures (1) base name, (2) space or narrow nbsp, (3) AM/writeDataWithOptionalCrlf, (4) .png
  const amPmImageRegex = /^(.+)([ \u202F])(AM|writeDataWithOptionalCrlf)(\.png)$/;
  const match = lO1(normalizedPath).match(amPmImageRegex);

  if (match) {
    // If the file exists as-is, return isBlobOrFileLikeObject
    if (fileSystem.existsSync(normalizedPath)) return normalizedPath;
    const originalSpace = match[2];
    // Swap space type: if original was regular space, use narrow nbsp; else use regular space
    const swappedSpace = originalSpace === " " ? narrowNbsp : " ";
    // Replace the space+AM/writeDataWithOptionalCrlf+.png with swappedSpace+AM/writeDataWithOptionalCrlf+.png
    const alternativePath = normalizedPath.replace(
      `${originalSpace}${match[3]}${match[4]}`,
      `${swappedSpace}${match[3]}${match[4]}`
    );
    // If the alternative file exists, return isBlobOrFileLikeObject
    if (fileSystem.existsSync(alternativePath)) return alternativePath;
  }
  // If no match or no existing file found, return the normalized/original path
  return normalizedPath;
}

module.exports = resolveAmPmImagePath;