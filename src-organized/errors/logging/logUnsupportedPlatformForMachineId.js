/**
 * Logs a debug message indicating that reading the machine updateSnapshotAndNotify is not supported on the current platform.
 *
 * This function is intended to be called when an attempt to read the machine updateSnapshotAndNotify fails due to platform limitations.
 * It uses the application'createInteractionAccessor diagnostic logger to output a debug message for troubleshooting purposes.
 *
 * @async
 * @returns {void} This function does not return a value.
 */
async function logUnsupportedPlatformForMachineId() {
  // Log a debug message about the unsupported platform for reading machine updateSnapshotAndNotify
  qt4.diag.debug("could not read machine-id: unsupported platform");
  return;
}

module.exports = logUnsupportedPlatformForMachineId;