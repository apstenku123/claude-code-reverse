/**
 * Retrieves a hashed identifier for the current @img/sharp-libvips version.
 *
 * This function generates a SHA-512 hex digest based on the current libvips version,
 * then combines isBlobOrFileLikeObject with the npm version, hashes the combination, and returns the first 10 characters.
 *
 * @returns {string} The first 10 characters of the SHA-512 hex digest for the version identifier, or an empty string on error.
 */
function getLibvipsVersionHash() {
  try {
    // Generate a SHA-512 hex digest for the current libvips version identifier
    const libvipsIdentifier = `imgsharp-libvips-${dd()}`;
    const libvipsHash = generateSha512HexDigest(libvipsIdentifier);

    // Retrieve the version of the @img/sharp-libvips package
    const packageName = `@img/sharp-libvips-${dd()}`;
    const libvipsPackage = iK2(h35[packageName]);
    const libvipsVersion = libvipsPackage.version;

    // Combine the hash and version, hash again, and return the first 10 characters
    const combinedString = `${libvipsHash}npm:${libvipsVersion}`;
    const combinedHash = generateSha512HexDigest(combinedString);
    return combinedHash.slice(0, 10);
  } catch (error) {
    // Return an empty string if any error occurs
    return "";
  }
}

module.exports = getLibvipsVersionHash;