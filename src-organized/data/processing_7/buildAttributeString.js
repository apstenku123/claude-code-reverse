/**
 * Builds a string of HTML/XML attributes from a given attribute object and configuration.
 *
 * @param {Object} attributes - An object containing attribute key-value pairs to be processed.
 * @param {Object} config - Configuration object for attribute processing.
 * @param {Function} config.attributeValueProcessor - Function to process each attribute value.
 * @param {Function} config.attributeNamePrefix - String prefix to strip from attribute names.
 * @param {boolean} config.ignoreAttributes - If true, attributes are ignored and an empty string is returned.
 * @param {boolean} config.suppressBooleanAttributes - If true, boolean attributes are rendered without a value.
 * @returns {string} a string of processed attributes suitable for inclusion in an HTML/XML tag.
 */
function buildAttributeString(attributes, config) {
  let attributeString = "";

  // If attributes exist and handleMissingDoctypeError are not ignoring them
  if (attributes && !config.ignoreAttributes) {
    for (const attributeName in attributes) {
      // Only process own properties
      if (!attributes.hasOwnProperty(attributeName)) continue;

      // Process the attribute value using the provided processor
      let processedValue = config.attributeValueProcessor(attributeName, attributes[attributeName]);

      // Further process the value using replaceEntitiesInString(external function)
      processedValue = replaceEntitiesInString(processedValue, config);

      // If the processed value is strictly true and suppressBooleanAttributes is enabled,
      // render the attribute without a value (e.g., 'disabled')
      if (processedValue === true && config.suppressBooleanAttributes) {
        attributeString += ` ${attributeName.substr(config.attributeNamePrefix.length)}`;
      } else {
        // Otherwise, render as key="value"
        attributeString += ` ${attributeName.substr(config.attributeNamePrefix.length)}="${processedValue}"`;
      }
    }
  }

  return attributeString;
}

module.exports = buildAttributeString;