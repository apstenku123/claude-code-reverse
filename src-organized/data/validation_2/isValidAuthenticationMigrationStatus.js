/**
 * Checks if the provided authentication migration status is valid.
 *
 * Valid statuses are: 'disabled', 'enabled', 'no_permissions', 'not_configured', 'migrated'.
 *
 * @param {string} status - The authentication migration status to validate.
 * @returns {boolean} True if the status is valid, false otherwise.
 */
function isValidAuthenticationMigrationStatus(status) {
  // List of valid authentication migration statuses
  const validStatuses = [
    "disabled",
    "enabled",
    "no_permissions",
    "not_configured",
    "migrated"
  ];

  // Check if the provided status is included in the list of valid statuses
  return validStatuses.includes(status);
}

module.exports = isValidAuthenticationMigrationStatus;