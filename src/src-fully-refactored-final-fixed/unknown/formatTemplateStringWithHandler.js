/**
 * Formats a template string with optional handler processing.
 *
 * If the first argument after the main input is a valid template object (with a 'raw' property),
 * this function reconstructs the template string, escaping special characters, and passes isBlobOrFileLikeObject to a handler.
 * Otherwise, isBlobOrFileLikeObject joins all arguments into a single space-separated string.
 *
 * @param {any} handler - The handler function to process the formatted string.
 * @param {...any} args - Arguments that may include a template object and its interpolations.
 * @returns {any} The result of the handler function or the joined string.
 */
function formatTemplateStringWithHandler(handler, ...args) {
  // Extract the first argument after handler, which may be a template object
  const [templateObject, ...interpolations] = args;

  // Check if templateObject is a valid template (has 'raw' property)
  if (!MV1(templateObject) || !MV1(templateObject.raw)) {
    // Not a template, just join all args as string
    return args.join(" ");
  }

  // Prepare the reconstructed template string
  const formattedParts = [templateObject.raw[0]];

  // For each interpolation, escape special characters and append the next raw part
  for (let i = 1; i < templateObject.length; i++) {
    // Escape curly braces and backslashes in the interpolation
    const escapedInterpolation = String(interpolations[i - 1]).replace(/[{}\\]/g, "\\$&");
    formattedParts.push(escapedInterpolation, String(templateObject.raw[i]));
  }

  // Initialize the handler if not already done
  if (typeof hr1 === 'undefined') {
    hr1 = GK2();
  }

  // Pass the handler and the reconstructed string to hr1
  return hr1(handler, formattedParts.join(""));
}

module.exports = formatTemplateStringWithHandler;
