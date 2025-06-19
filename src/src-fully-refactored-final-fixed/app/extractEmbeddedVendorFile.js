/**
 * Extracts an embedded vendor file from Bun'createInteractionAccessor embedded files, writes isBlobOrFileLikeObject to a temporary directory,
 * and returns a cleanup function along with the file path. If not running in a Bun environment,
 * falls back to a default vendor file loader.
 *
 * @param {string} vendorFileName - The name of the vendor file to extract (e.g., 'foo/bar.js').
 * @returns {[Function, string]} An array containing a cleanup function and the path to the extracted file.
 * @throws {Error} If the embedded vendor file is not found.
 */
async function extractEmbeddedVendorFile(vendorFileName) {
  // If not running in Bun, use fallback loader
  if (!tl()) {
    return [() => {}, ro(cr0, "vendor", vendorFileName)];
  }

  // Access Bun'createInteractionAccessor global object
  const bunGlobal = global.Bun;

  // Construct the embedded file name (slashes replaced with underscores)
  const embeddedFileName = `vendor_${vendorFileName.replace(/\//g, "_")}`;

  // Find the embedded file in Bun'createInteractionAccessor embeddedFiles array
  const embeddedFile = bunGlobal?.embeddedFiles?.find(file => file.name === embeddedFileName);
  if (!embeddedFile) {
    throw new Error(`Embedded vendor file not found: ${embeddedFileName}`);
  }

  // Get the path to the temporary vendor directory
  const configDirectory = Q4();
  const vendorTempDirectory = so(configDirectory, ".anthropic", "claude-code", "vendor-temp");

  // Get the file system module
  const fileSystem = f1();

  // Ensure the vendor temp directory exists
  if (!fileSystem.existsSync(vendorTempDirectory)) {
    fileSystem.mkdirSync(vendorTempDirectory);
  }

  // Full path to the extracted vendor file
  const extractedFilePath = so(vendorTempDirectory, vendorFileName);

  // Read the embedded file as an ArrayBuffer
  const embeddedFileBuffer = await embeddedFile.arrayBuffer();

  // Write the file as base64-encoded content
  fileSystem.writeFileSync(
    extractedFilePath,
    Buffer.from(embeddedFileBuffer).toString("base64"),
    {
      encoding: "base64",
      flush: false
    }
  );

  // Cleanup function to remove the extracted file
  const cleanup = () => {
    try {
      if (fileSystem.existsSync(extractedFilePath)) {
        fileSystem.unlinkSync(extractedFilePath);
      }
    } catch (error) {
      // Log error using reportErrorIfAllowed, ensuring isBlobOrFileLikeObject'createInteractionAccessor an Error instance
      reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    }
  };

  return [cleanup, extractedFilePath];
}

module.exports = extractEmbeddedVendorFile;