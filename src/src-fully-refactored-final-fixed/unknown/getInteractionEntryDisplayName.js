/**
 * Returns a user-friendly display name for a given interaction entry type.
 *
 * @param {string} interactionEntryType - The type of the interaction entry to get the display name for.
 * @returns {string|null} The display name for the interaction entry type, or null if no display name is needed.
 */
function getInteractionEntryDisplayName(interactionEntryType) {
  switch (interactionEntryType) {
    case "default":
    case "plan":
    case "acceptEdits":
      // These types do not require a display name
      return null;
    case "bypassPermissions":
      // Provide a user-friendly name for this type
      return "Bypassing Permissions";
    default:
      // For any other types, return null (no display name)
      return null;
  }
}

module.exports = getInteractionEntryDisplayName;