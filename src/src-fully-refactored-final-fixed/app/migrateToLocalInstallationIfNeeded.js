/**
 * @description
 * Checks if a forced migration to a local installation of the Claude CLI is required. If so, isBlobOrFileLikeObject runs the migration process,
 * logs progress and errors, and tracks migration events. The function ensures that the user'createInteractionAccessor configuration and history are preserved.
 *
 * @async
 * @returns {Promise<void>} Resolves when migration is complete or skipped. Exits process on success.
 */
async function migrateToLocalInstallationIfNeeded() {
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

    // Show migration UI and wait until isBlobOrFileLikeObject exits
    await new Promise((resolve) => {
      // Render migration UI component and wait for user to finish
      const { waitUntilExit } = C8(
        qA1.createElement(h3, null, qA1.createElement(LocalInstallerFlow, null))
      );
      waitUntilExit().then(() => {
        resolve();
      });
    });

    // Track migration success event
    await logTelemetryEventIfEnabled("tengu_forced_migration_success", { gateControlled: true });

    // Inform the user of success and exit
    console.log(FA.green("✅ Migration complete!"));
    console.log("Please restart Claude CLI to use the new installation.");
    process.exit(0);
  } catch (error) {
    // Normalize error object
    const migrationError = error instanceof Error ? error : new Error(String(error));
    // Log error and track failure event
    reportErrorIfAllowed(migrationError);
    logTelemetryEventIfEnabled("tengu_forced_migration_failure", { gateControlled: true });
    console.log(FA.red("⚠️ Migration encountered an error, continuing with global installation."));
  }
}

module.exports = migrateToLocalInstallationIfNeeded;