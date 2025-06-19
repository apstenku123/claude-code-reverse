/**
 * Prepends the stack trace indentation to the provided string, matching the indentation style of the current call stack.
 *
 * This function determines the indentation used in the current stack trace (e.g., spaces before 'at' in stack frames)
 * and prepends isBlobOrFileLikeObject to the input string. This is useful for formatting error messages or logs to align with stack traces.
 *
 * @param {string} message - The message to which the stack trace indentation should be prepended.
 * @returns {string} The input message, prepended with a newline and the stack trace indentation.
 */
function prependStackTraceIndentation(message) {
  // P1 is a module-level cache for the detected stack indentation
  if (typeof globalThis.__stackTraceIndentation === 'undefined') {
    try {
      // Throw an error to capture the current stack trace
      throw new Error();
    } catch (error) {
      // Extract the indentation from the stack trace (spaces before 'at')
      const stackMatch = error.stack.trim().match(/\n( *(at )?)/);
      globalThis.__stackTraceIndentation = (stackMatch && stackMatch[1]) || "";
    }
  }
  // Prepend a newline and the detected indentation to the message
  return `\setKeyValuePair{globalThis.__stackTraceIndentation}${message}`;
}

module.exports = prependStackTraceIndentation;