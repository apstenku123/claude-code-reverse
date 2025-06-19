/**
 * Applies EXIF options from a nested object structure to the instance'createInteractionAccessor options.
 *
 * The input should be an object where each key is an EXIF section (e.g., 'GPS'),
 * and each value is an object mapping EXIF field names to their string values.
 *
 * Example input:
 * {
 *   GPS: {
 *     Latitude: "40.7128N",
 *     Longitude: "74.0060W"
 *   },
 *   Camera: {
 *     Model: "Canon EOS 5D"
 *   }
 * }
 *
 * This will set:
 *   this.options.withExif['exif-gps-latitude'] = "40.7128N"
 *   this.options.withExif['exif-gps-longitude'] = "74.0060W"
 *   this.options.withExif['exif-camera-model'] = "Canon EOS 5D"
 *
 * @param {Object} exifObject - Nested object mapping EXIF sections to field/value pairs.
 * @returns {any} The result of this.keepExif().
 * @throws {Error} If the input structure is invalid or contains non-string values.
 */
function applyExifOptionsFromObject(exifObject) {
  // Validate that the top-level input is an object
  if (!x1.object(exifObject)) {
    throw x1.invalidParameterError("exif", "object", exifObject);
  }

  // Iterate over each EXIF section (e.g., 'GPS', 'Camera')
  for (const [sectionName, sectionFields] of Object.entries(exifObject)) {
    // Each section must itself be an object
    if (!x1.object(sectionFields)) {
      throw x1.invalidParameterError(sectionName, "object", sectionFields);
    }

    // Iterate over each field in the section
    for (const [fieldName, fieldValue] of Object.entries(sectionFields)) {
      // Each field value must be a string
      if (x1.string(fieldValue)) {
        // Construct the EXIF key and assign the value
        const exifKey = `exif-${sectionName.toLowerCase()}-${fieldName}`;
        this.options.withExif[exifKey] = fieldValue;
      } else {
        throw x1.invalidParameterError(`${sectionName}.${fieldName}`, "string", fieldValue);
      }
    }
  }

  // Mark that withExifMerge should not be used, then call keepExif
  this.options.withExifMerge = false;
  return this.keepExif();
}

module.exports = applyExifOptionsFromObject;