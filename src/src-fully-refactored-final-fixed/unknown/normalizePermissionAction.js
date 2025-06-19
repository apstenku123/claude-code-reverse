/**
 * Normalizes a given permission or action string to a supported value.
 *
 * Accepts specific action strings and returns them as-is if recognized.
 * For any unrecognized input, returns the default action string.
 *
 * @param {string} action - The permission or action string to normalize.
 * @returns {string} The normalized permission/action string.
 */
function normalizePermissionAction(action) {
  switch (action) {
    case "bypassPermissions":
      // Recognized action: bypassPermissions
      return "bypassPermissions";
    case "acceptEdits":
      // Recognized action: acceptEdits
      return "acceptEdits";
    case "plan":
      // Recognized action: plan
      return "plan";
    case "default":
      // Explicitly handle 'default' string
      return "default";
    default:
      // For any unrecognized action, return 'default'
      return "default";
  }
}

module.exports = normalizePermissionAction;