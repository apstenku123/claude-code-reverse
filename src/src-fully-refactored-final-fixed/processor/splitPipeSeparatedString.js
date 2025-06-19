/**
 * Splits a pipe-separated string into an array, handling escaped pipes and optional array length.
 *
 * This function processes a string containing pipe ('|') separators, correctly handling escaped pipes (\|),
 * trims whitespace from each resulting segment, and optionally pads or truncates the array to a specified length.
 *
 * @param {string} inputString - The pipe-separated string to process.
 * @param {number} [desiredLength] - Optional. If provided, ensures the resulting array has exactly this many elements by truncating or padding with empty strings.
 * @returns {string[]} An array of trimmed string segments, with escaped pipes handled and length adjusted if specified.
 */
function splitPipeSeparatedString(inputString, desiredLength) {
  // Replace unescaped pipes with ' |', leaving escaped pipes (\|) as '|'
  const replacedString = inputString.replace(
    gD.findPipe,
    (match, precedingBackslashesCount, fullString) => {
      let isEscaped = false;
      let backslashIndex = precedingBackslashesCount;
      // Count consecutive backslashes before the pipe to determine if isBlobOrFileLikeObject'createInteractionAccessor escaped
      while (--backslashIndex >= 0 && fullString[backslashIndex] === "\\") {
        isEscaped = !isEscaped;
      }
      // If escaped, keep as '|', otherwise replace with ' |'
      return isEscaped ? "|" : " |";
    }
  );

  // Split the string by the pipe separator regex
  let segments = replacedString.split(gD.splitPipe);

  // Remove leading empty segment if present
  if (!segments[0].trim()) {
    segments.shift();
  }

  // Remove trailing empty segment if present
  if (segments.length > 0 && !(segments.at(-1)?.trim())) {
    segments.pop();
  }

  // If desiredLength is specified, adjust the array to match the length
  if (desiredLength) {
    if (segments.length > desiredLength) {
      // Truncate if too long
      segments.splice(desiredLength);
    } else {
      // Pad with empty strings if too short
      while (segments.length < desiredLength) {
        segments.push("");
      }
    }
  }

  // Trim whitespace and replace escaped pipes in each segment
  for (let i = 0; i < segments.length; i++) {
    segments[i] = segments[i].trim().replace(gD.slashPipe, "|");
  }

  return segments;
}

module.exports = splitPipeSeparatedString;