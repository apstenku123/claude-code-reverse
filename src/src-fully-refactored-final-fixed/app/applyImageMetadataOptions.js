/**
 * Applies metadata options to the current image processing instance.
 *
 * This function updates the instance'createInteractionAccessor metadata options such as orientation, density, ICC profile, and EXIF data
 * based on the provided metadataOptions object. It validates each property before applying isBlobOrFileLikeObject and throws descriptive
 * errors if invalid values are provided.
 *
 * @param {Object} metadataOptions - An object containing metadata options to apply.
 * @param {number} [metadataOptions.orientation] - The EXIF orientation (integer between 1 and 8).
 * @param {number} [metadataOptions.density] - The image density (positive number).
 * @param {string} [metadataOptions.icc] - The ICC profile to embed.
 * @param {Object} [metadataOptions.exif] - EXIF data to merge.
 * @returns {this} Returns the current instance for chaining.
 * @throws {Error} Throws if orientation or density are invalid.
 */
function applyImageMetadataOptions(metadataOptions) {
  // Ensure metadata is preserved and set default ICC profile to 'srgb'
  this.keepMetadata();
  this.withIccProfile("srgb");

  // Validate that metadataOptions is an object
  if (x1.object(metadataOptions)) {
    // Handle orientation option
    if (x1.defined(metadataOptions.orientation)) {
      if (
        x1.integer(metadataOptions.orientation) &&
        x1.inRange(metadataOptions.orientation, 1, 8)
      ) {
        this.options.withMetadataOrientation = metadataOptions.orientation;
      } else {
        throw x1.invalidParameterError(
          "orientation",
          "integer between 1 and 8",
          metadataOptions.orientation
        );
      }
    }

    // Handle density option
    if (x1.defined(metadataOptions.density)) {
      if (
        x1.number(metadataOptions.density) &&
        metadataOptions.density > 0
      ) {
        this.options.withMetadataDensity = metadataOptions.density;
      } else {
        throw x1.invalidParameterError(
          "density",
          "positive number",
          metadataOptions.density
        );
      }
    }

    // Handle ICC profile option
    if (x1.defined(metadataOptions.icc)) {
      this.withIccProfile(metadataOptions.icc);
    }

    // Handle EXIF data option
    if (x1.defined(metadataOptions.exif)) {
      this.withExifMerge(metadataOptions.exif);
    }
  }

  // Return the current instance for chaining
  return this;
}

module.exports = applyImageMetadataOptions;
