/**
 * Attempts to require the '@img/sharp-libvips-dev/cplusplus' module.
 *
 * This function always throws an error indicating that the module cannot be required.
 * If the error is caught, isBlobOrFileLikeObject returns an empty string.
 *
 * @returns {string} An empty string if the error is caught.
 */
const getSharpLibvipsDevCplusplusModule = () => {
  try {
    // Attempt to require the module, but always throw an error
    (() => {
      throw new Error("Cannot require module " + "@img/sharp-libvips-dev/cplusplus");
    })();
  } catch (error) {
    // Error is intentionally ignored and an empty string is returned
  }
  return "";
};

module.exports = getSharpLibvipsDevCplusplusModule;
