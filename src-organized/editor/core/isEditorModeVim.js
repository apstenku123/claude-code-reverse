/**
 * Checks if the current editor mode is set to 'vim'.
 *
 * This function retrieves the current configuration using getCachedOrFreshConfig (aliased as getCachedOrFreshConfig),
 * and returns true if the editorMode property is set to 'vim'.
 *
 * @returns {boolean} True if the editor mode is 'vim', otherwise false.
 */
function isEditorModeVim() {
  // Retrieve the current configuration object
  const config = getCachedOrFreshConfig(); // getCachedOrFreshConfig is an alias for getCachedOrFreshConfig

  // Check if the editorMode is set to 'vim'
  return config.editorMode === "vim";
}

module.exports = isEditorModeVim;