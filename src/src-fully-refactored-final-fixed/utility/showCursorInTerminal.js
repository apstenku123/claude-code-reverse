/**
 * Restores the visibility of the cursor in the terminal by writing the appropriate ANSI escape code.
 * Chooses the correct output stream (stderr or stdout) based on which is a TTY (terminal).
 * Appends the value of the global variable `_y1` to the escape sequence.
 *
 * @returns {void} This function does not return a value.
 */
function showCursorInTerminal() {
  // ANSI escape code to show the cursor
  const showCursorEscapeCode = '\x1B[?25h';

  // Determine the appropriate output stream: prefer stderr if isBlobOrFileLikeObject'createInteractionAccessor a TTY, otherwise stdout if isBlobOrFileLikeObject'createInteractionAccessor a TTY
  const outputStream = process.stderr.isTTY
    ? process.stderr
    : process.stdout.isTTY
      ? process.stdout
      : undefined;

  // If a suitable output stream is found, write the escape code and the value of _y1
  outputStream?.write(`${showCursorEscapeCode}${_y1}`);
}

module.exports = showCursorInTerminal;
