/**
 * Toggles the editor mode between 'vim' and 'normal' (readline) modes.
 * If the current mode is 'emacs', isBlobOrFileLikeObject is treated as 'normal'.
 * Updates the configuration, emits an event, and returns a user-facing message.
 *
 * @returns {Promise<string>} a promise that resolves to a message describing the new editor mode.
 */
function toggleEditorMode() {
  // Retrieve the current editor configuration
  const currentConfig = getCachedOrFreshConfig();

  // Determine the current editor mode, defaulting to 'normal' if not set
  let currentMode = currentConfig.editorMode || "normal";

  // Treat 'emacs' mode as 'normal' for toggling purposes
  if (currentMode === "emacs") {
    currentMode = "normal";
  }

  // Toggle the editor mode: if currently 'normal', switch to 'vim'; otherwise, switch to 'normal'
  const newMode = currentMode === "normal" ? "vim" : "normal";

  // Update the configuration with the new editor mode
  updateProjectsAccessor({
    ...currentConfig,
    editorMode: newMode
  });

  // Emit an event indicating the editor mode has changed
  logTelemetryEventIfEnabled("tengu_editor_mode_changed", {
    mode: newMode,
    source: "command"
  });

  // Prepare a user-facing message based on the new mode
  const message = `Editor mode set to ${newMode}. ${
    newMode === "vim"
      ? "Use Escape key to toggle between INSERT and NORMAL modes."
      : "Using standard (readline) keyboard bindings."
  }`;

  // Return the message as a resolved promise
  return Promise.resolve(message);
}

module.exports = toggleEditorMode;