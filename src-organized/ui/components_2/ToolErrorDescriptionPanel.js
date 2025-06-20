function ToolErrorDescriptionPanel({
  tool,
  server,
  onBack
}) {
  // Theme and UI helpers
  const theme = getThemeStylesheet(); // getThemeStylesheet
  const keyboardState = getKeyboardState(); // useCtrlKeyActionHandler
  const [description, setDescription] = React.useState("");

  // Handle Escape key to trigger back action
  useEscapeKeyListener((_, keyState) => {
    if (keyState.escape) {
      onBack();
    }
  });

  // Compose display name for the tool and server
  const toolDisplayName = getToolDisplayName(tool.name, server.name); // c51

  // Check if the tool is concurrency safe (read-only)
  const isReadOnly = typeof tool.isConcurrencySafe === "function" && tool.isConcurrencySafe({});

  // Fetch tool description asynchronously on mount or when tool changes
  React.useEffect(() => {
    async function fetchDescription() {
      try {
        const desc = await tool.description({}, {
          isNonInteractiveSession: false,
          getToolPermissionContext: () => ({
            mode: "default",
            additionalWorkingDirectories: new Set(),
            alwaysAllowRules: {},
            alwaysDenyRules: {}
          }),
          tools: []
        });
        setDescription(desc);
      } catch {
        setDescription("Failed to load description");
      }
    }
    fetchDescription();
  }, [tool]);

  // Render parameter details if input schema is present
  const renderParameters = () => {
    if (
      tool.inputJSONSchema &&
      tool.inputJSONSchema.properties &&
      Object.keys(tool.inputJSONSchema.properties).length > 0
    ) {
      return (
        React.createElement(Box, {
          flexDirection: "column",
          marginTop: 1
        },
          React.createElement(Text, { bold: true }, "Parameters:"),
          React.createElement(Box, {
            marginLeft: 2,
            flexDirection: "column"
          },
            Object.entries(tool.inputJSONSchema.properties).map(([paramName, paramSchema]) => {
              const isRequired = tool.inputJSONSchema?.required?.includes(paramName);
              return React.createElement(Text, { key: paramName },
                "• ", paramName,
                isRequired && React.createElement(Text, { color: theme.secondaryText }, " (required)"),
                ": ",
                React.createElement(Text, { color: theme.secondaryText },
                  typeof paramSchema === "object" && paramSchema && "type" in paramSchema ? String(paramSchema.type) : "unknown"
                ),
                typeof paramSchema === "object" && paramSchema && "description" in paramSchema &&
                  React.createElement(Text, { color: theme.secondaryText }, " - ", String(paramSchema.description))
              );
            })
          )
        )
      );
    }
    return null;
  };

  return (
    React.createElement(Box, { flexDirection: "column" },
      // Header with tool and server name
      React.createElement(Box, {
        flexDirection: "column",
        paddingX: 1,
        borderStyle: "round"
      },
        React.createElement(Box, { marginBottom: 1 },
          React.createElement(Text, { bold: true },
            toolDisplayName,
            React.createElement(Text, { color: theme.secondaryText }, ` (${server.name})`),
            isReadOnly && React.createElement(Text, { color: theme.success }, " [read-only]")
          )
        )
      ),
      // Tool full name
      React.createElement(Box, { flexDirection: "column" },
        React.createElement(Box, null,
          React.createElement(Text, { bold: true }, "Full name: "),
          React.createElement(Text, { color: theme.secondaryText }, tool.name)
        ),
        // Tool description
        description && React.createElement(Box, {
          flexDirection: "column",
          marginTop: 1
        },
          React.createElement(Text, { bold: true }, "Description:"),
          React.createElement(Text, { wrap: "wrap" }, description)
        ),
        // Tool parameters
        renderParameters()
      ),
      // Footer with navigation hint
      React.createElement(Box, { marginLeft: 3 },
        React.createElement(Text, { dimColor: true },
          keyboardState.pending
            ? React.createElement(React.Fragment, null, "Press ", keyboardState.keyName, " again to exit")
            : React.createElement(React.Fragment, null, "Esc to go back")
        )
      )
    )
  );
}

// Dependency mappings for clarity
const React = require("react");
const Box = require("g"); // UI layout component
const Text = require("_"); // UI text component
const getThemeStylesheet = require('config/settings/getThemeStylesheet');
const getKeyboardState = require("useCtrlKeyActionHandler");
const getToolDisplayName = require("c51");
const useEscapeKeyListener = require("D0");

module.exports = ToolErrorDescriptionPanel;