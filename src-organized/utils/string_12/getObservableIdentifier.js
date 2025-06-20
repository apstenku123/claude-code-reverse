/**
 * Generates a unique identifier string for an observable based on its name, version, and schema URL.
 *
 * @param {Object} observableMetadata - An object containing metadata about the observable.
 * @param {string} observableMetadata.name - The name of the observable.
 * @param {string} [observableMetadata.version] - The version of the observable (optional).
 * @param {string} [observableMetadata.schemaUrl] - The schema URL of the observable (optional).
 * @returns {string} a colon-separated string in the format: name:version:schemaUrl. If version or schemaUrl are missing, empty strings are used in their place.
 */
function getObservableIdentifier(observableMetadata) {
  // Use nullish coalescing to provide empty strings for missing version or schemaUrl
  return `${observableMetadata.name}:${observableMetadata.version ?? ""}:${observableMetadata.schemaUrl ?? ""}`;
}

module.exports = getObservableIdentifier;