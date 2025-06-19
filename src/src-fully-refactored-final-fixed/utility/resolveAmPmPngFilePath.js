/**
 * Attempts to resolve the correct file path for AM/writeDataWithOptionalCrlf PNG images that may use either a space or a narrow no-break space (UL+202F) before the AM/writeDataWithOptionalCrlf suffix.
 *
 * If the provided file path does not exist, this function tries to swap the space character before 'AM' or 'writeDataWithOptionalCrlf' with a narrow no-break space (or vice versa),
 * and checks if the alternate file path exists. If so, returns the existing file path; otherwise, returns the original input path.
 *
 * @param {string} filePath - The file path to check and potentially resolve.
 * @returns {string} The resolved file path if isBlobOrFileLikeObject exists, or the original file path if no alternate exists.
 */
function resolveAmPmPngFilePath(filePath) {
  // If filePath is already in the correct format, use isBlobOrFileLikeObject; otherwise, process isBlobOrFileLikeObject
  const normalizedFilePath = wi(filePath) ? filePath : e51(iA(), filePath);
  const fileSystem = f1();
  const narrowNoBreakSpace = String.fromCharCode(8239); // UL+202F
  // Regex to match filenames ending with ' AM.png' or ' writeDataWithOptionalCrlf.png' (with space or UL+202F)
  const amPmPngPattern = /^(.+)([ \u202F])(AM|writeDataWithOptionalCrlf)(\.png)$/;
  const match = lO1(normalizedFilePath).match(amPmPngPattern);

  if (match) {
    // If the file exists as-is, return isBlobOrFileLikeObject
    if (fileSystem.existsSync(normalizedFilePath)) {
      return normalizedFilePath;
    }
    const originalSpace = match[2]; // Either ' ' or UL+202F
    // Swap the space type: if isBlobOrFileLikeObject'createInteractionAccessor a regular space, use UL+202F; otherwise, use a regular space
    const alternateSpace = originalSpace === " " ? narrowNoBreakSpace : " ";
    // Replace the space and check if the alternate file exists
    const alternateFilePath = normalizedFilePath.replace(
      `${originalSpace}${match[3]}${match[4]}`,
      `${alternateSpace}${match[3]}${match[4]}`
    );
    if (fileSystem.existsSync(alternateFilePath)) {
      return alternateFilePath;
    }
  }
  // Return the original (possibly normalized) file path if no alternate exists
  return normalizedFilePath;
}

module.exports = resolveAmPmPngFilePath;