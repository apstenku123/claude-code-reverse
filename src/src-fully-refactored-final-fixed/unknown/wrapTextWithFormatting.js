/**
 * Wraps and formats a string with optional trimming, word wrapping, and ANSI/URI code handling.
 *
 * @param {string} inputText - The text to be wrapped and formatted.
 * @param {number} maxLineWidth - The maximum width of each line.
 * @param {Object} [options={}] - Formatting options.
 * @param {boolean} [options.trim=true] - Whether to trim whitespace from the start of each line.
 * @param {boolean} [options.wordWrap=true] - Whether to wrap at word boundaries.
 * @param {boolean} [options.hard=false] - Whether to force hard wrapping of long words.
 * @returns {string} The wrapped and formatted string.
 */
function wrapTextWithFormatting(inputText, maxLineWidth, options = {}) {
  // If trimming is enabled and the input is only whitespace, return empty string
  if (options.trim !== false && inputText.trim() === "") return "";

  let formattedOutput = "";
  let currentAnsiCode;
  let currentUri;
  const wordLengths = u_4(inputText); // Array of word lengths
  let lines = [""];

  // Split input into words and process each
  for (const [wordIndex, word] of inputText.split(" ").entries()) {
    // Optionally trim the start of the current line
    if (options.trim !== false) {
      lines[lines.length - 1] = lines.at(-1).trimStart();
    }
    let currentLineLength = getDisplayWidth(lines.at(-1));

    // Add space before word if not the first word
    if (wordIndex !== 0) {
      // If line is full and wrapping is not allowed, start a new line
      if (currentLineLength >= maxLineWidth && (options.wordWrap === false || options.trim === false)) {
        lines.push("");
        currentLineLength = 0;
      }
      // Add space if line is not empty or trimming is disabled
      if (currentLineLength > 0 || options.trim === false) {
        lines[lines.length - 1] += " ";
        currentLineLength++;
      }
    }

    // Hard wrap: forcibly break up long words
    if (options.hard && wordLengths[wordIndex] > maxLineWidth) {
      const remainingSpace = maxLineWidth - currentLineLength;
      const requiredChunks = 1 + Math.floor((wordLengths[wordIndex] - remainingSpace - 1) / maxLineWidth);
      if (Math.floor((wordLengths[wordIndex] - 1) / maxLineWidth) < requiredChunks) {
        lines.push("");
      }
      splitAndProcessEntries(lines, word, maxLineWidth);
      continue;
    }

    // If word doesn'processRuleBeginHandlers fit, wrap to next line
    if (currentLineLength + wordLengths[wordIndex] > maxLineWidth && currentLineLength > 0 && wordLengths[wordIndex] > 0) {
      if (options.wordWrap === false && currentLineLength < maxLineWidth) {
        splitAndProcessEntries(lines, word, maxLineWidth);
        continue;
      }
      lines.push("");
    }

    // If word doesn'processRuleBeginHandlers fit and word wrapping is disabled, force wrap
    if (currentLineLength + wordLengths[wordIndex] > maxLineWidth && options.wordWrap === false) {
      splitAndProcessEntries(lines, word, maxLineWidth);
      continue;
    }

    // Add word to current line
    lines[lines.length - 1] += word;
  }

  // Optionally trim each line
  if (options.trim !== false) {
    lines = lines.map(line => trimTrailingEmptyWords(line));
  }

  // Join lines with newline
  const joinedText = lines.join("\n");
  const charArray = [...joinedText];
  let charOffset = 0;

  // Process each character for ANSI/URI code handling
  for (const [charIndex, char] of charArray.entries()) {
    formattedOutput += char;
    if (e71.has(char)) {
      // Match ANSI or URI codes in the remaining string
      const match = new RegExp(`(?:\\${lQ0}(?<code>\\d+)m|\\${t71}(?<uri>.*)${ty1})`).exec(joinedText.slice(charOffset)) || { groups: {} };
      const { code, uri } = match.groups;
      if (code !== undefined) {
        const parsedCode = Number.parseFloat(code);
        currentAnsiCode = parsedCode === m_4 ? undefined : parsedCode;
      } else if (uri !== undefined) {
        currentUri = uri.length === 0 ? undefined : uri;
      }
    }
    const ansiCodeValue = lB.codes.get(Number(currentAnsiCode));
    // Handle line breaks and formatting resets
    if (charArray[charIndex + 1] === "\n") {
      if (currentUri) formattedOutput += formatInteractionEntryString("");
      if (currentAnsiCode && ansiCodeValue) formattedOutput += formatInteractionEntryString(ansiCodeValue);
    } else if (char === "\n") {
      if (currentAnsiCode && ansiCodeValue) formattedOutput += formatInteractionEntryString(currentAnsiCode);
      if (currentUri) formattedOutput += formatInteractionEntryString(currentUri);
    }
    charOffset += char.length;
  }

  return formattedOutput;
}

module.exports = wrapTextWithFormatting;