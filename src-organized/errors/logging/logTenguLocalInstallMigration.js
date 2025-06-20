/**
 * Logs the result and reason for a Tengu local install migration event.
 *
 * @param {string} migrationResult - The result of the migration process (e.g., 'success', 'failure').
 * @param {string} migrationReason - The reason for the migration result (e.g., error message or status explanation).
 * @returns {void}
 *
 * This function sends a log event named 'tengu_local_install_migration' with the provided result and reason.
 */
function logTenguLocalInstallMigration(migrationResult, migrationReason) {
  // Send the migration result and reason to the logging system
  logTelemetryEventIfEnabled("tengu_local_install_migration", {
    result: migrationResult,
    reason: migrationReason
  });
}

module.exports = logTenguLocalInstallMigration;