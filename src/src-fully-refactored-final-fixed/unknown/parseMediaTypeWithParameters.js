/**
 * Parses a media type string (e.g., 'text/html; charset=UTF-8') into its type, subtype, and parameters.
 *
 * @param {string} mediaTypeString - The media type string to parse.
 * @returns {object|string} An object with type, subtype, parameters (Map), and essence, or 'failure' if parsing fails.
 */
function parseMediaTypeWithParameters(mediaTypeString) {
  // Remove whitespace and normalize input
  const trimmedInput = trimStringByCharCodePredicate(mediaTypeString, true, true);
  const positionTracker = { position: 0 };

  // Extract type (before '/')
  const typeToken = extractSubstringFromPosition("/", trimmedInput, positionTracker);
  if (typeToken.length === 0 || !Br.test(typeToken)) return "failure";
  if (positionTracker.position > trimmedInput.length) return "failure";
  positionTracker.position++;

  // Extract subtype (before ';')
  let subtypeToken = extractSubstringFromPosition(";", trimmedInput, positionTracker);
  subtypeToken = trimStringByCharCodePredicate(subtypeToken, false, true);
  if (subtypeToken.length === 0 || !Br.test(subtypeToken)) return "failure";

  const type = typeToken.toLowerCase();
  const subtype = subtypeToken.toLowerCase();
  const mediaType = {
    type,
    subtype,
    parameters: new Map(),
    essence: `${type}/${subtype}`
  };

  // Parse parameters (if any)
  while (positionTracker.position < trimmedInput.length) {
    // Skip the ';' delimiter and any whitespace or allowed chars
    positionTracker.position++;
    extractWhileConditionMet(char => aW6.test(char), trimmedInput, positionTracker);

    // Extract parameter name (until ';' or '=')
    let parameterName = extractWhileConditionMet(char => char !== ";" && char !== "=", trimmedInput, positionTracker);
    parameterName = parameterName.toLowerCase();

    // If at end or next char is ';', skip to next parameter
    if (positionTracker.position < trimmedInput.length) {
      if (trimmedInput[positionTracker.position] === ";") continue;
      positionTracker.position++;
    }
    if (positionTracker.position > trimmedInput.length) break;

    // Extract parameter value
    let parameterValue = null;
    if (trimmedInput[positionTracker.position] === '"') {
      // Quoted parameter value
      parameterValue = parseQuotedString(trimmedInput, positionTracker, true);
      extractSubstringFromPosition(";", trimmedInput, positionTracker);
    } else {
      // Unquoted parameter value
      parameterValue = extractSubstringFromPosition(";", trimmedInput, positionTracker);
      parameterValue = trimStringByCharCodePredicate(parameterValue, false, true);
      if (parameterValue.length === 0) continue;
    }

    // Validate and store parameter if valid and not already present
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

module.exports = parseMediaTypeWithParameters;