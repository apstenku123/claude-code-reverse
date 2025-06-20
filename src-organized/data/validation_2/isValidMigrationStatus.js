/**
 * Checks if the provided migration status is a recognized and valid status.
 *
 * Valid statuses include:
 * - "disabled"
 * - "enabled"
 * - "no_permissions"
 * - "not_configured"
 * - "migrated"
 *
 * @param {string} migrationStatus - The migration status string to validate.
 * @returns {boolean} True if the status is valid, false otherwise.
 */
function isValidMigrationStatus(migrationStatus) {
  // List of all valid migration statuses
  const validStatuses = [
    "disabled",
    "enabled",
    "no_permissions",
    "not_configured",
    "migrated"
  ];
  // Check if the provided status exists in the list of valid statuses
  return validStatuses.includes(migrationStatus);
}

module.exports = isValidMigrationStatus;