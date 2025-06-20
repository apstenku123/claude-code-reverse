/**
 * Checks if the global `File` constructor is available. Throws an error if not, with a helpful message for Node.js environments.
 *
 * In Node.js, `File` is not available by default before Node 20. This function instructs users to upgrade or polyfill if necessary.
 *
 * @throws {Error} If `File` is not defined as a global.
 */
function ensureFileGlobalAvailable() {
  // Check if the global File constructor is available
  if (typeof File === "undefined") {
    // Attempt to detect if running in a Node.js environment
    const { process: nodeProcess } = globalThis;
    // Determine if Node.js version is less than 20
    const isOldNodeVersion =
      typeof nodeProcess?.versions?.node === "string" &&
      parseInt(nodeProcess.versions.node.split(".")[0], 10) < 20;

    // Construct a helpful error message
    let errorMessage = "`File` is not defined as a global, which is required for file uploads.";
    if (isOldNodeVersion) {
      errorMessage +=
        " Update to Node 20 LTS or newer, or set `globalThis.File` to `import('node:buffer').File`.";
    }
    throw new Error(errorMessage);
  }
}

module.exports = ensureFileGlobalAvailable;
