/**
 * Creates an Error indicating that JP2 output requires libvips with OpenJPEG support.
 *
 * @returns {Error} Error indicating missing OpenJPEG support in libvips.
 */
const createMissingOpenJpegSupportError = () => {
  // Return a new error with a descriptive message about missing OpenJPEG support
  return new Error("JP2 output requires libvips with support for OpenJPEG");
};

module.exports = createMissingOpenJpegSupportError;
