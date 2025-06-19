/**
 * Displays a UI for pending servers, allowing the user to resolve them one by one or in batch.
 *
 * This function retrieves the current server statuses, filters for those with a 'pending' status,
 * and presents an interactive UI for the user to process them. If there are no pending servers, the function exits early.
 *
 * @async
 * @returns {Promise<void>} Resolves when the user has finished processing all pending servers.
 */
async function displayPendingServers() {
  // Retrieve all server statuses
  const serverStatuses = rU();

  // Filter server names that are currently pending
  const pendingServerNames = Object.keys(serverStatuses).filter(
    serverName => getMcpjsonServerApprovalStatus(serverName) === "pending"
  );

  // If there are no pending servers, exit early
  if (pendingServerNames.length === 0) return;

  // Wait for the user to finish processing pending servers via the UI
  await new Promise(resolve => {
    // Helper to clear the terminal and resolve the promise
    const clearTerminalAndResolve = () => {
      process.stdout.write("\x1B[2J\x1B[3J\x1B[H", () => {
        resolve();
      });
    };

    // If only one pending server, show single-server UI
    if (pendingServerNames.length === 1 && pendingServerNames[0] !== undefined) {
      const uiInstance = C8(
        $A1.default.createElement(
          h3,
          null,
          $A1.default.createElement(showMcpServerChoiceDialog, {
            serverName: pendingServerNames[0],
            onDone: () => {
              uiInstance.unmount?.();
              clearTerminalAndResolve();
            }
          })
        ),
        {
          exitOnCtrlC: false
        }
      );
    } else {
      // Otherwise, show multi-server UI
      const uiInstance = C8(
        $A1.default.createElement(
          h3,
          null,
          $A1.default.createElement(McpJsonServerSelectionDialog, {
            serverNames: pendingServerNames,
            onDone: () => {
              uiInstance.unmount?.();
              clearTerminalAndResolve();
            }
          })
        ),
        {
          exitOnCtrlC: false
        }
      );
    }
  });
}

module.exports = displayPendingServers;