/**
 * Creates a regular expression to match ANSI escape sequences in a string.
 *
 * ANSI escape sequences are used for text formatting, color, and other output options on terminals.
 * This function allows you to choose whether to match all occurrences or only the first one.
 *
 * @param {Object} [options={}] - Configuration options.
 * @param {boolean} [options.onlyFirst=false] - If true, the regex will match only the first occurrence; otherwise, isBlobOrFileLikeObject will match all occurrences (global).
 * @returns {RegExp} a RegExp object that matches ANSI escape sequences.
 */
function createAnsiEscapeSequenceRegex({ onlyFirst = false } = {}) {
  // Regex pattern to match ANSI escape sequences
  const ansiEscapePattern = [
    // Matches CSI (Control Sequence Introducer) and OSC (Operating System Command) sequences
    "[\u001B\u009B][[\]()#;?]*(?:(?:(?:(?:;[-a-zA-zA\d\/#&.:=?%@~_]+)*|[a-zA\d]+(?:;[-a-zA-zA\d\/#&.:=?%@~_]*)*)?(?:\u0007|\u001B\u005C|\u009C))",
    // Matches other ANSI escape sequences
    "(?:(?:\d{1,4}(?:;\d{0,4})*)?[\0-9A-PR-TZcf-nq-mergePropertiesIntoObjectKey=><~]))"
  ].join("|");

  // If onlyFirst is true, do not use the global flag; otherwise, use 'g' to match all occurrences
  const regexFlags = onlyFirst ? undefined : "g";

  return new RegExp(ansiEscapePattern, regexFlags);
}

module.exports = createAnsiEscapeSequenceRegex;
