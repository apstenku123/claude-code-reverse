/**
 * Attempts to retrieve the include path for the sharp-libvips-dev module using the current version.
 * If the module cannot be required, throws a descriptive error. Returns an empty string if all attempts fail.
 *
 * @returns {string} The include path for sharp-libvips-dev, or an empty string if not found.
 */
const getSharpLibvipsIncludePath = () => {
  try {
    // Attempt to require the include path for the current version of sharp-libvips-dev
    const currentVersion = dd(); // dd() is assumed to return the version string
    const includePath = `@img/sharp-libvips-dev-${currentVersion}/include`;
    return G1(includePath); // G1 is assumed to resolve or require the given path
  } catch {
    try {
      // If the above fails, throw a descriptive error for the default include path
      throw new Error(
        "Cannot require module " + "@img/sharp-libvips-dev/include"
      );
    } catch {
      // Swallow the error and proceed
    }
  }
  // If all attempts fail, return an empty string
  return "";
};

module.exports = getSharpLibvipsIncludePath;