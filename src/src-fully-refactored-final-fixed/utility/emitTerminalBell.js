/**
 * Emits an audible bell sound in the terminal by writing the ASCII Bell character (\x07) to stdout.
 *
 * This function can be used to alert the user via a sound in supported terminal environments.
 *
 * @returns {void} Does not return a value.
 */
function emitTerminalBell() {
  // Write the ASCII Bell character to the standard output to trigger a terminal beep
  process.stdout.write("\x07");
}

module.exports = emitTerminalBell;