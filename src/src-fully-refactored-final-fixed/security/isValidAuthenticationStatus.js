/**
 * Checks if the provided authentication status is one of the recognized valid statuses.
 *
 * @param {string} authenticationStatus - The authentication status to validate.
 * @returns {boolean} True if the status is valid; otherwise, false.
 */
function isValidAuthenticationStatus(authenticationStatus) {
  // List of valid authentication statuses
  const validStatuses = [
    "disabled",
    "enabled",
    "no_permissions",
    "not_configured",
    "migrated"
  ];

  // Check if the provided status is included in the list of valid statuses
  return validStatuses.includes(authenticationStatus);
}

module.exports = isValidAuthenticationStatus;