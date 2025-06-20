/**
 * Ensures that the global `File` constructor is available for file uploads.
 * Throws a descriptive error if `File` is not defined, with guidance for Node.js environments.
 *
 * @throws {Error} If `File` is not defined globally.
 */
function ensureFileGlobalForUploads() {
  // Check if the global File constructor is available
  if (typeof File === "undefined") {
    // Attempt to detect if running in a Node.js environment
    const { process } = globalThis;
    // Determine if Node.js version is less than 20
    const isOldNodeVersion =
      typeof process?.versions?.node === "string" &&
      parseInt(process.versions.node.split(".")[0], 10) < 20;

    // Throw an error with guidance for Node.js users
    throw new Error(
      "`File` is not defined as a global, which is required for file uploads." +
        (isOldNodeVersion
          ? " Update to Node 20 LTS or newer, or set `globalThis.File` to `import('node:buffer').File`."
          : "")
    );
  }
}

module.exports = ensureFileGlobalForUploads;