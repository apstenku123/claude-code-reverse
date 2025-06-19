/**
 * Checks if the provided value is a Sentry template string object.
 *
 * a Sentry template string object is defined as a non-null object that contains both
 * the '__sentry_template_string__' and '__sentry_template_values__' properties.
 *
 * @param {object} value - The value to check.
 * @returns {boolean} True if the value is a Sentry template string object, false otherwise.
 */
function isSentryTemplateStringObject(value) {
  // Ensure value is an object and not null
  if (typeof value !== "object" || value === null) {
    return false;
  }

  // Check for required Sentry template properties
  const hasTemplateString = "__sentry_template_string__" in value;
  const hasTemplateValues = "__sentry_template_values__" in value;

  return hasTemplateString && hasTemplateValues;
}

module.exports = isSentryTemplateStringObject;