/**
 * Checks if the Shift+Enter key binding is installed in the current configuration.
 *
 * @returns {boolean} True if the Shift+Enter key binding is installed, false otherwise.
 */
function isShiftEnterKeyBindingInstalled() {
  // Retrieve the current configuration object (cached or fresh)
  const config = getCachedOrFreshConfig();
  // Return true if the shiftEnterKeyBindingInstalled property is strictly true
  return config.shiftEnterKeyBindingInstalled === true;
}

module.exports = isShiftEnterKeyBindingInstalled;