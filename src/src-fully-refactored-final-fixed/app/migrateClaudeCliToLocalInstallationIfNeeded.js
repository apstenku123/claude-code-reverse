/**
 * Checks if a forced migration of Claude CLI to a local installation is required and performs the migration if so.
 * This improves auto-updates and removes dependency on global npm permissions.
 * Preserves existing configuration and history.
 *
 * @async
 * @returns {Promise<void>} Resolves when migration is complete or not needed.
 */
async function migrateClaudeCliToLocalInstallationIfNeeded() {
  // Check if migration is required: feature flag enabled, not already local, and not in print mode
  const shouldMigrate = await fY("force_local_installation_migration");
  const isAlreadyLocal = uO();
  if (!(shouldMigrate && !isAlreadyLocal && !print)) {
    return;
  }

  // Inform the user about the migration
  console.log(FA.yellow("⚠️ Migrating Claude CLI to local installation..."));
  console.log("This improves auto-updates and removes dependency on global npm permissions.");
  console.log("Your existing configuration and history will be preserved.");

  try {
    // Log the start of the migration
    logTelemetryEventIfEnabled("tengu_forced_migration_start", { gateControlled: true });

    // Show migration UI and wait until the process exits
    await new Promise((resolve) => {
      const { waitUntilExit } = C8(
        qA1.createElement(h3, null, qA1.createElement(LocalInstallerFlow, null))
      );
      waitUntilExit().then(() => {
        resolve();
      });
    });

    // Log successful migration
    await logTelemetryEventIfEnabled("tengu_forced_migration_success", { gateControlled: true });
    console.log(FA.green("✅ Migration complete!"));
    console.log("Please restart Claude CLI to use the new installation.");
    process.exit(0);
  } catch (error) {
    // Normalize error to an Error instance
    const migrationError = error instanceof Error ? error : new Error(String(error));
    // Handle the error (e.g., log, report)
    reportErrorIfAllowed(migrationError);
    // Log migration failure
    logTelemetryEventIfEnabled("tengu_forced_migration_failure", { gateControlled: true });
    console.log(FA.red("⚠️ Migration encountered an error, continuing with global installation."));
  }
}

module.exports = migrateClaudeCliToLocalInstallationIfNeeded;