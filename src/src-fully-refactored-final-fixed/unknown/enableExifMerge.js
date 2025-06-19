/**
 * Enables merging of EXIF data from the provided source.
 *
 * This method applies EXIF data from the given source to the current instance
 * and sets the internal option to enable EXIF merging for subsequent operations.
 *
 * @param {any} exifSource - The source from which to extract EXIF data.
 * @returns {this} Returns the current instance for method chaining.
 */
function enableExifMerge(exifSource) {
  // Apply EXIF data from the provided source
  this.withExif(exifSource);
  // Enable the option to merge EXIF data
  this.options.withExifMerge = true;
  // Return the current instance to allow method chaining
  return this;
}

module.exports = enableExifMerge;