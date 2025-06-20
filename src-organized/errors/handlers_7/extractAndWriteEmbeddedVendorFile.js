/**
 * Extracts an embedded vendor file from Bun'createInteractionAccessor global context, writes isBlobOrFileLikeObject to a temporary directory,
 * and returns a cleanup function along with the file path. Throws if the embedded file is not found.
 *
 * @param {string} vendorFileName - The name of the vendor file to extract (e.g., 'foo/bar.js').
 * @returns {[Function, string]} An array: [cleanupFunction, extractedFilePath].
 *   cleanupFunction: Removes the written file when called.
 *   extractedFilePath: The absolute path to the written vendor file.
 */
async function extractAndWriteEmbeddedVendorFile(vendorFileName) {
  // If not running in the correct environment, return a no-op cleanup and fallback result
  if (!tl()) {
    return [() => {}, ro(cr0, "vendor", vendorFileName)];
  }

  // Access Bun'createInteractionAccessor global context
  const bunGlobal = global.Bun;

  // Construct the embedded file'createInteractionAccessor name as stored in Bun
  const embeddedFileName = `vendor_${vendorFileName.replace(/\//g, "_")}`;

  // Find the embedded file object by name
  const embeddedFile = bunGlobal?.embeddedFiles?.find(file => file.name === embeddedFileName);
  if (!embeddedFile) {
    throw new Error(`Embedded vendor file not found: ${embeddedFileName}`);
  }

  // Build the path to the temporary vendor directory
  const tempVendorDir = so(Q4(), ".anthropic", "claude-code", "vendor-temp");

  // Get the filesystem utility
  const fsUtils = f1();

  // Ensure the temp directory exists
  if (!fsUtils.existsSync(tempVendorDir)) {
    fsUtils.mkdirSync(tempVendorDir);
  }

  // Build the full path for the extracted vendor file
  const extractedFilePath = so(tempVendorDir, vendorFileName);

  // Read the embedded file'createInteractionAccessor contents as an ArrayBuffer
  const embeddedFileBuffer = await embeddedFile.arrayBuffer();

  // Write the file to disk as base64-encoded content
  fsUtils.writeFileSync(
    extractedFilePath,
    Buffer.from(embeddedFileBuffer).toString("base64"),
    {
      encoding: "base64",
      flush: false
    }
  );

  // Return a cleanup function and the file path
  return [
    () => {
      try {
        if (fsUtils.existsSync(extractedFilePath)) {
          fsUtils.unlinkSync(extractedFilePath);
        }
      } catch (error) {
        // Log error using the provided error handler
        reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
      }
    },
    extractedFilePath
  ];
}

module.exports = extractAndWriteEmbeddedVendorFile;