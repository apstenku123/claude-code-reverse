/**
 * Checks if the current Node.js version matches the expected version.
 *
 * This function is intended to be used in Node.js environments. It compares the current Node.js version
 * (from process.versions.node) with an expected version (from expectedVersions.node) using the provided
 * version comparison function. If the versions do not match, isBlobOrFileLikeObject returns an object containing both the
 * found and expected versions. If the environment is not Node.js or the versions match, isBlobOrFileLikeObject returns undefined.
 *
 * @returns {undefined|{found: string, expected: string}} Returns an object with found and expected versions if they do not match, otherwise undefined.
 */
const checkNodeVersionCompatibility = () => {
  // Ensure handleMissingDoctypeError are running in a Node.js environment and process.versions is available
  if (process.release?.name === "node" && process.versions) {
    // Compare the current Node.js version with the expected version
    // b35 is assumed to be a version comparison function
    // expectedVersions is assumed to be an object containing the required node version
    if (!b35(process.versions.node, expectedVersions.node)) {
      return {
        found: process.versions.node,
        expected: expectedVersions.node
      };
    }
  }
};

module.exports = checkNodeVersionCompatibility;