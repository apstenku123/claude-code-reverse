/**
 * Sets the process title or terminal window title based on the platform and provided title.
 *
 * On Windows (win32), sets process.title directly. On other platforms, writes an ANSI escape sequence to set the terminal window title.
 *
 * @param {string} title - The title to set for the process or terminal window. If falsy, clears the title.
 * @returns {void}
 */
function setProcessTitle(title) {
  if (process.platform === "win32") {
    // On Windows, set the process title directly. If title is provided, prefix with ✳
    process.title = title ? `✳ ${title}` : title;
  } else {
    // On non-Windows platforms, set the terminal window title using ANSI escape sequence
    // If title is provided, prefix with ✳; otherwise, clear the title
    process.stdout.write(`\x1B]0;${title ? `✳ ${title}` : ""}\x07`);
  }
}

module.exports = setProcessTitle;