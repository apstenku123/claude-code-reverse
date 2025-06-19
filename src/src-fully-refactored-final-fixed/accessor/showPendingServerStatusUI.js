/**
 * Displays a UI for pending server statuses.
 *
 * This function retrieves the current server statuses, filters for those that are pending,
 * and displays an interactive UI for the user to resolve or acknowledge them. If there is
 * only one pending server, a single-server UI is shown; otherwise, a multi-server UI is used.
 * The function clears the terminal screen after the UI is closed.
 *
 * @async
 * @returns {Promise<void>} Resolves when the UI interaction is complete or if there are no pending servers.
 */
async function showPendingServerStatusUI() {
  // Retrieve the current server status object
  const serverStatusMap = rU();

  // Get all server names with a 'pending' status
  const pendingServerNames = Object.keys(serverStatusMap).filter(
    serverName => getMcpjsonServerApprovalStatus(serverName) === "pending"
  );

  // If there are no pending servers, exit early
  if (pendingServerNames.length === 0) return;

  // Await the completion of the UI interaction
  await new Promise(resolve => {
    // Helper to clear the terminal screen and resolve the promise
    const clearScreenAndResolve = () => {
      process.stdout.write("\x1B[2J\x1B[3J\x1B[H", () => {
        resolve();
      });
    };

    // Show a different UI depending on the number of pending servers
    if (pendingServerNames.length === 1 && pendingServerNames[0] !== undefined) {
      // Single pending server: show single-server UI
      const uiInstance = C8(
        $A1.default.createElement(
          h3,
          null,
          $A1.default.createElement(showMcpServerChoiceDialog, {
            serverName: pendingServerNames[0],
            onDone: () => {
              uiInstance.unmount?.();
              clearScreenAndResolve();
            }
          })
        ),
        { exitOnCtrlC: false }
      );
    } else {
      // Multiple pending servers: show multi-server UI
      const uiInstance = C8(
        $A1.default.createElement(
          h3,
          null,
          $A1.default.createElement(McpJsonServerSelectionDialog, {
            serverNames: pendingServerNames,
            onDone: () => {
              uiInstance.unmount?.();
              clearScreenAndResolve();
            }
          })
        ),
        { exitOnCtrlC: false }
      );
    }
  });
}

module.exports = showPendingServerStatusUI;