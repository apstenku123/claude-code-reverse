/**
 * Checks if a forced migration to a local Claude CLI installation is required and performs the migration if needed.
 * This improves auto-updates and removes dependency on global npm permissions.
 * Existing configuration and history are preserved.
 *
 * @async
 * @returns {Promise<void>} Resolves when migration is complete or not needed.
 */
async function migrateToLocalClaudeCLIInstallationIfNeeded() {
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
    // Track migration start event
    logTelemetryEventIfEnabled("tengu_forced_migration_start", { gateControlled: true });

    // Render migration UI and wait until isBlobOrFileLikeObject completes
    await new Promise((resolve) => {
      // Create the migration UI React element
      const migrationUI = qA1.createElement(h3, null, qA1.createElement(LocalInstallerFlow, null));
      // Mount the UI and get the waitUntilExit function
      const { waitUntilExit } = C8(migrationUI);
      // Wait for the UI to signal completion
      waitUntilExit().then(() => {
        resolve();
      });
    });

    // Track migration success event
    await logTelemetryEventIfEnabled("tengu_forced_migration_success", { gateControlled: true });

    // Inform the user of successful migration
    console.log(FA.green("✅ Migration complete!"));
    console.log("Please restart Claude CLI to use the new installation.");
    process.exit(0);
  } catch (migrationError) {
    // Normalize error to an Error instance
    const errorInstance = migrationError instanceof Error ? migrationError : new Error(String(migrationError));
    // Log the error
    reportErrorIfAllowed(errorInstance);
    // Track migration failure event
    logTelemetryEventIfEnabled("tengu_forced_migration_failure", { gateControlled: true });
    // Inform the user of the failure
    console.log(FA.red("⚠️ Migration encountered an error, continuing with global installation."));
  }
}

module.exports = migrateToLocalClaudeCLIInstallationIfNeeded;