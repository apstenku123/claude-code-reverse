/**
 * Renders a tool selection menu for a given server, allowing the user to select a tool or go back.
 *
 * @param {Object} params - The parameters for the tool selection menu.
 * @param {Object} params.server - The server object containing connection and name information.
 * @param {Function} params.onSelectTool - Callback invoked when a tool is selected. Receives the selected tool and its index.
 * @param {Function} params.onBack - Callback invoked when the user chooses to go back.
 * @returns {React.ReactElement} The rendered tool selection menu component.
 */
function ToolSelectionMenu({
  server,
  onSelectTool,
  onBack
}) {
  // Get theme styles (colors, etc.)
  const theme = getThemeStylesheet();
  // Get key state (for exit/back key handling)
  const keyState = getKeyState();
  // Get global state (e.g., tools list)
  const [globalState] = useGlobalState();

  // Memoize the list of tools for the current server
  const availableTools = React.useMemo(() => {
    // Only show tools if the server is connected
    if (server.client.type !== "connected") return [];
    // Filter or map tools for the current server
    return filterToolsForServer(globalState.mcp.tools, server.name);
  }, [server, globalState.mcp.tools]);

  // Map tools to options for the selection component
  const toolOptions = availableTools.map((tool, index) => {
    // Format tool label for display
    const label = formatToolLabel(tool.name, server.name);
    // Determine if the tool is concurrency safe (read-only)
    const isReadOnly = typeof tool.isConcurrencySafe === "function" && tool.isConcurrencySafe({});
    return {
      label,
      value: index.toString(),
      description: isReadOnly ? "read-only" : undefined,
      descriptionColor: isReadOnly ? theme.success : undefined
    };
  });

  return React.createElement(Box, {
    flexDirection: "column"
  },
    React.createElement(Box, {
      flexDirection: "column",
      paddingX: 1,
      borderStyle: "round"
    },
      React.createElement(Box, {
        marginBottom: 1
      },
        React.createElement(Text, {
          bold: true
        }, `Tools for ${server.name}`),
        React.createElement(Text, {
          color: theme.secondaryText
        }, ` (${availableTools.length} tools)`)
      )
    ),
    // If no tools are available, show a message; otherwise, show the tool selection list
    availableTools.length === 0 ? (
      React.createElement(Text, {
        color: theme.secondaryText
      }, "No tools available")
    ) : (
      React.createElement(ToolSelectList, {
        options: toolOptions,
        onChange: selectedValue => {
          const selectedIndex = parseInt(selectedValue, 10);
          const selectedTool = availableTools[selectedIndex];
          if (selectedTool) {
            onSelectTool(selectedTool, selectedIndex);
          }
        },
        onCancel: onBack
      })
    ),
    React.createElement(Box, {
      marginLeft: 3
    },
      React.createElement(Text, {
        dimColor: true
      },
        keyState.pending
          ? React.createElement(React.Fragment, null, `Press ${keyState.keyName} again to exit`)
          : React.createElement(React.Fragment, null, "Esc to go back")
      )
    )
  );
}

module.exports = ToolSelectionMenu;