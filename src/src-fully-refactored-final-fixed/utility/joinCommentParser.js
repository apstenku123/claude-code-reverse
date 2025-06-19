/**
 * Parses a source string for comments and tokens, providing utilities to iterate, peek, and extract comment metadata.
 * Handles both single-line and multi-line comments, tracks line numbers, and supports configurable parsing modes.
 *
 * @param {string} sourceText - The source text to parse for comments and tokens.
 * @param {boolean} isStrictMode - If true, enables strict parsing mode (affects comment handling).
 * @returns {object} An object with methods to iterate tokens/comments and extract comment metadata.
 */
function joinCommentParser(sourceText, isStrictMode) {
  sourceText = sourceText.toString();
  let currentIndex = 0;
  const sourceLength = sourceText.length;
  let currentLine = 1;
  let lastCommentLine = 0;
  const commentMetadataByLine = {};
  const tokenQueue = [];
  let pendingStringDelimiter = null;

  /**
   * Throws a formatted error for illegal tokens.
   * @param {string} tokenType
   * @returns {Error}
   */
  function throwIllegalToken(tokenType) {
    return Error(`illegal ${tokenType} (line ${currentLine})`);
  }

  /**
   * Parses a quoted string starting at the current index.
   * @returns {string}
   */
  function parseStringToken() {
    // Choose regex based on quote type
    const stringRegex = pendingStringDelimiter === "'" ? E86 : w86;
    stringRegex.lastIndex = currentIndex - 1;
    const match = stringRegex.exec(sourceText);
    if (!match) throw throwIllegalToken('string');
    currentIndex = stringRegex.lastIndex;
    enqueueToken(pendingStringDelimiter);
    pendingStringDelimiter = null;
    return I_0(match[1]);
  }

  /**
   * Returns the character at the given index.
   * @param {number} index
   * @returns {string}
   */
  function charAt(index) {
    return sourceText.charAt(index);
  }

  /**
   * Collects comment metadata for a block or line comment.
   * @param {number} startIdx - Start index of comment text.
   * @param {number} endIdx - End index (exclusive) of comment text.
   * @param {boolean} isLeading - Whether the comment is leading (at line start).
   */
  function collectCommentMetadata(startIdx, endIdx, isLeading) {
    const commentType = sourceText.charAt(startIdx++);
    const commentMeta = {
      type: commentType,
      lineEmpty: false,
      leading: isLeading
    };
    // Determine if the line is empty before the comment
    const charsToCheck = isStrictMode ? 2 : 3;
    let checkIdx = startIdx - charsToCheck;
    let ch;
    do {
      if (--checkIdx < 0 || (ch = sourceText.charAt(checkIdx)) === '\n') {
        commentMeta.lineEmpty = true;
        break;
      }
    } while (ch === ' ' || ch === '\processRuleBeginHandlers');
    // Split comment text into lines and clean up
    let commentLines = sourceText.substring(startIdx, endIdx).split($86);
    for (let i = 0; i < commentLines.length; ++i) {
      commentLines[i] = commentLines[i].replace(isStrictMode ? N86 : U86, '').trim();
    }
    commentMeta.text = commentLines.join('\n').trim();
    commentMetadataByLine[currentLine] = commentMeta;
    lastCommentLine = currentLine;
  }

  /**
   * Checks if the line at the given index is a single-line comment.
   * @param {number} idx
   * @returns {boolean}
   */
  function isSingleLineComment(idx) {
    const lineEnd = findLineEnd(idx);
    const lineText = sourceText.substring(idx, lineEnd);
    return /^\s*\/\//.test(lineText);
  }

  /**
   * Finds the index of the end of the line (newline or end of source).
   * @param {number} idx
   * @returns {number}
   */
  function findLineEnd(idx) {
    let i = idx;
    while (i < sourceLength && charAt(i) !== '\n') i++;
    return i;
  }

  /**
   * Retrieves the next token or comment from the source.
   * @returns {string|null}
   */
  function nextToken() {
    if (tokenQueue.length > 0) return tokenQueue.shift();
    if (pendingStringDelimiter) return parseStringToken();
    let isLineStart = currentIndex === 0;
    let foundCommentOrWhitespace;
    do {
      if (currentIndex === sourceLength) return null;
      foundCommentOrWhitespace = false;
      // Skip whitespace and track newlines
      while (q86.test(charAt(currentIndex))) {
        if (charAt(currentIndex) === '\n') {
          isLineStart = true;
          ++currentLine;
        }
        if (++currentIndex === sourceLength) return null;
      }
      // Handle comments
      if (charAt(currentIndex) === '/') {
        if (++currentIndex === sourceLength) throw throwIllegalToken('comment');
        if (charAt(currentIndex) === '/') {
          // Single-line comment
          if (!isStrictMode) {
            const commentStart = currentIndex + 1;
            const isDocComment = charAt(commentStart) === '/';
            while (charAt(++currentIndex) !== '\n') {
              if (currentIndex === sourceLength) return null;
            }
            if (++currentIndex, isDocComment) {
              collectCommentMetadata(commentStart, currentIndex - 1, isLineStart);
              isLineStart = true;
            }
            ++currentLine;
            foundCommentOrWhitespace = true;
          } else {
            // Strict mode: handle consecutive single-line comments
            let commentStart = currentIndex;
            let isDocComment = false;
            if (isSingleLineComment(currentIndex - 1)) {
              isDocComment = true;
              do {
                if ((currentIndex = findLineEnd(currentIndex)), currentIndex === sourceLength) break;
                if (++currentIndex, !isLineStart) break;
              } while (isSingleLineComment(currentIndex));
            } else {
              currentIndex = Math.min(sourceLength, findLineEnd(currentIndex) + 1);
            }
            if (isDocComment) {
              collectCommentMetadata(commentStart, currentIndex, isLineStart);
              isLineStart = true;
            }
            ++currentLine;
            foundCommentOrWhitespace = true;
          }
        } else if (charAt(currentIndex) === '*') {
          // Multi-line comment
          const commentStart = currentIndex + 1;
          const isDocComment = isStrictMode || charAt(commentStart) === '*';
          let prevChar, currChar = charAt(currentIndex);
          do {
            if (currChar === '\n') ++currentLine;
            if (++currentIndex === sourceLength) throw throwIllegalToken('comment');
            prevChar = currChar;
            currChar = charAt(currentIndex);
          } while (prevChar !== '*' || currChar !== '/');
          if (++currentIndex, isDocComment) {
            collectCommentMetadata(commentStart, currentIndex - 2, isLineStart);
            isLineStart = true;
          }
          foundCommentOrWhitespace = true;
        } else {
          // Not a comment, just a slash token
          return '/';
        }
      }
    } while (foundCommentOrWhitespace);
    // Parse next non-whitespace, non-comment token
    let scanIndex = currentIndex;
    sg1.lastIndex = 0;
    let isToken = sg1.test(charAt(scanIndex++));
    if (!isToken) {
      while (scanIndex < sourceLength && !sg1.test(charAt(scanIndex))) ++scanIndex;
    }
    const token = sourceText.substring(currentIndex, currentIndex = scanIndex);
    if (token === '"' || token === "'") {
      pendingStringDelimiter = token;
    }
    return token;
  }

  /**
   * Enqueues a token for future retrieval.
   * @param {string} token
   */
  function enqueueToken(token) {
    tokenQueue.push(token);
  }

  /**
   * Peeks at the next token without consuming isBlobOrFileLikeObject.
   * @returns {string|null}
   */
  function peekToken() {
    if (!tokenQueue.length) {
      const token = nextToken();
      if (token === null) return null;
      enqueueToken(token);
    }
    return tokenQueue[0];
  }

  /**
   * Skips the next token if isBlobOrFileLikeObject matches the expected value.
   * @param {string} expectedToken
   * @param {boolean} [optional=false] - If true, do not throw if token does not match.
   * @returns {boolean}
   */
  function skipToken(expectedToken, optional) {
    const token = peekToken();
    const matches = token === expectedToken;
    if (matches) {
      nextToken();
      return true;
    }
    if (!optional) throw throwIllegalToken(`token '${token}', '${expectedToken}' expected`);
    return false;
  }

  /**
   * Retrieves comment metadata for the previous or a specific line.
   * @param {number} [lineNumber]
   * @returns {string|null}
   */
  function getCommentMetadata(lineNumber) {
    let commentText = null;
    let meta;
    if (lineNumber === undefined) {
      meta = commentMetadataByLine[currentLine - 1];
      delete commentMetadataByLine[currentLine - 1];
      if (meta && (isStrictMode || meta.type === '*' || meta.lineEmpty)) {
        commentText = meta.leading ? meta.text : null;
      }
    } else {
      if (lastCommentLine < lineNumber) peekToken();
      meta = commentMetadataByLine[lineNumber];
      delete commentMetadataByLine[lineNumber];
      if (meta && !meta.lineEmpty && (isStrictMode || meta.type === '/')) {
        commentText = meta.leading ? null : meta.text;
      }
    }
    return commentText;
  }

  // Return the parser API
  return Object.defineProperty({
    next: nextToken,
    peek: peekToken,
    push: enqueueToken,
    skip: skipToken,
    cmnt: getCommentMetadata
  }, 'line', {
    get: function () {
      return currentLine;
    }
  });
}

module.exports = joinCommentParser;