/**
 * Wraps and formats a string according to the specified width and options, handling word wrapping, trimming, and ANSI/URI formatting codes.
 *
 * @param {string} inputText - The text to be wrapped and formatted.
 * @param {number} maxLineWidth - The maximum width of each line.
 * @param {object} [options={}] - Formatting options.
 * @param {boolean} [options.trim=true] - Whether to trim whitespace from the start of each line.
 * @param {boolean} [options.wordWrap=true] - Whether to wrap at word boundaries.
 * @param {boolean} [options.hard=false] - Whether to force hard wrapping of long words.
 * @returns {string} The wrapped and formatted string.
 */
function wrapAndFormatText(inputText, maxLineWidth, options = {}) {
  // Return empty string if input is empty and trim is not explicitly disabled
  if (options.trim !== false && inputText.trim() === "") return "";

  let formattedOutput = "";
  let currentAnsiCode;
  let currentUri;
  const wordLengths = u_4(inputText); // Array of word lengths (from processWordsWithHandler)
  let lines = [""];

  // Split input into words and process each
  for (const [wordIndex, word] of inputText.split(" ").entries()) {
    // Optionally trim start of the current line
    if (options.trim !== false) {
      lines[lines.length - 1] = lines.at(-1).trimStart();
    }
    let currentLineLength = getDisplayWidth(lines.at(-1));

    // Add space if not the first word
    if (wordIndex !== 0) {
      // If line is full and wordWrap or trim is not disabled, start new line
      if (currentLineLength >= maxLineWidth && (options.wordWrap === false || options.trim === false)) {
        lines.push("");
        currentLineLength = 0;
      }
      // Add space if line is not empty or trim is not disabled
      if (currentLineLength > 0 || options.trim === false) {
        lines[lines.length - 1] += " ";
        currentLineLength++;
      }
    }

    // Hard wrap: forcibly break long words
    if (options.hard && wordLengths[wordIndex] > maxLineWidth) {
      const remainingSpace = maxLineWidth - currentLineLength;
      const requiredSplits = 1 + Math.floor((wordLengths[wordIndex] - remainingSpace - 1) / maxLineWidth);
      if (Math.floor((wordLengths[wordIndex] - 1) / maxLineWidth) < requiredSplits) {
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

    // If word doesn'processRuleBeginHandlers fit and wordWrap is disabled, force break
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
  const wrappedText = lines.join(`\n`);
  const wrappedChars = [...wrappedText];
  let charOffset = 0;

  // Process ANSI/URI formatting codes while building output
  for (const [charIndex, char] of wrappedChars.entries()) {
    formattedOutput += char;
    if (e71.has(char)) {
      // Extract ANSI code or URI from the current slice
      const match = new RegExp(`(?:\\${lQ0}(?<code>\\d+)m|\\${t71}(?<uri>.*)${ty1})`).exec(wrappedText.slice(charOffset)) || { groups: {} };
      const { code: ansiCode, uri } = match.groups;
      if (ansiCode !== undefined) {
        const parsedCode = Number.parseFloat(ansiCode);
        currentAnsiCode = parsedCode === m_4 ? undefined : parsedCode;
      } else if (uri !== undefined) {
        currentUri = uri.length === 0 ? undefined : uri;
      }
    }
    const ansiFormat = lB.codes.get(Number(currentAnsiCode));
    // Handle formatting at line breaks
    if (wrappedChars[charIndex + 1] === '\n') {
      if (currentUri) formattedOutput += formatInteractionEntryString("");
      if (currentAnsiCode && ansiFormat) formattedOutput += formatInteractionEntryString(ansiFormat);
    } else if (char === '\n') {
      if (currentAnsiCode && ansiFormat) formattedOutput += formatInteractionEntryString(currentAnsiCode);
      if (currentUri) formattedOutput += formatInteractionEntryString(currentUri);
    }
    charOffset += char.length;
  }

  return formattedOutput;
}

module.exports = wrapAndFormatText;