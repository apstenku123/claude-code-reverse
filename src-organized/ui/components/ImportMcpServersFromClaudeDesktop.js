/**
 * Renders a UI for importing MCP servers from Claude Desktop, handling name conflicts and user selection.
 *
 * @param {Object} params - The parameters object.
 * @param {Object} params.servers - The MCP servers found in Claude Desktop, keyed by server name.
 * @param {any} params.scope - The current scope/context for the import operation.
 * @param {Function} params.onDone - Callback invoked with the number of servers imported (or 0 if cancelled).
 * @returns {React.ReactElement} The rendered import UI component.
 */
function importMcpServersFromClaudeDesktop({
  servers,
  scope,
  onDone
}) {
  // Get theme colors/styles
  const theme = getThemeStylesheet();
  // Get all server names from Claude Desktop
  const allServerNames = Object.keys(servers);
  // Get the current list of imported servers (by name)
  const importedServers = pG.useMemo(() => getImportedServers(), []);
  // Find server names that already exist in the imported list
  const duplicateServerNames = allServerNames.filter(serverName => importedServers[serverName] !== undefined);

  /**
   * Handles the import of selected servers, adding suffixes for duplicates.
   * @param {string[]} selectedServerNames - The server names selected by the user to import.
   */
  function handleImport(selectedServerNames) {
    let importCount = 0;
    for (const serverName of selectedServerNames) {
      const serverData = servers[serverName];
      if (serverData) {
        let uniqueServerName = serverName;
        // If a server with this name already exists, add a numbered suffix
        if (importedServers[uniqueServerName] !== undefined) {
          let suffix = 1;
          while (importedServers[`${serverName}_${suffix}`] !== undefined) suffix++;
          uniqueServerName = `${serverName}_${suffix}`;
        }
        // Import the server with the unique name
        updateMcpServerConfig(uniqueServerName, serverData, scope);
        importCount++;
      }
    }
    // Notify parent how many servers were imported
    onDone(importCount);
  }

  // Get key handler state (for showing instructions)
  const keyHandler = useCtrlKeyActionHandler();

  // Register escape key handler to cancel import
  D0((_, keyEvent) => {
    if (keyEvent.escape) {
      onDone(0);
      return;
    }
  });

  // Render the import UI
  return pG.default.createElement(
    pG.default.Fragment,
    null,
    pG.default.createElement(
      g,
      {
        flexDirection: "column",
        gap: 1,
        padding: 1,
        borderStyle: "round",
        borderColor: theme.success
      },
      pG.default.createElement(
        _,
        { bold: true, color: theme.success },
        "Import MCP Servers from Claude Desktop"
      ),
      pG.default.createElement(
        _,
        null,
        "Found ",
        allServerNames.length,
        " MCP server",
        allServerNames.length !== 1 ? "createInteractionAccessor" : "",
        " in Claude Desktop."
      ),
      duplicateServerNames.length > 0 &&
        pG.default.createElement(
          _,
          { color: theme.warning },
          "Note: Some servers already exist with the same name. If selected, they will be imported with a numbered suffix."
        ),
      pG.default.createElement(
        _,
        null,
        "Please select the servers you want to import:"
      ),
      pG.default.createElement(
        MultiSelectOptionsRenderer,
        {
          options: allServerNames.map(serverName => ({
            label: `${serverName}${duplicateServerNames.includes(serverName) ? " (already exists)" : ""}`,
            value: serverName
          })),
          defaultValue: allServerNames.filter(serverName => !duplicateServerNames.includes(serverName)),
          onSubmit: handleImport
        }
      )
    ),
    pG.default.createElement(
      g,
      { marginLeft: 3 },
      pG.default.createElement(
        _,
        { dimColor: true },
        keyHandler.pending
          ? pG.default.createElement(
              pG.default.Fragment,
              null,
              "Press ",
              keyHandler.keyName,
              " again to exit"
            )
          : pG.default.createElement(
              pG.default.Fragment,
              null,
              "Space to select · Enter to confirm · Esc to cancel"
            )
      )
    )
  );
}

module.exports = importMcpServersFromClaudeDesktop;