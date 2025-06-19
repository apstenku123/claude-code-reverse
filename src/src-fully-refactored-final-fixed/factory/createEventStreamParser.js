/**
 * Factory function to create an event stream parser for Server-Sent Events (SSE).
 *
 * @param {Object} callbacks - An object containing callback functions for handling events.
 * @param {Function} [callbacks.onEvent=rc1] - Called when a complete event is parsed.
 * @param {Function} [callbacks.onError=rc1] - Called when an error occurs during parsing.
 * @param {Function} [callbacks.onRetry=rc1] - Called when a retry field is parsed.
 * @param {Function} [callbacks.onComment] - Called when a comment line is parsed.
 * @returns {Object} An object with `feed` and `reset` methods for feeding data and resetting the parser.
 *
 * @throws {TypeError} If the callbacks parameter is a function instead of an object.
 */
function createEventStreamParser(callbacks) {
  if (typeof callbacks === "function") {
    throw new TypeError("`callbacks` must be an object, got a function instead. Did you mean `{onEvent: fn}`?");
  }

  // Destructure callbacks with defaults
  const {
    onEvent = rc1,
    onError = rc1,
    onRetry = rc1,
    onComment
  } = callbacks;

  let buffer = ""; // Holds incomplete data between feed calls
  let isFirstChunk = true; // Used to strip BOM from the first chunk
  let lastEventId;
  let eventData = "";
  let eventType = "";

  /**
   * Feed a chunk of data into the parser.
   * @param {string} chunk - The incoming data chunk (possibly partial).
   */
  function feed(chunk) {
    // Remove BOM from the first chunk if present
    const normalizedChunk = isFirstChunk ? chunk.replace(/^\xEF\xBB\xBF/, "") : chunk;
    // splitLinesAndRemainder splits the buffer+chunk into [lines, remainder]
    const [lines, remainder] = splitLinesAndRemainder(`${buffer}${normalizedChunk}`);
    for (const line of lines) {
      processLine(line);
    }
    buffer = remainder;
    isFirstChunk = false;
  }

  /**
   * Process a single line from the event stream.
   * @param {string} line - The line to process.
   */
  function processLine(line) {
    if (line === "") {
      // Empty line indicates dispatch of the current event
      dispatchEvent();
      return;
    }
    if (line.startsWith(":")) {
      // Comment line (starts with ': ' or ':')
      if (onComment) {
        onComment(line.slice(line.startsWith(": ") ? 2 : 1));
      }
      return;
    }
    const colonIndex = line.indexOf(":");
    if (colonIndex !== -1) {
      // Field line: field: value
      const field = line.slice(0, colonIndex);
      const valueOffset = line[colonIndex + 1] === " " ? 2 : 1;
      const value = line.slice(colonIndex + valueOffset);
      processField(field, value, line);
      return;
    }
    // Field line with no value
    processField(line, "", line);
  }

  /**
   * Process a field/value pair from a line.
   * @param {string} field - The field name.
   * @param {string} value - The field value.
   * @param {string} originalLine - The original line for error reporting.
   */
  function processField(field, value, originalLine) {
    switch (field) {
      case "event":
        eventType = value;
        break;
      case "data":
        // Data lines are concatenated with a trailing newline
        eventData = `${eventData}${value}\n`;
        break;
      case "id":
        // Ignore id fields containing null characters
        lastEventId = value.includes("\x00") ? undefined : value;
        break;
      case "retry":
        // Retry must be a positive integer
        if (/^\d+$/.test(value)) {
          onRetry(parseInt(value, 10));
        } else {
          onError(new oc1(`Invalid \`retry\` value: "${value}"`, {
            type: "invalid-retry",
            value,
            line: originalLine
          }));
        }
        break;
      default:
        // Unknown field
        onError(new oc1(`Unknown field "${field.length > 20 ? `${field.slice(0, 20)}…` : field}"`, {
          type: "unknown-field",
          field,
          value,
          line: originalLine
        }));
        break;
    }
  }

  /**
   * Dispatch the currently accumulated event, if any.
   */
  function dispatchEvent() {
    if (eventData.length > 0) {
      // Remove trailing newline from eventData if present
      const cleanData = eventData.endsWith("\n") ? eventData.slice(0, -1) : eventData;
      onEvent({
        id: lastEventId,
        event: eventType || undefined,
        data: cleanData
      });
    }
    // Reset event fields for next event
    lastEventId = undefined;
    eventData = "";
    eventType = "";
  }

  /**
   * Reset the parser state.
   * @param {Object} [options] - Optional reset options.
   * @param {boolean} [options.consume] - If true, process any buffered data as a line.
   */
  function reset(options = {}) {
    if (buffer && options.consume) {
      processLine(buffer);
    }
    isFirstChunk = true;
    lastEventId = undefined;
    eventData = "";
    eventType = "";
    buffer = "";
  }

  return {
    feed,
    reset
  };
}

module.exports = createEventStreamParser;