/**
 * Reads the contents of a file with the specified encoding and normalizes Windows-style line endings (\r\n) to Unix-style (\n).
 *
 * @param {string} filePath - The path to the file to be read.
 * @returns {string} The file contents with normalized line endings.
 */
function readFileWithNormalizedLineEndings(filePath) {
  // Determine the encoding for the file using the detectFileEncoding function
  const encoding = detectFileEncoding(filePath);

  // Read the file synchronously with the determined encoding
  const fileContents = f1().readFileSync(filePath, { encoding });

  // Replace all Windows-style line endings with Unix-style line endings
  const normalizedContents = fileContents.replaceAll('\r\n', '\n');

  return normalizedContents;
}

module.exports = readFileWithNormalizedLineEndings;