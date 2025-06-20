/**
 * Updates the character input timeout by setting the next allowed input time.
 * This function sets the global characterInputTimeout variable to the current
 * character input time (as returned by handleCharacterInput) plus 500 milliseconds.
 *
 * @returns {void} This function does not return a value.
 */
function updateCharacterInputTimeout() {
  // Set the global characterInputTimeout to the current input time plus 500ms
  characterInputTimeout = handleCharacterInput() + 500;
}

module.exports = updateCharacterInputTimeout;