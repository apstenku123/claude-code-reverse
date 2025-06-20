/**
 * Attempts to retrieve the include path for the sharp-libvips-dev library using the current version.
 * If the specific versioned path is unavailable, throws an error referencing the generic include path.
 *
 * @returns {string} The include path for the sharp-libvips-dev library, or an empty string if all attempts fail.
 */
const getLibvipsIncludePath = () => {
  try {
    // Attempt to get the include path using the current libvips version
    const currentVersion = dd(); // dd() is assumed to return the current version string
    const includePath = G1(`@img/sharp-libvips-dev-${currentVersion}/include`);
    return includePath;
  } catch {
    try {
      // If the versioned path is unavailable, throw an error referencing the generic include path
      throw new Error("Cannot require module @img/sharp-libvips-dev/include");
    } catch {
      // Swallow the error and fall through
    }
  }
  // If all attempts fail, return an empty string
  return "";
};

module.exports = getLibvipsIncludePath;