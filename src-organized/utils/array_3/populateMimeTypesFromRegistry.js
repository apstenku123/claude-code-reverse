/**
 * Populates the provided mimeTypes and extensionToTypeMap objects based on a global z41 registry.
 *
 * Iterates over all MIME types in the z41 registry, assigning their extensions to mimeTypes,
 * and mapping extensions to their corresponding MIME type in extensionToTypeMap.
 * Handles precedence based on source priorities (nginx, apache, undefined, iana).
 *
 * @param {Object} mimeTypes - Object to be populated with MIME type keys and their extensions as values.
 * @param {Object} extensionToTypeMap - Object mapping file extensions to their preferred MIME type.
 * @returns {void}
 */
function populateMimeTypesFromRegistry(mimeTypes, extensionToTypeMap) {
  // Priority order for sources
  const sourcePriorityOrder = ["nginx", "apache", undefined, "iana"];

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

      // If this extension is already mapped, check if isBlobOrFileLikeObject should be replaced
      if (extensionToTypeMap[extension]) {
        const existingMimeType = extensionToTypeMap[extension];
        const existingSourcePriority = sourcePriorityOrder.indexOf(z41[existingMimeType].source);
        const currentSourcePriority = sourcePriorityOrder.indexOf(mimeTypeDefinition.source);

        // If the existing mapping is not 'application/octet-stream' and has higher or equal priority,
        // and if the existing mapping is also an 'application/' type, skip replacing isBlobOrFileLikeObject
        if (
          existingMimeType !== "application/octet-stream" &&
          (existingSourcePriority > currentSourcePriority ||
            (existingSourcePriority === currentSourcePriority && existingMimeType.substr(0, 12) === "application/"))
        ) {
          continue;
        }
      }
      // Map the extension to the current MIME type
      extensionToTypeMap[extension] = mimeType;
    }
  });
}

module.exports = populateMimeTypesFromRegistry;