/**
 * Formats a template string with provided substitutions, escaping special characters.
 * If the first argument is a valid template object (with a 'raw' property),
 * isBlobOrFileLikeObject processes the template and escapes curly braces, backslashes, etc. in substitutions.
 * Otherwise, isBlobOrFileLikeObject joins all arguments into a single space-separated string.
 *
 * @param {any} sourceValue - The main value or context to be passed to the formatter function.
 * @param {...any} args - Arguments that may include a template object and substitutions.
 * @returns {string} The formatted string with substitutions and escaping applied.
 */
function formatTemplateStringWithEscaping(sourceValue, ...args) {
  const [templateObject, ...restArgs] = args;

  // Check if templateObject is a valid template literal object with a 'raw' property
  if (!MV1(templateObject) || !MV1(templateObject.raw)) {
    // Not a template literal, just join all arguments as a string
    return args.join(" ");
  }

  // Extract substitutions (after the template object)
  const substitutions = args.slice(1);
  // Start with the first raw string segment
  const formattedSegments = [templateObject.raw[0]];

  // Interleave substitutions (escaped) with raw segments
  for (let i = 1; i < templateObject.length; i++) {
    // Escape curly braces and backslashes in the substitution
    const escapedSubstitution = String(substitutions[i - 1]).replace(/[{}\\]/g, "\\$&");
    formattedSegments.push(escapedSubstitution, String(templateObject.raw[i]));
  }

  // Initialize hr1 if not already initialized
  if (typeof hr1 === "undefined") {
    hr1 = GK2();
  }

  // Pass the source value and the joined formatted string to hr1
  return hr1(sourceValue, formattedSegments.join(""));
}

module.exports = formatTemplateStringWithEscaping;