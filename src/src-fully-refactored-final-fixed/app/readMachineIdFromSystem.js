/**
 * Attempts to read the machine updateSnapshotAndNotify from standard Linux system files.
 * Tries multiple known file locations and returns the first successfully read machine updateSnapshotAndNotify as a trimmed string.
 * Logs a debug message if reading a file fails, and continues to the next location.
 *
 * @async
 * @returns {Promise<string|undefined>} The machine updateSnapshotAndNotify as a string if found, otherwise undefined.
 */
async function readMachineIdFromSystem() {
  // List of standard file paths where the machine updateSnapshotAndNotify may be stored
  const machineIdFilePaths = [
    "/etc/machine-id",
    "/var/lib/dbus/machine-id"
  ];

  // Iterate over each possible file path
  for (const filePath of machineIdFilePaths) {
    try {
      // Attempt to read the file as UTF-8 text
      const fileContents = await Vt4.promises.readFile(filePath, { encoding: "utf8" });
      // Return the trimmed machine updateSnapshotAndNotify if successful
      return fileContents.trim();
    } catch (readError) {
      // Log debug information if reading fails, then continue to next file
      Kt4.diag.debug(`error reading machine id: ${readError}`);
    }
  }
  // Return undefined if no machine updateSnapshotAndNotify could be read
  return;
}

module.exports = readMachineIdFromSystem;