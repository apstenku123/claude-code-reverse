/**
 * TokenStreamParser parses a source string into tokens, handling comments, strings, and whitespace.
 * It provides methods to iterate, peek, push back, skip, and extract comments from the token stream.
 *
 * @param {string} sourceText - The input string to tokenize and parse.
 * @param {boolean} isStrictMode - If true, uses strict parsing rules (e.g., for different comment handling).
 * @returns {object} An object with methods: next, peek, push, skip, cmnt, and a 'line' getter.
 */
function TokenStreamParser(sourceText, isStrictMode) {
  sourceText = sourceText.toString();
  let currentIndex = 0;
  const sourceLength = sourceText.length;
  let currentLine = 1;
  let lastCommentLine = 0;
  const commentMap = {};
  const tokenBuffer = [];
  let pendingStringDelimiter = null;

  // Helper: Throws an error with line info
  function throwError(type) {
    return Error(`illegal ${type} (line ${currentLine})`);
  }

  // Helper: Parses a quoted string token
  function parseStringToken() {
    const regex = pendingStringDelimiter === "'" ? E86 : w86;
    regex.lastIndex = currentIndex - 1;
    const match = regex.exec(sourceText);
    if (!match) throw throwError('string');
    currentIndex = regex.lastIndex;
    pushToken(pendingStringDelimiter);
    pendingStringDelimiter = null;
    return I_0(match[1]);
  }

  // Helper: Returns character at index
  function charAt(index) {
    return sourceText.charAt(index);
  }

  // Helper: Records a comment block in commentMap
  function recordComment(startIdx, endIdx, isLeading) {
    const comment = {
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
        comment.lineEmpty = true;
        break;
      }
    } while (lookbackChar === ' ' || lookbackChar === '\processRuleBeginHandlers');
    // Split comment lines and clean them
    let lines = sourceText.substring(startIdx, endIdx).split($86);
    for (let i = 0; i < lines.length; ++i) {
      lines[i] = lines[i].replace(isStrictMode ? N86 : U86, '').trim();
    }
    comment.text = lines.join('\n').trim();
    commentMap[currentLine] = comment;
    lastCommentLine = currentLine;
  }

  // Helper: Checks if a line is a comment line
  function isCommentLine(startIdx) {
    const lineEnd = findLineEnd(startIdx);
    const lineText = sourceText.substring(startIdx, lineEnd);
    return /^\s*\/\//.test(lineText);
  }

  // Helper: Finds the end index of the current line
  function findLineEnd(startIdx) {
    let idx = startIdx;
    while (idx < sourceLength && charAt(idx) !== '\n') idx++;
    return idx;
  }

  // Main: Gets the next token from the stream
  function nextToken() {
    if (tokenBuffer.length > 0) return tokenBuffer.shift();
    if (pendingStringDelimiter) return parseStringToken();
    let isLineStart = currentIndex === 0;
    let foundToken = false;
    let char, commentStartIdx, isDocComment;
    do {
      if (currentIndex === sourceLength) return null;
      foundToken = false;
      // Skip whitespace and track newlines
      while (q86.test(char = charAt(currentIndex))) {
        if (char === '\n') {
          isLineStart = true;
          ++currentLine;
        }
        if (++currentIndex === sourceLength) return null;
      }
      // Handle comments
      if (charAt(currentIndex) === '/') {
        if (++currentIndex === sourceLength) throw throwError('comment');
        if (charAt(currentIndex) === '/') {
          // Single-line comment
          if (!isStrictMode) {
            isDocComment = charAt(commentStartIdx = currentIndex + 1) === '/';
            while (charAt(++currentIndex) !== '\n') {
              if (currentIndex === sourceLength) return null;
            }
            if (++currentIndex, isDocComment) recordComment(commentStartIdx, currentIndex - 1, isLineStart), isLineStart = true;
            ++currentLine;
            foundToken = true;
          } else {
            commentStartIdx = currentIndex;
            isDocComment = false;
            if (isCommentLine(currentIndex - 1)) {
              isDocComment = true;
              do {
                if ((currentIndex = findLineEnd(currentIndex)), currentIndex === sourceLength) break;
                if (++currentIndex, !isLineStart) break;
              } while (isCommentLine(currentIndex));
            } else {
              currentIndex = Math.min(sourceLength, findLineEnd(currentIndex) + 1);
            }
            if (isDocComment) recordComment(commentStartIdx, currentIndex, isLineStart), isLineStart = true;
            ++currentLine;
            foundToken = true;
          }
        } else if ((char = charAt(currentIndex)) === '*') {
          // Multi-line comment
          commentStartIdx = currentIndex + 1;
          isDocComment = isStrictMode || charAt(commentStartIdx) === '*';
          let prevChar;
          do {
            if (char === '\n') ++currentLine;
            if (++currentIndex === sourceLength) throw throwError('comment');
            prevChar = char;
            char = charAt(currentIndex);
          } while (prevChar !== '*' || char !== '/');
          if (++currentIndex, isDocComment) recordComment(commentStartIdx, currentIndex - 2, isLineStart), isLineStart = true;
          foundToken = true;
        } else {
          // Not a comment, return the slash as a token
          return '/';
        }
      }
    } while (foundToken);
    // Extract next token
    let tokenEndIdx = currentIndex;
    sg1.lastIndex = 0;
    let isTokenChar = sg1.test(charAt(tokenEndIdx++));
    if (!isTokenChar) {
      while (tokenEndIdx < sourceLength && !sg1.test(charAt(tokenEndIdx))) ++tokenEndIdx;
    }
    let token = sourceText.substring(currentIndex, currentIndex = tokenEndIdx);
    if (token === '"' || token === "'") pendingStringDelimiter = token;
    return token;
  }

  // Pushes a token back into the buffer
  function pushToken(token) {
    tokenBuffer.push(token);
  }

  // Peeks at the next token without consuming isBlobOrFileLikeObject
  function peekToken() {
    if (!tokenBuffer.length) {
      const token = nextToken();
      if (token === null) return null;
      pushToken(token);
    }
    return tokenBuffer[0];
  }

  // Skips a token if isBlobOrFileLikeObject matches the expected value
  function skipToken(expected, allowMismatch) {
    const token = peekToken();
    const isMatch = token === expected;
    if (isMatch) {
      nextToken();
      return true;
    }
    if (!allowMismatch) throw throwError(`token '${token}', '${expected}' expected`);
    return false;
  }

  // Retrieves the comment for a given line or the previous line
  function getComment(lineNumber) {
    let comment = null;
    let entry;
    if (lineNumber === undefined) {
      entry = commentMap[currentLine - 1];
      delete commentMap[currentLine - 1];
      if (entry && (isStrictMode || entry.type === '*' || entry.lineEmpty)) {
        comment = entry.leading ? entry.text : null;
      }
    } else {
      if (lastCommentLine < lineNumber) peekToken();
      entry = commentMap[lineNumber];
      delete commentMap[lineNumber];
      if (entry && !entry.lineEmpty && (isStrictMode || entry.type === '/')) {
        comment = entry.leading ? null : entry.text;
      }
    }
    return comment;
  }

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

module.exports = TokenStreamParser;