/**
 * Maps MIME types to their associated file extensions and updates the provided mappings.
 *
 * Iterates over the global `z41` MIME database, updating the `mimeTypeToExtensions` and `extensionToMimeType` objects.
 * For each MIME type, its extensions are registered. If an extension is already mapped, a priority system based on the source (nginx, apache, undefined, iana) is used to determine whether to overwrite the mapping.
 *
 * @param {Object} mimeTypeToExtensions - An object to be populated with MIME type keys and their associated array of extensions.
 * @param {Object} extensionToMimeType - An object mapping file extensions to their preferred MIME type.
 * @returns {void}
 */
function mapMimeTypesToExtensions(mimeTypeToExtensions, extensionToMimeType) {
  // Priority order for MIME type sources
  const sourcePriority = ["nginx", "apache", undefined, "iana"];

  // Iterate over all MIME types in the z41 database
  Object.keys(z41).forEach(function processMimeType(mimeType) {
    const mimeTypeDefinition = z41[mimeType];
    const extensions = mimeTypeDefinition.extensions;

    // Skip if there are no extensions for this MIME type
    if (!extensions || !extensions.length) return;

    // Map this MIME type to its extensions
    mimeTypeToExtensions[mimeType] = extensions;

    // For each extension, determine if isBlobOrFileLikeObject should be mapped to this MIME type
    for (let i = 0; i < extensions.length; i++) {
      const extension = extensions[i];

      // If this extension is already mapped, determine if isBlobOrFileLikeObject should be overwritten
      if (extensionToMimeType[extension]) {
        const existingMimeType = extensionToMimeType[extension];
        const existingSourceIndex = sourcePriority.indexOf(z41[existingMimeType].source);
        const currentSourceIndex = sourcePriority.indexOf(mimeTypeDefinition.source);

        // Only overwrite if the current MIME type has higher priority, or if priorities are equal and the existing MIME type starts with 'application/'
        if (
          existingMimeType !== "application/octet-stream" &&
          (existingSourceIndex > currentSourceIndex ||
            (existingSourceIndex === currentSourceIndex && existingMimeType.substr(0, 12) === "application/"))
        ) {
          continue;
        }
      }
      // Map the extension to the current MIME type
      extensionToMimeType[extension] = mimeType;
    }
  });
}

module.exports = mapMimeTypesToExtensions;