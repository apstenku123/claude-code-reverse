/**
 * Generates a unique resource identifier string from the provided resource metadata.
 * The identifier is constructed as: "<name>:<version>:<schemaUrl>".
 * If version or schemaUrl are missing, empty strings are used in their place.
 *
 * @param {Object} resourceMetadata - An object containing resource information.
 * @param {string} resourceMetadata.name - The name of the resource.
 * @param {string} [resourceMetadata.version] - The version of the resource (optional).
 * @param {string} [resourceMetadata.schemaUrl] - The schema URL of the resource (optional).
 * @returns {string} The formatted resource identifier string.
 */
function formatResourceIdentifier(resourceMetadata) {
  // Use empty string if version or schemaUrl are undefined or null
  const version = resourceMetadata.version ?? "";
  const schemaUrl = resourceMetadata.schemaUrl ?? "";

  // Construct the identifier string in the format: name:version:schemaUrl
  return `${resourceMetadata.name}:${version}:${schemaUrl}`;
}

module.exports = formatResourceIdentifier;