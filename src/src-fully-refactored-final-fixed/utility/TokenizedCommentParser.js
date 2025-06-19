/**
 * TokenizedCommentParser parses a string input (typically source code or config text) into tokens and extracts comments,
 * supporting both single-line and multi-line comment styles. It tracks line numbers, supports peeking and pushing tokens,
 * and can extract associated comment text. The parser can operate in two modes (controlled by `isStrictMode`) to handle
 * different comment conventions.
 *
 * @param {string} inputText - The text to parse (e.g., source code or config file contents).
 * @param {boolean} isStrictMode - If true, uses strict comment parsing rules (e.g., for documentation extraction).
 * @returns {object} An object with methods for token iteration, peeking, pushing, skipping, and extracting comments.
 */
function TokenizedCommentParser(inputText, isStrictMode) {
  const source = inputText.toString();
  let position = 0; // Current position in source
  const length = source.length;
  let currentLine = 1; // Line number (1-based)
  let lastCommentLine = 0; // Last line number with a comment
  const commentMap = {}; // Map of line number to comment info
  const tokenBuffer = []; // Buffer for pushed tokens
  let pendingStringDelimiter = null; // If inside a string, holds the delimiter (' or ")

  /**
   * Throws a syntax error with context about the current line.
   * @param {string} context
   * @returns {Error}
   */
  function syntaxError(context) {
    return Error(`illegal ${context} (line ${currentLine})`);
  }

  /**
   * Parses a string literal starting at the current position.
   * Handles both single and double quotes.
   * @returns {string}
   */
  function parseStringLiteral() {
    // E86 and w86 are assumed to be regexes for string literals (external dependency)
    const stringRegex = pendingStringDelimiter === "'" ? E86 : w86;
    stringRegex.lastIndex = position - 1;
    const match = stringRegex.exec(source);
    if (!match) throw syntaxError("string");
    position = stringRegex.lastIndex;
    pushToken(pendingStringDelimiter);
    pendingStringDelimiter = null;
    return I_0(match[1]); // I_0 presumably unescapes the string
  }

  /**
   * Returns the character at the given index in the source.
   * @param {number} idx
   * @returns {string}
   */
  function charAt(idx) {
    return source.charAt(idx);
  }

  /**
   * Records a comment in commentMap for the current line.
   * @param {number} startIdx - Start index of comment
   * @param {number} endIdx - End index (exclusive)
   * @param {boolean} isLeading - True if comment is at the start of the line
   */
  function recordComment(startIdx, endIdx, isLeading) {
    const commentType = source.charAt(startIdx++);
    const commentInfo = {
      type: commentType,
      lineEmpty: false,
      leading: isLeading
    };
    // Determine if the line before the comment is empty
    const charsToCheck = isStrictMode ? 2 : 3;
    let checkIdx = startIdx - charsToCheck;
    let prevChar;
    do {
      if (--checkIdx < 0 || (prevChar = source.charAt(checkIdx)) === '\n') {
        commentInfo.lineEmpty = true;
        break;
      }
    } while (prevChar === ' ' || prevChar === '\processRuleBeginHandlers');
    // Split comment into lines and clean up
    const commentLines = source.substring(startIdx, endIdx).split($86); // $86 is assumed to be line separator regex
    for (let i = 0; i < commentLines.length; ++i) {
      commentLines[i] = commentLines[i].replace(isStrictMode ? N86 : U86, "").trim();
    }
    commentInfo.text = commentLines.join('\n').trim();
    commentMap[currentLine] = commentInfo;
    lastCommentLine = currentLine;
  }

  /**
   * Checks if the line at the given index is a single-line comment.
   * @param {number} idx
   * @returns {boolean}
   */
  function isSingleLineComment(idx) {
    const lineEnd = findLineEnd(idx);
    const lineText = source.substring(idx, lineEnd);
    return /^\s*\/\//.test(lineText);
  }

  /**
   * Finds the end index of the line starting at idx.
   * @param {number} idx
   * @returns {number}
   */
  function findLineEnd(idx) {
    let endIdx = idx;
    while (endIdx < length && charAt(endIdx) !== '\n') endIdx++;
    return endIdx;
  }

  /**
   * Retrieves the next token from the source, handling whitespace, comments, and string literals.
   * @returns {string|null}
   */
  function nextToken() {
    // Return from buffer if available
    if (tokenBuffer.length > 0) return tokenBuffer.shift();
    // Handle pending string literal
    if (pendingStringDelimiter) return parseStringLiteral();
    let isLineStart = position === 0;
    let foundToken = false;
    let char, prevChar, commentStart, isDocComment;
    // Skip whitespace and track line numbers
    do {
      if (position === length) return null;
      foundToken = false;
      while (q86.test(char = charAt(position))) { // q86 is whitespace regex
        if (char === '\n') {
          isLineStart = true;
          ++currentLine;
        }
        if (++position === length) return null;
      }
      // Handle comments
      if (charAt(position) === '/') {
        if (++position === length) throw syntaxError("comment");
        if (charAt(position) === '/') {
          // Single-line comment
          if (!isStrictMode) {
            isDocComment = charAt(commentStart = position + 1) === '/';
            while (charAt(++position) !== '\n') {
              if (position === length) return null;
            }
            ++position;
            if (isDocComment) recordComment(commentStart, position - 1, isLineStart);
            isLineStart = true;
            ++currentLine;
            foundToken = true;
          } else {
            // Strict mode: handle consecutive single-line comments
            commentStart = position;
            isDocComment = false;
            if (isSingleLineComment(position - 1)) {
              isDocComment = true;
              do {
                position = findLineEnd(position);
                if (position === length) break;
                ++position;
                if (!isLineStart) break;
              } while (isSingleLineComment(position));
            } else {
              position = Math.min(length, findLineEnd(position) + 1);
            }
            if (isDocComment) recordComment(commentStart, position, isLineStart);
            isLineStart = true;
            ++currentLine;
            foundToken = true;
          }
        } else if ((char = charAt(position)) === '*') {
          // Multi-line comment
          commentStart = position + 1;
          isDocComment = isStrictMode || charAt(commentStart) === '*';
          do {
            if (char === '\n') ++currentLine;
            if (++position === length) throw syntaxError("comment");
            prevChar = char;
            char = charAt(position);
          } while (prevChar !== '*' || char !== '/');
          ++position;
          if (isDocComment) recordComment(commentStart, position - 2, isLineStart);
          isLineStart = true;
          foundToken = true;
        } else {
          // Not a comment, just a slash token
          return '/';
        }
      }
    } while (foundToken);
    // Now, extract the next token (non-whitespace, non-comment)
    let tokenEnd = position;
    sg1.lastIndex = 0; // sg1 is a regex for token boundaries
    let isTokenChar = sg1.test(charAt(tokenEnd++));
    if (!isTokenChar) {
      while (tokenEnd < length && !sg1.test(charAt(tokenEnd))) ++tokenEnd;
    }
    const token = source.substring(position, position = tokenEnd);
    // If token is a string delimiter, set pendingStringDelimiter
    if (token === '"' || token === "'") {
      pendingStringDelimiter = token;
    }
    return token;
  }

  /**
   * Pushes a token back into the buffer.
   * @param {string} token
   */
  function pushToken(token) {
    tokenBuffer.push(token);
  }

  /**
   * Peeks at the next token without consuming isBlobOrFileLikeObject.
   * @returns {string|null}
   */
  function peekToken() {
    if (!tokenBuffer.length) {
      const token = nextToken();
      if (token === null) return null;
      pushToken(token);
    }
    return tokenBuffer[0];
  }

  /**
   * Skips the next token if isBlobOrFileLikeObject matches the expected value.
   * Throws if not matching and required.
   * @param {string} expectedToken
   * @param {boolean} [optional=false]
   * @returns {boolean}
   */
  function skipToken(expectedToken, optional) {
    const token = peekToken();
    const matches = token === expectedToken;
    if (matches) {
      nextToken();
      return true;
    }
    if (!optional) throw syntaxError(`token '${token}', '${expectedToken}' expected`);
    return false;
  }

  /**
   * Retrieves the comment text for the previous or a specific line.
   * @param {number} [lineNumber] - Optional line number
   * @returns {string|null}
   */
  function getComment(lineNumber) {
    let comment = null;
    let commentInfo;
    if (lineNumber === undefined) {
      commentInfo = commentMap[currentLine - 1];
      delete commentMap[currentLine - 1];
      if (commentInfo && (isStrictMode || commentInfo.type === '*' || commentInfo.lineEmpty)) {
        comment = commentInfo.leading ? commentInfo.text : null;
      }
    } else {
      if (lastCommentLine < lineNumber) peekToken();
      commentInfo = commentMap[lineNumber];
      delete commentMap[lineNumber];
      if (commentInfo && !commentInfo.lineEmpty && (isStrictMode || commentInfo.type === '/')) {
        comment = commentInfo.leading ? null : commentInfo.text;
      }
    }
    return comment;
  }

  // Return the parser API
  return Object.defineProperty({
    next: nextToken,
    peek: peekToken,
    push: pushToken,
    skip: skipToken,
    cmnt: getComment
  }, "line", {
    get: function () {
      return currentLine;
    }
  });
}

module.exports = TokenizedCommentParser;