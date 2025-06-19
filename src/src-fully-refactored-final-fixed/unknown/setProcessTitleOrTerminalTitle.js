/**
 * Sets the process title on Windows or updates the terminal window title on other platforms.
 *
 * On Windows, sets process.title to a decorated string if a title is provided.
 * On non-Windows platforms, writes an ANSI escape sequence to update the terminal window title.
 *
 * @param {string} title - The desired title to set for the process or terminal window.
 * @returns {void}
 */
function setProcessTitleOrTerminalTitle(title) {
  // Check if the current platform is Windows
  if (process.platform === "win32") {
    // On Windows, set the process title (shows in Task Manager, etc.)
    process.title = title ? `✳ ${title}` : title;
  } else {
    // On non-Windows platforms, update the terminal window title using ANSI escape codes
    // \x1B]0;TITLE\x07 sets the terminal title
    process.stdout.write(`\x1B]0;${title ? `✳ ${title}` : ""}\x07`);
  }
}

module.exports = setProcessTitleOrTerminalTitle;