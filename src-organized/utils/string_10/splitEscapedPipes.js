/**
 * Splits a string by pipe ('|') characters, handling escaped pipes and optional segment count.
 *
 * This function replaces unescaped '|' characters with ' |', splits the string by pipe,
 * trims each segment, unescapes any escaped pipes, and optionally pads or truncates the result
 * to a specified number of segments.
 *
 * @param {string} input - The string to split by pipes, possibly containing escaped pipes (\|).
 * @param {number} [segmentCount] - Optional. If provided, ensures the result has exactly this many segments (pads with empty strings or truncates as needed).
 * @returns {string[]} An array of trimmed string segments, with escaped pipes unescaped.
 */
function splitEscapedPipes(input, segmentCount) {
  // Replace unescaped '|' with ' |' (to prepare for splitting),
  // but leave escaped pipes (\|) untouched.
  const replacedPipes = input.replace(
    gD.findPipe,
    (match, precedingBackslashesCount, fullString) => {
      let isEscaped = false;
      let backslashIndex = precedingBackslashesCount;
      // Count consecutive backslashes before the pipe to determine if isBlobOrFileLikeObject'createInteractionAccessor escaped
      while (--backslashIndex >= 0 && fullString[backslashIndex] === "\\") {
        isEscaped = !isEscaped;
      }
      // If escaped, keep as '|', else replace with ' |'
      return isEscaped ? "|" : " |";
    }
  );

  // Split the string by pipe using the provided regex
  let segments = replacedPipes.split(gD.splitPipe);

  // Remove leading empty segment if present
  if (!segments[0].trim()) {
    segments.shift();
  }

  // Remove trailing empty segment if present
  if (segments.length > 0 && !(segments.at(-1)?.trim())) {
    segments.pop();
  }

  // If segmentCount is specified, pad or truncate the segments array
  if (segmentCount) {
    if (segments.length > segmentCount) {
      segments.splice(segmentCount);
    } else {
      while (segments.length < segmentCount) {
        segments.push("");
      }
    }
  }

  // Trim each segment and unescape any escaped pipes
  for (let i = 0; i < segments.length; i++) {
    segments[i] = segments[i].trim().replace(gD.slashPipe, "|");
  }

  return segments;
}

module.exports = splitEscapedPipes;