/**
 * Parses a JSON-like string using a scanner and invokes event callbacks for each syntactic element.
 * Supports custom event handlers for objects, arrays, literals, separators, comments, and errors.
 *
 * @param {string} jsonText - The JSON string to parse.
 * @param {Object} eventHandlers - An object containing event handler callbacks for various JSON elements.
 * @param {Object} [options=$i.DEFAULT] - Optional parsing options (e.g., disallowComments, allowTrailingComma, allowEmptyContent).
 * @returns {boolean} True if parsing was successful, false otherwise.
 */
function parseJsonWithEvents(jsonText, eventHandlers, options = $i.DEFAULT) {
  const scanner = createJsonScanner(jsonText, false);
  const propertyStack = [];

  // Helper to wrap event handlers for object/array end, comment, etc.
  function wrapSimpleEvent(handler) {
    return handler
      ? () => handler(
          scanner.getTokenOffset(),
          scanner.getTokenLength(),
          scanner.getTokenStartLine(),
          scanner.getTokenStartCharacter()
        )
      : () => true;
  }

  // Helper to wrap event handlers for object/array begin
  function wrapBeginEvent(handler) {
    return handler
      ? () =>
          handler(
            scanner.getTokenOffset(),
            scanner.getTokenLength(),
            scanner.getTokenStartLine(),
            scanner.getTokenStartCharacter(),
            () => propertyStack.slice()
          )
      : () => true;
  }

  // Helper to wrap event handlers for separators and errors
  function wrapValueEvent(handler) {
    return handler
      ? (value) =>
          handler(
            value,
            scanner.getTokenOffset(),
            scanner.getTokenLength(),
            scanner.getTokenStartLine(),
            scanner.getTokenStartCharacter()
          )
      : () => true;
  }

  // Helper to wrap event handlers for properties and literals
  function wrapValueWithStackEvent(handler) {
    return handler
      ? (value) =>
          handler(
            value,
            scanner.getTokenOffset(),
            scanner.getTokenLength(),
            scanner.getTokenStartLine(),
            scanner.getTokenStartCharacter(),
            () => propertyStack.slice()
          )
      : () => true;
  }

  // Event handler wrappers
  const onObjectBegin = wrapBeginEvent(eventHandlers.onObjectBegin);
  const onObjectProperty = wrapValueWithStackEvent(eventHandlers.onObjectProperty);
  const onObjectEnd = wrapSimpleEvent(eventHandlers.onObjectEnd);
  const onArrayBegin = wrapBeginEvent(eventHandlers.onArrayBegin);
  const onArrayEnd = wrapSimpleEvent(eventHandlers.onArrayEnd);
  const onLiteralValue = wrapValueWithStackEvent(eventHandlers.onLiteralValue);
  const onSeparator = wrapValueEvent(eventHandlers.onSeparator);
  const onComment = wrapSimpleEvent(eventHandlers.onComment);
  const onError = wrapValueEvent(eventHandlers.onError);

  const disallowComments = options && options.disallowComments;
  const allowTrailingComma = options && options.allowTrailingComma;

  /**
   * Advances the scanner to the next significant token, handling comments and errors.
   * @returns {number} The next token type.
   */
  function advanceScanner() {
    while (true) {
      const token = scanner.scan();
      switch (scanner.getTokenError()) {
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
      switch (token) {
        case 12: // LineCommentTrivia
        case 13: // BlockCommentTrivia
          if (disallowComments) {
            handleError(10);
          } else {
            onComment();
          }
          break;
        case 16: // Unknown
          handleError(1);
          break;
        case 15: // EOF
        case 14: // Trivia
          break;
        default:
          return token;
      }
    }
  }

  /**
   * Handles parse errors and optionally skips tokens until a recovery point.
   * @param {number} errorCode - The error code to report.
   * @param {number[]} [skipUntilAfter=[]] - Token types to skip until after.
   * @param {number[]} [stopAt=[]] - Token types to stop at.
   */
  function handleError(errorCode, skipUntilAfter = [], stopAt = []) {
    onError(errorCode);
    if (skipUntilAfter.length + stopAt.length > 0) {
      let currentToken = scanner.getToken();
      while (currentToken !== 17) { // 17 = EOF
        if (skipUntilAfter.indexOf(currentToken) !== -1) {
          advanceScanner();
          break;
        } else if (stopAt.indexOf(currentToken) !== -1) {
          break;
        }
        currentToken = advanceScanner();
      }
    }
  }

  /**
   * Handles a property name or literal value.
   * @param {boolean} isLiteral - True if this is a literal value, false if a property name.
   * @returns {boolean}
   */
  function handlePropertyOrLiteral(isLiteral) {
    const tokenValue = scanner.getTokenValue();
    if (isLiteral) {
      onLiteralValue(tokenValue);
    } else {
      onObjectProperty(tokenValue);
      propertyStack.push(tokenValue);
    }
    advanceScanner();
    return true;
  }

  /**
   * Handles a literal value (number, null, true, false).
   * @returns {boolean}
   */
  function handleLiteralValue() {
    switch (scanner.getToken()) {
      case 11: // NumberLiteral
        const rawValue = scanner.getTokenValue();
        let numberValue = Number(rawValue);
        if (isNaN(numberValue)) {
          handleError(2);
          numberValue = 0;
        }
        onLiteralValue(numberValue);
        break;
      case 7: // NullKeyword
        onLiteralValue(null);
        break;
      case 8: // TrueKeyword
        onLiteralValue(true);
        break;
      case 9: // FalseKeyword
        onLiteralValue(false);
        break;
      default:
        return false;
    }
    advanceScanner();
    return true;
  }

  /**
   * Handles an object property (key-value pair).
   * @returns {boolean}
   */
  function handleObjectProperty() {
    if (scanner.getToken() !== 10) { // StringLiteral
      handleError(3, [], [2, 5]);
      return false;
    }
    if (handlePropertyOrLiteral(false), scanner.getToken() === 6) { // ColonToken
      onSeparator(":");
      advanceScanner();
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
   * Handles an object (curly braces).
   * @returns {boolean}
   */
  function handleObject() {
    onObjectBegin();
    advanceScanner();
    let seenProperty = false;
    while (scanner.getToken() !== 2 && scanner.getToken() !== 17) { // CloseBraceToken, EOF
      if (scanner.getToken() === 5) { // CommaToken
        if (!seenProperty) handleError(4, [], []);
        onSeparator(",");
        advanceScanner();
        if (scanner.getToken() === 2 && allowTrailingComma) break;
      } else if (seenProperty) {
        handleError(6, [], []);
      }
      if (!handleObjectProperty()) {
        handleError(4, [], [2, 5]);
      }
      seenProperty = true;
    }
    onObjectEnd();
    if (scanner.getToken() !== 2) {
      handleError(7, [2], []);
    } else {
      advanceScanner();
    }
    return true;
  }

  /**
   * Handles an array (square brackets).
   * @returns {boolean}
   */
  function handleArray() {
    onArrayBegin();
    advanceScanner();
    let isFirstElement = true;
    let seenElement = false;
    while (scanner.getToken() !== 4 && scanner.getToken() !== 17) { // CloseBracketToken, EOF
      if (scanner.getToken() === 5) { // CommaToken
        if (!seenElement) handleError(4, [], []);
        onSeparator(",");
        advanceScanner();
        if (scanner.getToken() === 4 && allowTrailingComma) break;
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
    if (scanner.getToken() !== 4) {
      handleError(8, [4], []);
    } else {
      advanceScanner();
    }
    return true;
  }

  /**
   * Parses a value (object, array, string, literal).
   * @returns {boolean}
   */
  function parseValue() {
    switch (scanner.getToken()) {
      case 3: // OpenBracketToken
        return handleArray();
      case 1: // OpenBraceToken
        return handleObject();
      case 10: // StringLiteral
        return handlePropertyOrLiteral(true);
      default:
        return handleLiteralValue();
    }
  }

  // Initial scan
  advanceScanner();
  if (scanner.getToken() === 17) { // EOF
    if (options.allowEmptyContent) return true;
    handleError(4, [], []);
    return false;
  }
  if (!parseValue()) {
    handleError(4, [], []);
    return false;
  }
  if (scanner.getToken() !== 17) {
    handleError(9, [], []);
  }
  return true;
}

module.exports = parseJsonWithEvents;