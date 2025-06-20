/**
 * Factory function to create a JSON scanner/tokenizer for parsing JSON-like text.
 * Provides methods to scan and retrieve tokens, their values, positions, and errors.
 *
 * @param {string} text - The JSON-like string to scan.
 * @param {boolean} [ignoreTrivia=false] - If true, skips trivia tokens (whitespace/comments) during scanning.
 * @returns {object} Scanner API with methods for scanning and retrieving token information.
 */
function createJsonScanner(text, ignoreTrivia = false) {
  const textLength = text.length;
  let position = 0;
  let tokenValue = "";
  let tokenOffset = 0;
  let tokenType = 16; // Default: Unknown
  let currentLine = 0;
  let tokenStartLine = 0;
  let tokenStartCharacter = 0;
  let lastLineStart = 0;
  let tokenError = 0;

  /**
   * Reads a hexadecimal number of given length from the current position.
   * @param {number} length - Number of hex digits to read.
   * @param {boolean} mustHaveLength - If true, must read exactly 'length' digits.
   * @returns {number} Parsed number, or -1 if invalid.
   */
  function readHexDigits(length, mustHaveLength) {
    let read = 0;
    let value = 0;
    while (read < length || !mustHaveLength) {
      const charCode = text.charCodeAt(position);
      if (charCode >= 48 && charCode <= 57) { // 0-9
        value = value * 16 + charCode - 48;
      } else if (charCode >= 65 && charCode <= 70) { // a-F
        value = value * 16 + charCode - 65 + 10;
      } else if (charCode >= 97 && charCode <= 102) { // a-f
        value = value * 16 + charCode - 97 + 10;
      } else {
        break;
      }
      position++;
      read++;
    }
    if (read < length) value = -1;
    return value;
  }

  /**
   * Sets the scanner'createInteractionAccessor position and resets token state.
   * @param {number} newPosition - The new position in the text.
   */
  function setPosition(newPosition) {
    position = newPosition;
    tokenValue = "";
    tokenOffset = 0;
    tokenType = 16;
    tokenError = 0;
  }

  /**
   * Scans a number token from the current position.
   * @returns {string} The scanned number as a string.
   */
  function scanNumber() {
    const start = position;
    if (text.charCodeAt(position) === 48) {
      position++;
    } else {
      position++;
      while (position < text.length && isDigit(text.charCodeAt(position))) {
        position++;
      }
    }
    // Fractional part
    if (position < text.length && text.charCodeAt(position) === 46) {
      position++;
      if (position < text.length && isDigit(text.charCodeAt(position))) {
        position++;
        while (position < text.length && isDigit(text.charCodeAt(position))) {
          position++;
        }
      } else {
        tokenError = 3; // Invalid number
        return text.substring(start, position);
      }
    }
    let end = position;
    // Exponent part
    if (position < text.length && (text.charCodeAt(position) === 69 || text.charCodeAt(position) === 101)) {
      position++;
      if (position < text.length && (text.charCodeAt(position) === 43 || text.charCodeAt(position) === 45)) {
        position++;
      }
      if (position < text.length && isDigit(text.charCodeAt(position))) {
        position++;
        while (position < text.length && isDigit(text.charCodeAt(position))) {
          position++;
        }
        end = position;
      } else {
        tokenError = 3;
      }
    }
    return text.substring(start, end);
  }

  /**
   * Scans a string token from the current position, handling escapes.
   * @returns {string} The scanned string value.
   */
  function scanString() {
    let result = "";
    let start = position;
    while (true) {
      if (position >= textLength) {
        result += text.substring(start, position);
        tokenError = 2; // Unexpected end of string
        break;
      }
      const charCode = text.charCodeAt(position);
      if (charCode === 34) { // '"'
        result += text.substring(start, position);
        position++;
        break;
      }
      if (charCode === 92) { // '\'
        result += text.substring(start, position);
        position++;
        if (position >= textLength) {
          tokenError = 2;
          break;
        }
        switch (text.charCodeAt(position++)) {
          case 34: result += '"'; break;
          case 92: result += '\\'; break;
          case 47: result += '/'; break;
          case 98: result += '\b'; break;
          case 102: result += '\f'; break;
          case 110: result += '\n'; break;
          case 114: result += '\r'; break;
          case 116: result += '\processRuleBeginHandlers'; break;
          case 117: {
            const hex = readHexDigits(4, true);
            if (hex >= 0) {
              result += String.fromCharCode(hex);
            } else {
              tokenError = 4; // Invalid unicode escape
            }
            break;
          }
          default:
            tokenError = 5; // Invalid escape
        }
        start = position;
        continue;
      }
      if (charCode >= 0 && charCode <= 31) {
        if (isLineBreak(charCode)) {
          result += text.substring(start, position);
          tokenError = 2;
          break;
        } else {
          tokenError = 6; // Invalid control character
        }
      }
      position++;
    }
    return result;
  }

  /**
   * Scans the next token from the text.
   * @returns {number} The token type.
   */
  function scanNextToken() {
    tokenValue = "";
    tokenError = 0;
    tokenOffset = position;
    tokenStartLine = currentLine;
    lastLineStart = tokenStartCharacter;
    if (position >= textLength) {
      tokenOffset = textLength;
      tokenType = 17; // EndOfFile
      return tokenType;
    }
    let charCode = text.charCodeAt(position);
    // Whitespace
    if (isWhitespace(charCode)) {
      do {
        position++;
        tokenValue += String.fromCharCode(charCode);
        charCode = text.charCodeAt(position);
      } while (isWhitespace(charCode));
      tokenType = 15; // Trivia
      return tokenType;
    }
    // Line break
    if (isLineBreak(charCode)) {
      position++;
      tokenValue += String.fromCharCode(charCode);
      if (charCode === 13 && text.charCodeAt(position) === 10) {
        position++;
        tokenValue += '\n';
      }
      currentLine++;
      tokenStartCharacter = position;
      tokenType = 14; // LineBreakTrivia
      return tokenType;
    }
    switch (charCode) {
      case 123: // '{'
        position++;
        tokenType = 1;
        return tokenType;
      case 125: // '}'
        position++;
        tokenType = 2;
        return tokenType;
      case 91: // '['
        position++;
        tokenType = 3;
        return tokenType;
      case 93: // ']'
        position++;
        tokenType = 4;
        return tokenType;
      case 58: // ':'
        position++;
        tokenType = 6;
        return tokenType;
      case 44: // ','
        position++;
        tokenType = 5;
        return tokenType;
      case 34: // '"'
        position++;
        tokenValue = scanString();
        tokenType = 10;
        return tokenType;
      case 47: { // '/'
        const commentStart = position - 1;
        if (text.charCodeAt(position + 1) === 47) { // Single-line comment
          position += 2;
          while (position < textLength) {
            if (isLineBreak(text.charCodeAt(position))) break;
            position++;
          }
          tokenValue = text.substring(commentStart, position);
          tokenType = 12;
          return tokenType;
        }
        if (text.charCodeAt(position + 1) === 42) { // Multi-line comment
          position += 2;
          const end = textLength - 1;
          let closed = false;
          while (position < end) {
            const code = text.charCodeAt(position);
            if (code === 42 && text.charCodeAt(position + 1) === 47) {
              position += 2;
              closed = true;
              break;
            }
            if (isLineBreak(code)) {
              if (code === 13 && text.charCodeAt(position + 1) === 10) position++;
              currentLine++;
              tokenStartCharacter = position;
            }
            position++;
          }
          if (!closed) {
            position++;
            tokenError = 1; // Unterminated comment
          }
          tokenValue = text.substring(commentStart, position);
          tokenType = 13;
          return tokenType;
        }
        tokenValue += String.fromCharCode(charCode);
        position++;
        tokenType = 16;
        return tokenType;
      }
      case 45: // '-'
        tokenValue += String.fromCharCode(charCode);
        position++;
        if (position === textLength || !isDigit(text.charCodeAt(position))) {
          tokenType = 16;
          return tokenType;
        }
        // fallthrough to number
      case 48: case 49: case 50: case 51: case 52:
      case 53: case 54: case 55: case 56: case 57:
        tokenValue += scanNumber();
        tokenType = 11;
        return tokenType;
      default:
        // Identifier (true, false, null, or unknown)
        while (position < textLength && isIdentifierChar(charCode)) {
          position++;
          charCode = text.charCodeAt(position);
        }
        if (tokenOffset !== position) {
          tokenValue = text.substring(tokenOffset, position);
          switch (tokenValue) {
            case "true": tokenType = 8; return tokenType;
            case "false": tokenType = 9; return tokenType;
            case "null": tokenType = 7; return tokenType;
          }
          tokenType = 16;
          return tokenType;
        }
        tokenValue += String.fromCharCode(charCode);
        position++;
        tokenType = 16;
        return tokenType;
    }
  }

  /**
   * Returns true if the code is a whitespace character.
   * @param {number} code
   * @returns {boolean}
   */
  function isWhitespace(code) {
    // rO1 in original
    return code === 32 || code === 9 || code === 11 || code === 12;
  }

  /**
   * Returns true if the code is a line break character.
   * @param {number} code
   * @returns {boolean}
   */
  function isLineBreak(code) {
    // isCarriageReturnOrLineFeed in original
    return code === 10 || code === 13;
  }

  /**
   * Returns true if the code is a digit (0-9).
   * @param {number} code
   * @returns {boolean}
   */
  function isDigit(code) {
    // isAsciiDigitCode in original
    return code >= 48 && code <= 57;
  }

  /**
   * Returns true if the code is a valid identifier character for JSON (not a delimiter, whitespace, or line break).
   * @param {number} code
   * @returns {boolean}
   */
  function isIdentifierChar(code) {
    // q in original
    if (isWhitespace(code) || isLineBreak(code)) return false;
    switch (code) {
      case 125: case 93: case 123: case 91: case 34: case 58: case 44: case 47:
        return false;
    }
    return true;
  }

  /**
   * Skips trivia tokens (whitespace/comments) and returns the next non-trivia token.
   * @returns {number} The token type.
   */
  function scanSkipTrivia() {
    let type;
    do {
      type = scanNextToken();
    } while (type >= 12 && type <= 15); // Comments and trivia
    return type;
  }

  // Scanner API
  return {
    setPosition,
    getPosition: () => position,
    scan: ignoreTrivia ? scanSkipTrivia : scanNextToken,
    getToken: () => tokenType,
    getTokenValue: () => tokenValue,
    getTokenOffset: () => tokenOffset,
    getTokenLength: () => position - tokenOffset,
    getTokenStartLine: () => tokenStartLine,
    getTokenStartCharacter: () => tokenOffset - lastLineStart,
    getTokenError: () => tokenError
  };
}

module.exports = createJsonScanner;