/**
 * Parses a workspace lock file and extracts relevant connection information.
 * The lock file can be either a JSON file with specific fields or a plain text file with workspace folder paths.
 *
 * @param {string} lockFilePath - The path to the workspace lock file.
 * @returns {object|null} An object containing workspaceFolders, port, pid, ideName, useWebSocket, runningInWindows, and authToken, or null if parsing fails.
 */
function parseWorkspaceLockFile(lockFilePath) {
  try {
    // Read the lock file contents as UTF-8 text
    const fileSystem = f1();
    const fileContents = fileSystem.readFileSync(lockFilePath, { encoding: "utf-8" });

    let workspaceFolders = [];
    let processId;
    let ideName;
    let useWebSocket = false;
    let runningInWindows = false;
    let authToken;

    try {
      // Try to parse the file as JSON
      const parsedJson = JSON.parse(fileContents);
      if (parsedJson.workspaceFolders) {
        workspaceFolders = parsedJson.workspaceFolders;
      }
      processId = parsedJson.pid;
      ideName = parsedJson.ideName;
      useWebSocket = parsedJson.transport === "ws";
      runningInWindows = parsedJson.runningInWindows === true;
      authToken = parsedJson.authToken;
    } catch (jsonParseError) {
      // If not JSON, treat as plain text: split by lines and trim
      workspaceFolders = fileContents.split(`\n`).map(line => line.trim());
    }

    // Extract the port from the lock file name
    // Assumes 'mr0' is a delimiter (e.g., path separator or custom string)
    const lockFileName = lockFilePath.split(mr0).pop();
    if (!lockFileName) {
      return null;
    }
    // Remove the '.lock' extension to get the port
    const portString = lockFileName.replace(".lock", "");
    const port = parseInt(portString);

    return {
      workspaceFolders,
      port,
      pid: processId,
      ideName,
      useWebSocket,
      runningInWindows,
      authToken
    };
  } catch (error) {
    // Log the error and return null
    reportErrorIfAllowed(error);
    return null;
  }
}

module.exports = parseWorkspaceLockFile;