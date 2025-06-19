/**
 * Generates a unique identifier string for a component or module based on its name, version, and schema URL.
 *
 * @param {Object} componentInfo - The object containing component identification details.
 * @param {string} componentInfo.name - The name of the component.
 * @param {string} [componentInfo.version] - The version of the component (optional).
 * @param {string} [componentInfo.schemaUrl] - The schema URL associated with the component (optional).
 * @returns {string} a colon-delimited string in the format: "name:version:schemaUrl". If version or schemaUrl are missing, empty strings are used in their place.
 */
function formatComponentIdentifier(componentInfo) {
  // Use empty string if version or schemaUrl are undefined or null
  const version = componentInfo.version ?? "";
  const schemaUrl = componentInfo.schemaUrl ?? "";
  return `${componentInfo.name}:${version}:${schemaUrl}`;
}

module.exports = formatComponentIdentifier;