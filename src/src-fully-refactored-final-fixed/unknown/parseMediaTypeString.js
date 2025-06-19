/**
 * Parses a media type string (e.g., 'text/html; charset=UTF-8') into its type, subtype, and parameters.
 *
 * @param {string} mediaTypeString - The raw media type string to parse.
 * @returns {object|string} An object with type, subtype, parameters (Map), and essence, or 'failure' if parsing fails.
 */
function parseMediaTypeString(mediaTypeString) {
  // Trim the input string by char code predicate (removes whitespace and control chars)
  const trimmedMediaType = trimStringByCharCodePredicate(mediaTypeString, true, true);

  // Position tracker object for parsing
  const positionTracker = { position: 0 };

  // Extract the type (before '/')
  const typeToken = extractSubstringFromPosition("/", trimmedMediaType, positionTracker);
  if (typeToken.length === 0 || !Br.test(typeToken)) return "failure";
  if (positionTracker.position > trimmedMediaType.length) return "failure";

  // Move past the '/'
  positionTracker.position++;

  // Extract the subtype (before ';')
  let subtypeToken = extractSubstringFromPosition(";", trimmedMediaType, positionTracker);
  subtypeToken = trimStringByCharCodePredicate(subtypeToken, false, true);
  if (subtypeToken.length === 0 || !Br.test(subtypeToken)) return "failure";

  // Lowercase type and subtype for normalization
  const type = typeToken.toLowerCase();
  const subtype = subtypeToken.toLowerCase();

  // Prepare the result object
  const mediaType = {
    type,
    subtype,
    parameters: new Map(),
    essence: `${type}/${subtype}`
  };

  // Parse parameters (after the first ';')
  while (positionTracker.position < trimmedMediaType.length) {
    // Move past the ';' or whitespace
    positionTracker.position++;
    extractWhileConditionMet(char => aW6.test(char), trimmedMediaType, positionTracker);

    // Extract parameter name (up to '=' or ';')
    let parameterName = extractWhileConditionMet(char => char !== ";" && char !== "=", trimmedMediaType, positionTracker);
    parameterName = parameterName.toLowerCase();

    // If at end, or next char is ';', skip to next
    if (positionTracker.position < trimmedMediaType.length) {
      if (trimmedMediaType[positionTracker.position] === ";") continue;
      positionTracker.position++;
    }
    if (positionTracker.position > trimmedMediaType.length) break;

    // Extract parameter value
    let parameterValue = null;
    if (trimmedMediaType[positionTracker.position] === '"') {
      // Quoted parameter value
      parameterValue = parseQuotedString(trimmedMediaType, positionTracker, true);
      extractSubstringFromPosition(";", trimmedMediaType, positionTracker);
    } else {
      // Unquoted parameter value
      parameterValue = extractSubstringFromPosition(";", trimmedMediaType, positionTracker);
      parameterValue = trimStringByCharCodePredicate(parameterValue, false, true);
      if (parameterValue.length === 0) continue;
    }

    // Only add valid parameters (name is non-empty, matches Br, value is empty or matches rW6, and not already present)
    if (
      parameterName.length !== 0 &&
      Br.test(parameterName) &&
      (parameterValue.length === 0 || rW6.test(parameterValue)) &&
      !mediaType.parameters.has(parameterName)
    ) {
      mediaType.parameters.set(parameterName, parameterValue);
    }
  }

  return mediaType;
}

module.exports = parseMediaTypeString;