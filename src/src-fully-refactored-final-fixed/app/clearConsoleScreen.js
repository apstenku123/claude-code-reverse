/**
 * Clears the terminal screen by sending ANSI escape codes to process.stdout.
 * This function returns a Promise that resolves once the clear operation is complete.
 *
 * @returns {Promise<void>} Resolves when the console has been cleared.
 */
function clearConsoleScreen() {
  return new Promise((resolve) => {
    // Write ANSI escape codes to clear the screen and move cursor to home position
    // '\x1B[2J' clears the screen
    // '\x1B[3J' clears the scrollback buffer
    // '\x1B[H' moves the cursor to the top-left corner
    process.stdout.write("\x1B[2J\x1B[3J\x1B[H", () => {
      resolve();
    });
  });
}

module.exports = clearConsoleScreen;