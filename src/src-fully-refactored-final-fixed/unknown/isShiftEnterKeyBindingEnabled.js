/**
 * Checks if the Shift+Enter key binding is enabled in the cached configuration.
 *
 * @returns {boolean} True if the Shift+Enter key binding is installed, otherwise false.
 */
function isShiftEnterKeyBindingEnabled() {
  // Retrieve the cached configuration object
  const cachedConfig = getCachedConfig();
  // Return true if the shiftEnterKeyBindingInstalled property is strictly true
  return cachedConfig.shiftEnterKeyBindingInstalled === true;
}

module.exports = isShiftEnterKeyBindingEnabled;