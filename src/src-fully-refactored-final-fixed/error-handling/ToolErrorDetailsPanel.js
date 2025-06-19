/**
 * Renders a detailed panel displaying information about a tool'createInteractionAccessor error handling, including its name, description, parameters, and concurrency safety.
 * Handles keyboard escape events to trigger a back action.
 *
 * @param {Object} props - The component props
 * @param {Object} props.tool - The tool object containing metadata and methods
 * @param {Object} props.server - The server object containing server metadata
 * @param {Function} props.onBack - Callback function to execute when the user wants to go back
 * @returns {React.Element} The rendered error details panel
 */
function ToolErrorDetailsPanel({
  tool,
  server,
  onBack
}) {
  // Theme colors
  const theme = getThemeStylesheet();
  // Keyboard state (e.g., for escape key handling)
  const keyboardState = useCtrlKeyActionHandler();
  // Description state
  const [description, setDescription] = Z8.default.useState("");

  // Handle escape key to trigger back action
  D0((_, keyEvent) => {
    if (keyEvent.escape) {
      onBack();
    }
  });

  // Compose display name (tool + server)
  const displayName = c51(tool.name, server.name);

  // Check if the tool is concurrency safe (read-only)
  const isReadOnly = typeof tool.isConcurrencySafe === "function" && tool.isConcurrencySafe({});

  // Fetch tool description on mount or when tool changes
  Z8.default.useEffect(() => {
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

  // Render parameters if available
  const renderParameters = () => {
    if (
      tool.inputJSONSchema &&
      tool.inputJSONSchema.properties &&
      Object.keys(tool.inputJSONSchema.properties).length > 0
    ) {
      return Z8.default.createElement(g, {
        flexDirection: "column",
        marginTop: 1
      },
        Z8.default.createElement(_, { bold: true }, "Parameters:"),
        Z8.default.createElement(g, {
          marginLeft: 2,
          flexDirection: "column"
        },
          Object.entries(tool.inputJSONSchema.properties).map(([paramName, paramSchema]) => {
            const isRequired = tool.inputJSONSchema?.required?.includes(paramName);
            return Z8.default.createElement(_, { key: paramName },
              "• ", paramName,
              isRequired && Z8.default.createElement(_, { color: theme.secondaryText }, " (required)"),
              ": ",
              Z8.default.createElement(_, { color: theme.secondaryText },
                typeof paramSchema === "object" && paramSchema && "type" in paramSchema ? String(paramSchema.type) : "unknown"
              ),
              typeof paramSchema === "object" && paramSchema && "description" in paramSchema &&
                Z8.default.createElement(_, { color: theme.secondaryText }, " - ", String(paramSchema.description))
            );
          })
        )
      );
    }
    return null;
  };

  return Z8.default.createElement(g, { flexDirection: "column" },
    // Header section
    Z8.default.createElement(g, {
      flexDirection: "column",
      paddingX: 1,
      borderStyle: "round"
    },
      Z8.default.createElement(g, { marginBottom: 1 },
        Z8.default.createElement(_, { bold: true },
          displayName,
          Z8.default.createElement(_, { color: theme.secondaryText }, ` (${server.name})`),
          isReadOnly && Z8.default.createElement(_, { color: theme.success }, " [read-only]")
        )
      )
    ),
    // Tool name section
    Z8.default.createElement(g, { flexDirection: "column" },
      Z8.default.createElement(g, null,
        Z8.default.createElement(_, { bold: true }, "Full name: "),
        Z8.default.createElement(_, { color: theme.secondaryText }, tool.name)
      ),
      // Description section
      description && Z8.default.createElement(g, {
        flexDirection: "column",
        marginTop: 1
      },
        Z8.default.createElement(_, { bold: true }, "Description:"),
        Z8.default.createElement(_, { wrap: "wrap" }, description)
      ),
      // Parameters section
      renderParameters()
    ),
    // Footer/help section
    Z8.default.createElement(g, { marginLeft: 3 },
      Z8.default.createElement(_, { dimColor: true },
        keyboardState.pending
          ? Z8.default.createElement(Z8.default.Fragment, null, "Press ", keyboardState.keyName, " again to exit")
          : Z8.default.createElement(Z8.default.Fragment, null, "Esc to go back")
      )
    )
  );
}

module.exports = ToolErrorDetailsPanel;