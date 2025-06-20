/**
 * Checks if the current editor mode is set to 'vim' in the configuration.
 *
 * @returns {boolean} Returns true if the editor mode is 'vim', otherwise false.
 */
function isVimEditorModeEnabled() {
  // Retrieve the latest configuration object (cached or freshly loaded)
  const config = getCachedOrFreshConfig();

  // Check if the editor mode is set to 'vim'
  return config.editorMode === "vim";
}

module.exports = isVimEditorModeEnabled;