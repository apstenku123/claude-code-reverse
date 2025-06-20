/**
 * Splits a pipe-delimited string expression into an array of trimmed segments, handling escaped pipes and optional segment count.
 *
 * @param {string} inputString - The pipe-delimited string to split (may contain escaped pipes).
 * @param {number} [segmentCount] - Optional. If provided, ensures the result has exactly this many segments (truncates or pads with empty strings).
 * @returns {string[]} An array of trimmed string segments, with escaped pipes handled correctly.
 */
function splitPipeExpression(inputString, segmentCount) {
  // Replace unescaped pipes with ' |', leave escaped pipes as '|'
  const replacedPipes = inputString.replace(gD.findPipe, (match, backslashesCount, fullString) => {
    let isEscaped = false;
    let index = backslashesCount;
    // Count preceding backslashes to determine if the pipe is escaped
    while (--index >= 0 && fullString[index] === "\\") {
      isEscaped = !isEscaped;
    }
    // If escaped, return just the pipe; otherwise, add a space before the pipe
    return isEscaped ? "|" : " |";
  });

  // Split on unescaped pipes
  let segments = replacedPipes.split(gD.splitPipe);

  // Remove leading empty segment if present
  if (!segments[0].trim()) {
    segments.shift();
  }

  // Remove trailing empty segment if present
  if (segments.length > 0 && !segments.at(-1)?.trim()) {
    segments.pop();
  }

  // If segmentCount is specified, adjust the array length accordingly
  if (segmentCount) {
    if (segments.length > segmentCount) {
      segments.splice(segmentCount);
    } else {
      while (segments.length < segmentCount) {
        segments.push("");
      }
    }
  }

  // Trim each segment and replace escaped pipes with real pipes
  for (let i = 0; i < segments.length; i++) {
    segments[i] = segments[i].trim().replace(gD.slashPipe, "|");
  }

  return segments;
}

module.exports = splitPipeExpression;