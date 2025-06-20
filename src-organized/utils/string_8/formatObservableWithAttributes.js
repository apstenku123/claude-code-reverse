/**
 * Formats an observable name with optional attribute key-value pairs and a subscription string.
 *
 * @param {string} observableName - The base name of the observable.
 * @param {Object} attributes - Key-value pairs to be formatted as attributes.
 * @param {any} subscription - Subscription or query information to be formatted.
 * @param {any} [optionalValue] - Optional value to append to the result string if defined.
 * @param {Object} [additionalAttributes] - Additional key-value pairs to be formatted as attributes.
 * @returns {string} The formatted observable string with attributes and subscription info.
 */
function formatObservableWithAttributes(
  observableName,
  attributes,
  subscription,
  optionalValue,
  additionalAttributes
) {
  let hasAttributes = false;
  let attributesString = "";

  // Process main attributes
  for (const [attributeKey, attributeValue] of Object.entries(attributes)) {
    const formattedKey = Mm1(attributeKey); // Format the attribute key
    hasAttributes = true;
    attributesString += `${attributesString.length > 0 ? "," : ""}${formattedKey}="${escapeDoubleQuotesInProcessedString(attributeValue)}"`;
  }

  // Process additional attributes if provided
  if (additionalAttributes) {
    for (const [attributeKey, attributeValue] of Object.entries(additionalAttributes)) {
      const formattedKey = Mm1(attributeKey);
      hasAttributes = true;
      attributesString += `${attributesString.length > 0 ? "," : ""}${formattedKey}="${escapeDoubleQuotesInProcessedString(attributeValue)}"`;
    }
  }

  // Append attributes to the observable name if any exist
  if (hasAttributes) {
    observableName += `{${attributesString}}`;
  }

  // Build the final formatted string
  return `${observableName} ${formatInfinityNumber(subscription)}${optionalValue !== undefined ? " " + String(optionalValue) : ""}\n`;
}

module.exports = formatObservableWithAttributes;