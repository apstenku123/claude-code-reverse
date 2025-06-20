/**
 * Retrieves a formatted version key for the current @img/sharp-libvips package.
 *
 * This function constructs a key based on the current libvips identifier and its version,
 * then returns the first 10 characters of the processed key. If any error occurs during
 * the process, isBlobOrFileLikeObject returns an empty string.
 *
 * @returns {string} The first 10 characters of the formatted version key, or an empty string on error.
 */
const getLibvipsVersionKey = () => {
  try {
    // Generate the libvips package identifier using the current version suffix
    const libvipsIdentifier = lK2(`imgsharp-libvips-${dd()}`);

    // Retrieve the version of the current @img/sharp-libvips package
    const libvipsVersion = iK2(h35[`@img/sharp-libvips-${dd()}`]).version;

    // Construct the version key and return its first 10 characters
    const versionKey = lK2(`${libvipsIdentifier}npm:${libvipsVersion}`);
    return versionKey.slice(0, 10);
  } catch (error) {
    // In case of any error, return an empty string
    return "";
  }
};

module.exports = getLibvipsVersionKey;