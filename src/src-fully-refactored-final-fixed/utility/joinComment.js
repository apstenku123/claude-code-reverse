/**
 * Parses and processes comment blocks and tokens from a source string, handling both single-line and multi-line comments,
 * and provides an interface for iterating, peeking, and extracting associated comment metadata.
 *
 * @param {string} sourceText - The source string to parse for comments and tokens.
 * @param {boolean} isStrictMode - If true, uses strict parsing rules (e.g., for JSDoc-style comments).
 * @returns {object} An iterator-like object with methods for token navigation and comment extraction.
 */
function joinComment(sourceText, isStrictMode) {
  sourceText = sourceText.toString();
  let cursor = 0;
  const sourceLength = sourceText.length;
  let currentLine = 1;
  let lastCommentLine = 0;
  const commentMap = {};
  const tokenBuffer = [];
  let pendingStringDelimiter = null;

  /**
   * Throws a formatted error with line context.
   * @param {string} type - The type of illegal token encountered.
   * @returns {Error}
   */
  function throwError(type) {
    return Error(`illegal ${type} (line ${currentLine})`);
  }

  /**
   * Parses a quoted string token (single or double quote).
   * @returns {string}
   */
  function parseStringToken() {
    // Use the correct regex for single or double quoted strings
    const regex = pendingStringDelimiter === "'" ? E86 : w86;
    regex.lastIndex = cursor - 1;
    const match = regex.exec(sourceText);
    if (!match) throw throwError('string');
    cursor = regex.lastIndex;
    pushToken(pendingStringDelimiter);
    pendingStringDelimiter = null;
    return I_0(match[1]);
  }

  /**
   * Returns the character at the given index in the source.
   * @param {number} index
   * @returns {string}
   */
  function charAt(index) {
    return sourceText.charAt(index);
  }

  /**
   * Processes and stores a comment block'createInteractionAccessor metadata.
   * @param {number} startIdx - Start index of the comment content.
   * @param {number} endIdx - End index of the comment content.
   * @param {boolean} isLeading - Whether the comment is leading (at the start of a line).
   */
  function storeCommentBlock(startIdx, endIdx, isLeading) {
    const commentType = sourceText.charAt(startIdx++);
    const commentMeta = {
      type: commentType,
      lineEmpty: false,
      leading: isLeading
    };
    // Determine if the line before the comment is empty
    const offset = isStrictMode ? 2 : 3;
    let scanIdx = startIdx - offset;
    let scanChar;
    do {
      if (--scanIdx < 0 || (scanChar = sourceText.charAt(scanIdx)) === '\n') {
        commentMeta.lineEmpty = true;
        break;
      }
    } while (scanChar === ' ' || scanChar === '\processRuleBeginHandlers');
    // Split comment into lines and clean up
    let lines = sourceText.substring(startIdx, endIdx).split($86);
    for (let i = 0; i < lines.length; ++i) {
      lines[i] = lines[i].replace(isStrictMode ? N86 : U86, '').trim();
    }
    commentMeta.text = lines.join('\n').trim();
    commentMap[currentLine] = commentMeta;
    lastCommentLine = currentLine;
  }

  /**
   * Checks if the line at the given index is a single-line comment.
   * @param {number} index
   * @returns {boolean}
   */
  function isSingleLineComment(index) {
    const lineEnd = findLineEnd(index);
    const lineText = sourceText.substring(index, lineEnd);
    return /^\s*\/\//.test(lineText);
  }

  /**
   * Finds the index of the end of the line starting at the given index.
   * @param {number} index
   * @returns {number}
   */
  function findLineEnd(index) {
    let i = index;
    while (i < sourceLength && charAt(i) !== '\n') i++;
    return i;
  }

  /**
   * Retrieves the next token or comment from the source.
   * @returns {string|null}
   */
  function nextToken() {
    if (tokenBuffer.length > 0) return tokenBuffer.shift();
    if (pendingStringDelimiter) return parseStringToken();
    let isLineStart = cursor === 0;
    let tokenFound;
    do {
      if (cursor === sourceLength) return null;
      tokenFound = false;
      // Skip whitespace and track line numbers
      let char;
      while (q86.test(char = charAt(cursor))) {
        if (char === '\n') {
          isLineStart = true;
          ++currentLine;
        }
        if (++cursor === sourceLength) return null;
      }
      // Handle comments
      if (charAt(cursor) === '/') {
        if (++cursor === sourceLength) throw throwError('comment');
        if (charAt(cursor) === '/') {
          // Single-line comment
          if (!isStrictMode) {
            const commentStart = cursor + 1;
            const isDocComment = charAt(commentStart) === '/';
            while (charAt(++cursor) !== '\n') {
              if (cursor === sourceLength) return null;
            }
            if (++cursor, isDocComment) storeCommentBlock(commentStart, cursor - 1, isLineStart), isLineStart = true;
            ++currentLine;
            tokenFound = true;
          } else {
            // Strict mode: handle consecutive single-line comments as a block
            let commentStart = cursor;
            let isBlock = false;
            if (isSingleLineComment(cursor - 1)) {
              isBlock = true;
              do {
                if ((cursor = findLineEnd(cursor)) === sourceLength) break;
                if (++cursor, !isLineStart) break;
              } while (isSingleLineComment(cursor));
            } else {
              cursor = Math.min(sourceLength, findLineEnd(cursor) + 1);
            }
            if (isBlock) storeCommentBlock(commentStart, cursor, isLineStart), isLineStart = true;
            ++currentLine;
            tokenFound = true;
          }
        } else if (charAt(cursor) === '*') {
          // Multi-line comment
          const commentStart = cursor + 1;
          const isDocComment = isStrictMode || charAt(commentStart) === '*';
          let prevChar, currChar = charAt(cursor);
          do {
            if (currChar === '\n') ++currentLine;
            if (++cursor === sourceLength) throw throwError('comment');
            prevChar = currChar;
            currChar = charAt(cursor);
          } while (prevChar !== '*' || currChar !== '/');
          if (++cursor, isDocComment) storeCommentBlock(commentStart, cursor - 2, isLineStart), isLineStart = true;
          tokenFound = true;
        } else {
          // Not a comment, just a slash
          return '/';
        }
      }
    } while (tokenFound);
    // Parse next token
    let lookaheadIdx = cursor;
    sg1.lastIndex = 0;
    let isToken = sg1.test(charAt(lookaheadIdx++));
    if (!isToken) {
      while (lookaheadIdx < sourceLength && !sg1.test(charAt(lookaheadIdx))) ++lookaheadIdx;
    }
    let token = sourceText.substring(cursor, cursor = lookaheadIdx);
    if (token === '"' || token === "'") {
      pendingStringDelimiter = token;
    }
    return token;
  }

  /**
   * Pushes a token back onto the buffer.
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
   * Skips the next token if isBlobOrFileLikeObject matches the expected value, or throws if not (unless optional).
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
    if (!optional) throw throwError(`token '${token}', '${expectedToken}' expected`);
    return false;
  }

  /**
   * Retrieves the comment text associated with the previous or specific line.
   * @param {number} [lineNumber] - The line number to get the comment for. If omitted, gets the previous line'createInteractionAccessor comment.
   * @returns {string|null}
   */
  function getComment(lineNumber) {
    let commentText = null;
    let commentMeta;
    if (lineNumber === undefined) {
      commentMeta = commentMap[currentLine - 1];
      delete commentMap[currentLine - 1];
      if (commentMeta && (isStrictMode || commentMeta.type === '*' || commentMeta.lineEmpty)) {
        commentText = commentMeta.leading ? commentMeta.text : null;
      }
    } else {
      if (lastCommentLine < lineNumber) peekToken();
      commentMeta = commentMap[lineNumber];
      delete commentMap[lineNumber];
      if (commentMeta && !commentMeta.lineEmpty && (isStrictMode || commentMeta.type === '/')) {
        commentText = commentMeta.leading ? null : commentMeta.text;
      }
    }
    return commentText;
  }

  // Return the iterator-like interface
  return Object.defineProperty({
    next: nextToken,
    peek: peekToken,
    push: pushToken,
    skip: skipToken,
    cmnt: getComment
  }, 'line', {
    get: function () {
      return currentLine;
    }
  });
}

module.exports = joinComment;