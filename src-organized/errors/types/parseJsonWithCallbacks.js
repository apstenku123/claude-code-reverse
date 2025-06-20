/**
 * Parses JSON-like input using a token scanner and invokes user-provided callbacks at various parsing events.
 * Handles objects, arrays, literals, comments, errors, and supports options for comments and trailing commas.
 *
 * @param {string} jsonText - The JSON string to parse.
 * @param {Object} callbacks - Callback functions for parsing events (object/array begin/end, property, literal, etc).
 * @param {Object} [options=$i.DEFAULT] - Parsing options (e.g., disallowComments, allowTrailingComma, allowEmptyContent).
 * @returns {boolean} True if parsing was successful, false otherwise.
 */
function parseJsonWithCallbacks(jsonText, callbacks, options = $i.DEFAULT) {
  const scanner = createJsonScanner(jsonText, false);
  const propertyStack = [];

  // Helper to wrap onObjectEnd, onArrayEnd, onComment callbacks
  function wrapSimpleCallback(callback) {
    return callback
      ? () => callback(
          scanner.getTokenOffset(),
          scanner.getTokenLength(),
          scanner.getTokenStartLine(),
          scanner.getTokenStartCharacter()
        )
      : () => true;
  }

  // Helper to wrap onObjectBegin, onArrayBegin callbacks
  function wrapBeginCallback(callback) {
    return callback
      ? () =>
          callback(
            scanner.getTokenOffset(),
            scanner.getTokenLength(),
            scanner.getTokenStartLine(),
            scanner.getTokenStartCharacter(),
            () => propertyStack.slice()
          )
      : () => true;
  }

  // Helper to wrap onSeparator, onError callbacks
  function wrapTokenCallback(callback) {
    return callback
      ? (tokenValue) =>
          callback(
            tokenValue,
            scanner.getTokenOffset(),
            scanner.getTokenLength(),
            scanner.getTokenStartLine(),
            scanner.getTokenStartCharacter()
          )
      : () => true;
  }

  // Helper to wrap onObjectProperty, onLiteralValue callbacks
  function wrapValueCallback(callback) {
    return callback
      ? (tokenValue) =>
          callback(
            tokenValue,
            scanner.getTokenOffset(),
            scanner.getTokenLength(),
            scanner.getTokenStartLine(),
            scanner.getTokenStartCharacter(),
            () => propertyStack.slice()
          )
      : () => true;
  }

  // Prepare all event handlers
  const onObjectBegin = wrapBeginCallback(callbacks.onObjectBegin);
  const onObjectProperty = wrapValueCallback(callbacks.onObjectProperty);
  const onObjectEnd = wrapSimpleCallback(callbacks.onObjectEnd);
  const onArrayBegin = wrapBeginCallback(callbacks.onArrayBegin);
  const onArrayEnd = wrapSimpleCallback(callbacks.onArrayEnd);
  const onLiteralValue = wrapValueCallback(callbacks.onLiteralValue);
  const onSeparator = wrapTokenCallback(callbacks.onSeparator);
  const onComment = wrapSimpleCallback(callbacks.onComment);
  const onError = wrapTokenCallback(callbacks.onError);

  const disallowComments = options && options.disallowComments;
  const allowTrailingComma = options && options.allowTrailingComma;

  /**
   * Scan tokens and handle errors/comments until a value token is found.
   * Returns the next value token type.
   */
  function scanNextTokenSkippingTrivia() {
    while (true) {
      const tokenType = scanner.scan();
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
      switch (tokenType) {
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
          return tokenType;
      }
    }
  }

  /**
   * Handle errors and optionally skip tokens until a recovery token is found.
   * @param {number} errorCode - Error code to report
   * @param {number[]} recoveryTokens - Tokens to recover on
   * @param {number[]} breakTokens - Tokens to break on
   */
  function handleError(errorCode, recoveryTokens = [], breakTokens = []) {
    onError(errorCode);
    if (recoveryTokens.length + breakTokens.length > 0) {
      let token = scanner.getToken();
      while (token !== 17) { // 17: EOF
        if (recoveryTokens.indexOf(token) !== -1) {
          scanNextTokenSkippingTrivia();
          break;
        } else if (breakTokens.indexOf(token) !== -1) {
          break;
        }
        token = scanNextTokenSkippingTrivia();
      }
    }
  }

  /**
   * Handle a property name or array element value.
   * @param {boolean} isArrayElement - True if value is array element, false if object property
   * @returns {boolean}
   */
  function handleValue(isArrayElement) {
    const tokenValue = scanner.getTokenValue();
    if (isArrayElement) {
      onLiteralValue(tokenValue);
    } else {
      onObjectProperty(tokenValue);
      propertyStack.push(tokenValue);
    }
    scanNextTokenSkippingTrivia();
    return true;
  }

  /**
   * Handle literal values: number, null, true, false
   * @returns {boolean}
   */
  function handleLiteral() {
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
    scanNextTokenSkippingTrivia();
    return true;
  }

  /**
   * Handle an object property assignment.
   * @returns {boolean}
   */
  function handleObjectProperty() {
    if (scanner.getToken() !== 10) { // StringLiteral
      handleError(3, [], [2, 5]);
      return false;
    }
    if (handleValue(false), scanner.getToken() === 6) { // ColonToken
      onSeparator(":");
      scanNextTokenSkippingTrivia();
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
   * Handle parsing of an object.
   * @returns {boolean}
   */
  function parseObject() {
    onObjectBegin();
    scanNextTokenSkippingTrivia();
    let seenProperty = false;
    while (scanner.getToken() !== 2 && scanner.getToken() !== 17) { // CloseBraceToken, EOF
      if (scanner.getToken() === 5) { // CommaToken
        if (!seenProperty) handleError(4, [], []);
        onSeparator(",");
        scanNextTokenSkippingTrivia();
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
      scanNextTokenSkippingTrivia();
    }
    return true;
  }

  /**
   * Handle parsing of an array.
   * @returns {boolean}
   */
  function parseArray() {
    onArrayBegin();
    scanNextTokenSkippingTrivia();
    let isFirstElement = true;
    let seenElement = false;
    while (scanner.getToken() !== 4 && scanner.getToken() !== 17) { // CloseBracketToken, EOF
      if (scanner.getToken() === 5) { // CommaToken
        if (!seenElement) handleError(4, [], []);
        onSeparator(",");
        scanNextTokenSkippingTrivia();
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
      scanNextTokenSkippingTrivia();
    }
    return true;
  }

  /**
   * Parse a value: object, array, string, or literal.
   * @returns {boolean}
   */
  function parseValue() {
    switch (scanner.getToken()) {
      case 3: // OpenBracketToken
        return parseArray();
      case 1: // OpenBraceToken
        return parseObject();
      case 10: // StringLiteral
        return handleValue(true);
      default:
        return handleLiteral();
    }
  }

  // Start parsing
  scanNextTokenSkippingTrivia();
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

module.exports = parseJsonWithCallbacks;
