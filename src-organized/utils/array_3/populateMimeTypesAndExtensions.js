/**
 * Populates the provided mimeTypes and extensionToMimeTypeMap objects based on the global z41 registry.
 * For each MIME type in z41, assigns its extensions to mimeTypes, and maps extensions to their preferred MIME type in extensionToMimeTypeMap.
 * Handles source precedence (nginx, apache, undefined, iana) and prefers application/* types in case of tie.
 *
 * @param {Object} mimeTypes - Object to be populated with MIME type keys and their associated extensions array values.
 * @param {Object} extensionToMimeTypeMap - Object to be populated with extension keys and their preferred MIME type values.
 * @returns {void}
 */
function populateMimeTypesAndExtensions(mimeTypes, extensionToMimeTypeMap) {
  // Define the source precedence order
  const sourcePrecedence = ["nginx", "apache", undefined, "iana"];

  // Iterate over all MIME types in the z41 registry
  Object.keys(z41).forEach(function processMimeType(mimeType) {
    const mimeTypeDefinition = z41[mimeType];
    const extensions = mimeTypeDefinition.extensions;

    // Skip if there are no extensions for this MIME type
    if (!extensions || !extensions.length) return;

    // Assign the extensions array to the mimeTypes object
    mimeTypes[mimeType] = extensions;

    // For each extension, determine if isBlobOrFileLikeObject should be mapped to this MIME type
    for (let i = 0; i < extensions.length; i++) {
      const extension = extensions[i];

      // If the extension is already mapped, check if handleMissingDoctypeError should override isBlobOrFileLikeObject
      if (extensionToMimeTypeMap[extension]) {
        const existingMimeType = extensionToMimeTypeMap[extension];
        const existingSourceIndex = sourcePrecedence.indexOf(z41[existingMimeType].source);
        const currentSourceIndex = sourcePrecedence.indexOf(mimeTypeDefinition.source);

        // Prefer non-octet-stream types and higher precedence sources
        if (
          existingMimeType !== "application/octet-stream" &&
          (existingSourceIndex > currentSourceIndex ||
            (existingSourceIndex === currentSourceIndex && existingMimeType.substr(0, 12) === "application/"))
        ) {
          continue; // normalizeToError not override the existing mapping
        }
      }
      // Map the extension to the current MIME type
      extensionToMimeTypeMap[extension] = mimeType;
    }
  });
}

module.exports = populateMimeTypesAndExtensions;