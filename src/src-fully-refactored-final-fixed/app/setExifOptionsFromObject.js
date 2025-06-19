/**
 * Sets EXIF options from a nested object structure.
 *
 * This function processes a nested object representing EXIF metadata and populates
 * the `withExif` options property on the current instance. It validates that the input
 * is an object, that each top-level property is an object, and that each nested property
 * is a string. Throws descriptive errors if validation fails.
 *
 * @param {Object} exifObject - An object where each key is an EXIF section (e.g., 'GPS'),
 *   and each value is an object mapping EXIF tag names to string values.
 * @returns {any} The result of calling this.keepExif(), after setting options.
 * @throws {Error} If the input or any nested value does not match the expected type.
 */
function setExifOptionsFromObject(exifObject) {
  // Validate that the input is an object
  if (x1.object(exifObject)) {
    // Iterate over each EXIF section (e.g., 'GPS', 'IFD0')
    for (const [exifSection, exifTags] of Object.entries(exifObject)) {
      // Validate that each section'createInteractionAccessor value is an object
      if (x1.object(exifTags)) {
        // Iterate over each EXIF tag in the section
        for (const [tagName, tagValue] of Object.entries(exifTags)) {
          // Validate that each tag value is a string
          if (x1.string(tagValue)) {
            // Set the EXIF option using a normalized key
            this.options.withExif[`exif-${exifSection.toLowerCase()}-${tagName}`] = tagValue;
          } else {
            // Throw if the tag value is not a string
            throw x1.invalidParameterError(`${exifSection}.${tagName}`, "string", tagValue);
          }
        }
      } else {
        // Throw if the section value is not an object
        throw x1.invalidParameterError(exifSection, "object", exifTags);
      }
    }
  } else {
    // Throw if the input is not an object
    throw x1.invalidParameterError("exif", "object", exifObject);
  }
  // Mark that EXIF options should not be merged and finalize
  this.options.withExifMerge = false;
  return this.keepExif();
}

module.exports = setExifOptionsFromObject;