/**
 * Splits a string by unescaped pipe characters ('|'), trims each segment, and optionally pads or truncates the result to a specified length.
 * Escaped pipes (preceded by an odd number of backslashes) are treated as literal '|'.
 *
 * @param {string} inputString - The string to split by unescaped pipes.
 * @param {number} [segmentCount] - Optional. If provided, ensures the resulting array has exactly this many segments (pads with empty strings or truncates as needed).
 * @returns {string[]} An array of trimmed string segments, with escaped pipes handled as literals.
 */
function splitUnescapedPipes(inputString, segmentCount) {
  // Replace unescaped pipes with a unique delimiter (space + pipe), leave escaped pipes as is
  const replacedString = inputString.replace(
    gD.findPipe,
    (match, precedingBackslashesCount, fullString) => {
      let isEscaped = false;
      let backslashIndex = precedingBackslashesCount;
      // Count consecutive backslashes before the pipe
      while (--backslashIndex >= 0 && fullString[backslashIndex] === "\\") {
        isEscaped = !isEscaped;
      }
      // If pipe is escaped, keep as literal '|', else replace with ' |'
      return isEscaped ? "|" : " |";
    }
  );

  // Split the string by the delimiter (unescaped pipes)
  let segments = replacedString.split(gD.splitPipe);

  // Remove leading empty segment if present (from leading pipe)
  if (!segments[0].trim()) {
    segments.shift();
  }

  // Remove trailing empty segment if present (from trailing pipe)
  if (segments.length > 0 && !segments.at(-1)?.trim()) {
    segments.pop();
  }

  // If segmentCount is specified, pad or truncate the array to match
  if (segmentCount) {
    if (segments.length > segmentCount) {
      segments.splice(segmentCount);
    } else {
      while (segments.length < segmentCount) {
        segments.push("");
      }
    }
  }

  // Trim each segment and replace escaped pipes (\|) with literal '|'
  for (let i = 0; i < segments.length; i++) {
    segments[i] = segments[i].trim().replace(gD.slashPipe, "|");
  }

  return segments;
}

module.exports = splitUnescapedPipes;