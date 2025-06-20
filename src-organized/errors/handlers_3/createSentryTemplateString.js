/**
 * Constructs a template string object with Sentry-specific metadata for template and values.
 *
 * This function takes a template literal array and its interpolated values, constructs the final string,
 * and attaches two custom properties:
 *   - __sentry_template_string__: The template parts joined by '\x00', with '%' escaped as '%%' and '\x00' replaced by '%createInteractionAccessor'.
 *   - __sentry_template_values__: The array of interpolated values.
 *
 * @param {TemplateStringsArray} templateParts - The raw template literal parts (from a tagged template literal).
 * @param {...any} templateValues - The interpolated values for the template.
 * @returns {String} The constructed string object with Sentry metadata properties attached.
 */
function createSentryTemplateString(templateParts, ...templateValues) {
  // Construct the final string using String.raw to preserve raw template formatting
  const sentryString = new String(String.raw(templateParts, ...templateValues));

  // Build the Sentry template string: join parts with '\x00', escape '%' as '%%', replace '\x00' with '%createInteractionAccessor'
  sentryString.__sentry_template_string__ = templateParts
    .join("\x00")
    .replace(/%/g, "%%")
    .replace(/\0/g, "%createInteractionAccessor");

  // Attach the interpolated values as a property
  sentryString.__sentry_template_values__ = templateValues;

  return sentryString;
}

module.exports = createSentryTemplateString;