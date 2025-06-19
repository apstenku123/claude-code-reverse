/**
 * Parses a media type string (e.g., 'text/html; charset=UTF-8') into its components.
 *
 * @param {string} mediaTypeString - The input string representing the media type.
 * @returns {object|string} An object with type, subtype, parameters, and essence if parsing succeeds, or 'failure' if invalid.
 */
function parseMediaType(mediaTypeString) {
  // Normalize and trim the input string
  const normalizedInput = trimStringByCharCodePredicate(mediaTypeString, true, true);

  // Parsing state object to track position
  const parseState = {
    position: 0
  };

  // Extract the type (before '/')
  const typeToken = extractSubstringFromPosition("/", normalizedInput, parseState);
  if (typeToken.length === 0 || !Br.test(typeToken)) return "failure";
  if (parseState.position > normalizedInput.length) return "failure";
  parseState.position++;

  // Extract the subtype (before ';')
  let subtypeToken = extractSubstringFromPosition(";", normalizedInput, parseState);
  subtypeToken = trimStringByCharCodePredicate(subtypeToken, false, true);
  if (subtypeToken.length === 0 || !Br.test(subtypeToken)) return "failure";

  // Lowercase type and subtype for consistency
  const type = typeToken.toLowerCase();
  const subtype = subtypeToken.toLowerCase();

  // Initialize the result object
  const mediaType = {
    type,
    subtype,
    parameters: new Map(),
    essence: `${type}/${subtype}`
  };

  // Parse parameters (if any)
  while (parseState.position < normalizedInput.length) {
    // Move past the semicolon and any whitespace or irrelevant chars
    parseState.position++;
    extractWhileConditionMet(char => aW6.test(char), normalizedInput, parseState);

    // Extract parameter name (until ';' or '=')
    let paramName = extractWhileConditionMet(char => char !== ";" && char !== "=", normalizedInput, parseState);
    paramName = paramName.toLowerCase();

    // If at end, skip or continue
    if (parseState.position < normalizedInput.length) {
      if (normalizedInput[parseState.position] === ";") continue;
      parseState.position++;
    }
    if (parseState.position > normalizedInput.length) break;

    // Extract parameter value
    let paramValue = null;
    if (normalizedInput[parseState.position] === '"') {
      // Quoted parameter value
      paramValue = parseQuotedString(normalizedInput, parseState, true);
      extractSubstringFromPosition(";", normalizedInput, parseState);
    } else {
      // Unquoted parameter value
      paramValue = extractSubstringFromPosition(";", normalizedInput, parseState);
      paramValue = trimStringByCharCodePredicate(paramValue, false, true);
      if (paramValue.length === 0) continue;
    }

    // Add parameter if valid and not already present
    if (
      paramName.length !== 0 &&
      Br.test(paramName) &&
      (paramValue.length === 0 || rW6.test(paramValue)) &&
      !mediaType.parameters.has(paramName)
    ) {
      mediaType.parameters.set(paramName, paramValue);
    }
  }

  return mediaType;
}

module.exports = parseMediaType;