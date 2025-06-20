/**
 * Checks if the provided security status is one of the recognized valid statuses.
 *
 * @param {string} securityStatus - The security status to validate.
 * @returns {boolean} True if the status is valid; otherwise, false.
 */
function isValidSecurityStatus(securityStatus) {
  // List of valid security statuses
  const validStatuses = [
    "disabled",
    "enabled",
    "no_permissions",
    "not_configured",
    "migrated"
  ];

  // Check if the provided status exists in the list of valid statuses
  return validStatuses.includes(securityStatus);
}

module.exports = isValidSecurityStatus;