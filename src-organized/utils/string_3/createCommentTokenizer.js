/**
 * Tokenizes and processes comment blocks and code tokens from a source string, supporting both normal and strict (createPropertyAccessor) modes.
 * Handles line tracking, comment extraction, and token peeking/pushing for downstream parsing utilities.
 *
 * @param {string} sourceText - The source text to tokenize (typically code with comments).
 * @param {boolean} isStrictMode - If true, uses strict comment parsing rules.
 * @returns {object} Tokenizer interface with next, peek, push, skip, cmnt, and line properties.
 */
function createCommentTokenizer(sourceText, isStrictMode) {
  sourceText = sourceText.toString();
  let currentIndex = 0;
  const sourceLength = sourceText.length;
  let currentLine = 1;
  let lastCommentLine = 0;
  const commentMap = {};
  const tokenQueue = [];
  let pendingStringDelimiter = null;

  // Helper: Throws an error with line info
  function throwIllegal(type) {
    return Error(`illegal ${type} (line ${currentLine})`);
  }

  // Helper: Parses a string literal starting at currentIndex
  function parseStringLiteral() {
    const stringRegex = pendingStringDelimiter === "'" ? E86 : w86;
    stringRegex.lastIndex = currentIndex - 1;
    const match = stringRegex.exec(sourceText);
    if (!match) throw throwIllegal("string");
    currentIndex = stringRegex.lastIndex;
    pushToken(pendingStringDelimiter);
    pendingStringDelimiter = null;
    return I_0(match[1]);
  }

  // Helper: Returns character at given index
  function charAt(idx) {
    return sourceText.charAt(idx);
  }

  // Helper: Records a comment block for a line
  function recordCommentBlock(startIdx, endIdx, isLeading) {
    const commentInfo = {
      type: sourceText.charAt(startIdx++),
      lineEmpty: false,
      leading: isLeading
    };
    let lookbackOffset = isStrictMode ? 2 : 3;
    let lookbackIdx = startIdx - lookbackOffset;
    let lookbackChar;
    // Check if the line before the comment is empty
    do {
      if (--lookbackIdx < 0 || (lookbackChar = sourceText.charAt(lookbackIdx)) === '\n') {
        commentInfo.lineEmpty = true;
        break;
      }
    } while (lookbackChar === ' ' || lookbackChar === '\processRuleBeginHandlers');
    // Split comment lines and clean up
    let commentLines = sourceText.substring(startIdx, endIdx).split($86);
    for (let i = 0; i < commentLines.length; ++i) {
      commentLines[i] = commentLines[i].replace(isStrictMode ? N86 : U86, '').trim();
    }
    commentInfo.text = commentLines.join('\n').trim();
    commentMap[currentLine] = commentInfo;
    lastCommentLine = currentLine;
  }

  // Helper: Checks if a line is a comment line
  function isCommentLine(lineStartIdx) {
    const lineEndIdx = findLineEnd(lineStartIdx);
    const lineText = sourceText.substring(lineStartIdx, lineEndIdx);
    return /^\s*\/\//.test(lineText);
  }

  // Helper: Finds the end index of the current line
  function findLineEnd(idx) {
    let endIdx = idx;
    while (endIdx < sourceLength && charAt(endIdx) !== '\n') endIdx++;
    return endIdx;
  }

  // Main: Returns the next token or comment
  function nextToken() {
    if (tokenQueue.length > 0) return tokenQueue.shift();
    if (pendingStringDelimiter) return parseStringLiteral();
    let foundToken = false;
    let isLineStart = currentIndex === 0;
    let charValue, tokenStartIdx, isBlockComment, isDocComment, commentStartIdx;
    do {
      if (currentIndex === sourceLength) return null;
      foundToken = false;
      // Skip whitespace and track newlines
      while (q86.test(charValue = charAt(currentIndex))) {
        if (charValue === '\n') {
          isLineStart = true;
          ++currentLine;
        }
        if (++currentIndex === sourceLength) return null;
      }
      // Handle comments
      if (charAt(currentIndex) === '/') {
        if (++currentIndex === sourceLength) throw throwIllegal('comment');
        if (charAt(currentIndex) === '/') {
          // Line comment
          if (!isStrictMode) {
            isDocComment = charAt(commentStartIdx = currentIndex + 1) === '/';
            while (charAt(++currentIndex) !== '\n') {
              if (currentIndex === sourceLength) return null;
            }
            if (++currentIndex, isDocComment) recordCommentBlock(commentStartIdx, currentIndex - 1, isLineStart), isLineStart = true;
            ++currentLine;
            foundToken = true;
          } else {
            // Strict mode: handle consecutive comment lines
            commentStartIdx = currentIndex;
            isBlockComment = false;
            if (isCommentLine(currentIndex - 1)) {
              isBlockComment = true;
              do {
                if ((currentIndex = findLineEnd(currentIndex)), currentIndex === sourceLength) break;
                if (++currentIndex, !isLineStart) break;
              } while (isCommentLine(currentIndex));
            } else {
              currentIndex = Math.min(sourceLength, findLineEnd(currentIndex) + 1);
            }
            if (isBlockComment) recordCommentBlock(commentStartIdx, currentIndex, isLineStart), isLineStart = true;
            ++currentLine;
            foundToken = true;
          }
        } else if ((charValue = charAt(currentIndex)) === '*') {
          // Block comment
          commentStartIdx = currentIndex + 1;
          isBlockComment = isStrictMode || charAt(commentStartIdx) === '*';
          let prevChar;
          do {
            if (charValue === '\n') ++currentLine;
            if (++currentIndex === sourceLength) throw throwIllegal('comment');
            prevChar = charValue;
            charValue = charAt(currentIndex);
          } while (prevChar !== '*' || charValue !== '/');
          if (++currentIndex, isBlockComment) recordCommentBlock(commentStartIdx, currentIndex - 2, isLineStart), isLineStart = true;
          foundToken = true;
        } else {
          // Not a comment, just a slash
          return '/';
        }
      }
    } while (foundToken);
    // Extract next token
    let scanIdx = currentIndex;
    sg1.lastIndex = 0;
    let isToken = sg1.test(charAt(scanIdx++));
    if (!isToken) while (scanIdx < sourceLength && !sg1.test(charAt(scanIdx))) ++scanIdx;
    let token = sourceText.substring(currentIndex, currentIndex = scanIdx);
    if (token === '"' || token === "'") pendingStringDelimiter = token;
    return token;
  }

  // Helper: Pushes a token back onto the queue
  function pushToken(token) {
    tokenQueue.push(token);
  }

  // Helper: Peeks at the next token without consuming isBlobOrFileLikeObject
  function peekToken() {
    if (!tokenQueue.length) {
      const next = nextToken();
      if (next === null) return null;
      pushToken(next);
    }
    return tokenQueue[0];
  }

  // Helper: Skips the next token if isBlobOrFileLikeObject matches expected, or throws if required
  function skipToken(expectedToken, isOptional) {
    const token = peekToken();
    const isMatch = token === expectedToken;
    if (isMatch) {
      nextToken();
      return true;
    }
    if (!isOptional) throw throwIllegal(`token '${token}', '${expectedToken}' expected`);
    return false;
  }

  // Helper: Retrieves the comment for a given line (or previous line if undefined)
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

  // Return the tokenizer interface
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

module.exports = createCommentTokenizer;