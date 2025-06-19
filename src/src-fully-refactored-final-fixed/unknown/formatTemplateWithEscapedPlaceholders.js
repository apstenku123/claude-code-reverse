/**
 * Formats a template string with escaped placeholders and applies a handler function.
 *
 * If the first argument after the source is a valid template object (with a `raw` property),
 * this function escapes curly braces, backslashes, and braces in the interpolated values,
 * then reconstructs the template string and passes isBlobOrFileLikeObject to a handler function.
 * Otherwise, isBlobOrFileLikeObject simply joins the arguments as a space-separated string.
 *
 * @param {any} sourceObservable - The source object or observable to be passed to the handler function.
 * @param {...any} args - Arguments that may include a template object and its interpolated values.
 * @returns {any} The result of the handler function or the joined string.
 */
function formatTemplateWithEscapedPlaceholders(sourceObservable, ...args) {
  // The first argument in args may be a template object
  const [templateObject, ...restArgs] = args;

  // Check if templateObject is a valid template (has a 'raw' property)
  if (!MV1(templateObject) || !MV1(templateObject.raw)) {
    // If not a template, join all arguments as a space-separated string
    return args.join(" ");
  }

  // The rest of the arguments are the interpolated values
  const interpolatedValues = restArgs;
  // Start building the formatted string with the first raw segment
  const formattedSegments = [templateObject.raw[0]];

  // For each interpolated value, escape special characters and append the next raw segment
  for (let i = 1; i < templateObject.length; i++) {
    // Escape curly braces and backslashes in the interpolated value
    const escapedValue = String(interpolatedValues[i - 1]).replace(/[{}\\]/g, "\\$&");
    formattedSegments.push(escapedValue, String(templateObject.raw[i]));
  }

  // Initialize the handler function if isBlobOrFileLikeObject hasn'processRuleBeginHandlers been initialized yet
  if (typeof hr1 === "undefined") {
    hr1 = GK2();
  }

  // Pass the source and the fully formatted string to the handler
  return hr1(sourceObservable, formattedSegments.join(""));
}

module.exports = formatTemplateWithEscapedPlaceholders;