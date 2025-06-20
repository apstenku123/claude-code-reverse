/**
 * Parses a JSON-like structure from a token stream, invoking user-provided callbacks at key parsing events.
 * Handles objects, arrays, literals, separators, comments, and errors, with support for custom options.
 * 
 * @param {object} tokenSource - The source to be parsed, typically a token stream or tokenizer instance.
 * @param {object} callbacks - An object containing callback functions for various parsing events.
 * @param {object} [options=$i.DEFAULT] - Optional parsing options (e.g., disallowComments, allowTrailingComma, allowEmptyContent).
 * @returns {boolean} True if parsing was successful, false otherwise.
 */
function parseJsonWithCallbacks(tokenSource, callbacks, options = $i.DEFAULT) {
  const tokenizer = createJsonScanner(tokenSource, false);
  const propertyStack = [];

  // Helper to wrap callbacks for events that don'processRuleBeginHandlers take arguments
  function wrapSimpleCallback(callback) {
    return callback
      ? () => callback(
          tokenizer.getTokenOffset(),
          tokenizer.getTokenLength(),
          tokenizer.getTokenStartLine(),
          tokenizer.getTokenStartCharacter()
        )
      : () => true;
  }

  // Helper to wrap callbacks for events that take the property stack
  function wrapStackCallback(callback) {
    return callback
      ? () =>
          callback(
            tokenizer.getTokenOffset(),
            tokenizer.getTokenLength(),
            tokenizer.getTokenStartLine(),
            tokenizer.getTokenStartCharacter(),
            () => propertyStack.slice()
          )
      : () => true;
  }

  // Helper to wrap callbacks for events that take a value
  function wrapValueCallback(callback) {
    return callback
      ? value =>
          callback(
            value,
            tokenizer.getTokenOffset(),
            tokenizer.getTokenLength(),
            tokenizer.getTokenStartLine(),
            tokenizer.getTokenStartCharacter()
          )
      : () => true;
  }

  // Helper to wrap callbacks for events that take a value and the property stack
  function wrapValueStackCallback(callback) {
    return callback
      ? value =>
          callback(
            value,
            tokenizer.getTokenOffset(),
            tokenizer.getTokenLength(),
            tokenizer.getTokenStartLine(),
            tokenizer.getTokenStartCharacter(),
            () => propertyStack.slice()
          )
      : () => true;
  }

  // Prepare all event callbacks
  const onObjectBegin = wrapStackCallback(callbacks.onObjectBegin);
  const onObjectProperty = wrapValueStackCallback(callbacks.onObjectProperty);
  const onObjectEnd = wrapSimpleCallback(callbacks.onObjectEnd);
  const onArrayBegin = wrapStackCallback(callbacks.onArrayBegin);
  const onArrayEnd = wrapSimpleCallback(callbacks.onArrayEnd);
  const onLiteralValue = wrapValueStackCallback(callbacks.onLiteralValue);
  const onSeparator = wrapValueCallback(callbacks.onSeparator);
  const onComment = wrapSimpleCallback(callbacks.onComment);
  const onError = wrapValueCallback(callbacks.onError);

  const disallowComments = options && options.disallowComments;
  const allowTrailingComma = options && options.allowTrailingComma;

  /**
   * Advances the tokenizer to the next significant token, handling errors and comments as needed.
   * @returns {number} The next token type.
   */
  function advanceToNextToken() {
    while (true) {
      const tokenType = tokenizer.scan();
      // Handle token errors
      switch (tokenizer.getTokenError()) {
        case 4:
          handleError(14);
          break;
        case 5:
          handleError(15);
          break;
        case 3:
          handleError(13);
          break;
        case 1:
          if (!disallowComments) handleError(11);
          break;
        case 2:
          handleError(12);
          break;
        case 6:
          handleError(16);
          break;
      }
      // Handle token types
      switch (tokenType) {
        case 12: // Line comment
        case 13: // Block comment
          if (disallowComments) {
            handleError(10);
          } else {
            onComment();
          }
          break;
        case 16: // Unknown token
          handleError(1);
          break;
        case 15: // EOF
        case 14: // Unknown
          break;
        default:
          return tokenType;
      }
    }
  }

  /**
   * Handles errors by invoking the error callback and optionally skipping tokens until recovery.
   * @param {number} errorCode - The error code to report.
   * @param {number[]} [recoverTo=[]] - Token types to recover to (inclusive).
   * @param {number[]} [stopAt=[]] - Token types to stop at (exclusive).
   */
  function handleError(errorCode, recoverTo = [], stopAt = []) {
    onError(errorCode);
    if (recoverTo.length + stopAt.length > 0) {
      let currentToken = tokenizer.getToken();
      while (currentToken !== 17) { // 17 = EOF
        if (recoverTo.indexOf(currentToken) !== -1) {
          advanceToNextToken();
          break;
        } else if (stopAt.indexOf(currentToken) !== -1) {
          break;
        }
        currentToken = advanceToNextToken();
      }
    }
  }

  /**
   * Handles a property name or array element value.
   * @param {boolean} isArrayElement - True if handling an array element, false if object property.
   * @returns {boolean} True if successful.
   */
  function handlePropertyOrElement(isArrayElement) {
    const value = tokenizer.getTokenValue();
    if (isArrayElement) {
      onLiteralValue(value);
    } else {
      onObjectProperty(value);
      propertyStack.push(value);
    }
    advanceToNextToken();
    return true;
  }

  /**
   * Handles a literal value (number, null, true, false).
   * @returns {boolean} True if successful, false otherwise.
   */
  function handleLiteral() {
    switch (tokenizer.getToken()) {
      case 11: { // Number
        const rawValue = tokenizer.getTokenValue();
        let numberValue = Number(rawValue);
        if (isNaN(numberValue)) {
          handleError(2);
          numberValue = 0;
        }
        onLiteralValue(numberValue);
        break;
      }
      case 7: // null
        onLiteralValue(null);
        break;
      case 8: // true
        onLiteralValue(true);
        break;
      case 9: // false
        onLiteralValue(false);
        break;
      default:
        return false;
    }
    advanceToNextToken();
    return true;
  }

  /**
   * Handles an object property (key-value pair).
   * @returns {boolean} True if successful, false otherwise.
   */
  function handleObjectProperty() {
    if (tokenizer.getToken() !== 10) { // 10 = string (property name)
      handleError(3, [], [2, 5]);
      return false;
    }
    // Handle property name
    if (!handlePropertyOrElement(false)) {
      handleError(4, [], [2, 5]);
      return false;
    }
    // Expect colon
    if (tokenizer.getToken() === 6) {
      onSeparator(":");
      advanceToNextToken();
      if (!parseValue()) {
        handleError(4, [], [2, 5]);
      }
    } else {
      handleError(5, [], [2, 5]);
    }
    propertyStack.pop();
    return true;
  }

  /**
   * Handles parsing of an object.
   * @returns {boolean} True if successful.
   */
  function parseObject() {
    onObjectBegin();
    advanceToNextToken();
    let seenProperty = false;
    while (tokenizer.getToken() !== 2 && tokenizer.getToken() !== 17) { // 2 = '}', 17 = EOF
      if (tokenizer.getToken() === 5) { // 5 = ','
        if (!seenProperty) handleError(4, [], []);
        onSeparator(",");
        advanceToNextToken();
        if (tokenizer.getToken() === 2 && allowTrailingComma) break;
      } else if (seenProperty) {
        handleError(6, [], []);
      }
      if (!handleObjectProperty()) {
        handleError(4, [], [2, 5]);
      }
      seenProperty = true;
    }
    onObjectEnd();
    if (tokenizer.getToken() !== 2) {
      handleError(7, [2], []);
    } else {
      advanceToNextToken();
    }
    return true;
  }

  /**
   * Handles parsing of an array.
   * @returns {boolean} True if successful.
   */
  function parseArray() {
    onArrayBegin();
    advanceToNextToken();
    let isFirstElement = true;
    let seenElement = false;
    while (tokenizer.getToken() !== 4 && tokenizer.getToken() !== 17) { // 4 = ']', 17 = EOF
      if (tokenizer.getToken() === 5) { // 5 = ','
        if (!seenElement) handleError(4, [], []);
        onSeparator(",");
        advanceToNextToken();
        if (tokenizer.getToken() === 4 && allowTrailingComma) break;
      } else if (seenElement) {
        handleError(6, [], []);
      }
      if (isFirstElement) {
        propertyStack.push(0);
        isFirstElement = false;
      } else {
        propertyStack[propertyStack.length - 1]++;
      }
      if (!parseValue()) {
        handleError(4, [], [4, 5]);
      }
      seenElement = true;
    }
    onArrayEnd();
    if (!isFirstElement) propertyStack.pop();
    if (tokenizer.getToken() !== 4) {
      handleError(8, [4], []);
    } else {
      advanceToNextToken();
    }
    return true;
  }

  /**
   * Parses a value (object, array, string, or literal).
   * @returns {boolean} True if successful, false otherwise.
   */
  function parseValue() {
    switch (tokenizer.getToken()) {
      case 3: // [
        return parseArray();
      case 1: // {
        return parseObject();
      case 10: // string
        return handlePropertyOrElement(true);
      default:
        return handleLiteral();
    }
  }

  // Main parsing logic
  advanceToNextToken();
  if (tokenizer.getToken() === 17) { // 17 = EOF
    if (options.allowEmptyContent) return true;
    handleError(4, [], []);
    return false;
  }
  if (!parseValue()) {
    handleError(4, [], []);
    return false;
  }
  if (tokenizer.getToken() !== 17) {
    handleError(9, [], []);
  }
  return true;
}

module.exports = parseJsonWithCallbacks;