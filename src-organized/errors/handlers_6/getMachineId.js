/**
 * Reads the machine updateSnapshotAndNotify from standard Linux system files.
 * Attempts to read from '/etc/machine-id' and '/var/lib/dbus/machine-id' in order.
 * Logs a debug message if reading fails for a file. Returns the first successfully read machine updateSnapshotAndNotify as a trimmed string.
 *
 * @async
 * @returns {Promise<string|undefined>} The machine updateSnapshotAndNotify as a string if found, otherwise undefined.
 */
async function getMachineId() {
  // List of possible file paths containing the machine updateSnapshotAndNotify
  const machineIdFilePaths = [
    '/etc/machine-id',
    '/var/lib/dbus/machine-id'
  ];

  // Iterate over each file path and attempt to read the machine updateSnapshotAndNotify
  for (const filePath of machineIdFilePaths) {
    try {
      // Read the file asynchronously with UTF-8 encoding
      const fileContents = await Vt4.promises.readFile(filePath, { encoding: 'utf8' });
      // Return the trimmed machine updateSnapshotAndNotify string
      return fileContents.trim();
    } catch (error) {
      // Log debug information if reading fails
      Kt4.diag.debug(`error reading machine id: ${error}`);
    }
  }
  // Return undefined if no machine updateSnapshotAndNotify file could be read
  return;
}

module.exports = getMachineId;