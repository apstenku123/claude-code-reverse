/**
 * Renders a detailed panel for a given error-handling tool, including its description, parameters, and server context.
 * Handles keyboard escape to trigger a back action. Fetches tool description asynchronously and displays tool metadata.
 *
 * @param {Object} props - The component props
 * @param {Object} props.tool - The error-handling tool object (must provide .name, .description, .inputJSONSchema, .isConcurrencySafe)
 * @param {Object} props.server - The server context object (must provide .name)
 * @param {Function} props.onBack - Callback to trigger when user wants to go back (e.g., on Escape key)
 * @returns {React.Element} The rendered error tool details panel
 */
function ErrorToolDetailsPanel({
  tool,
  server,
  onBack
}) {
  // Get theme styles for consistent coloring
  const theme = getThemeStylesheet();
  // Get navigation context (e.g., for key names and pending state)
  const navigation = useCtrlKeyActionHandler();
  // State for the tool description text
  const [toolDescription, setToolDescription] = Z8.default.useState("");

  // Register escape key handler to trigger onBack
  D0((_, keyEvent) => {
    if (keyEvent.escape) {
      onBack();
    }
  });

  // Compose the tool display name (may include server context)
  const toolDisplayName = c51(tool.name, server.name);
  // Determine if the tool is concurrency safe (read-only)
  const isReadOnly = typeof tool.isConcurrencySafe === "function" && tool.isConcurrencySafe({});

  // Fetch tool description asynchronously when tool changes
  Z8.default.useEffect(() => {
    async function fetchDescription() {
      try {
        const description = await tool.description({}, {
          isNonInteractiveSession: false,
          getToolPermissionContext: () => ({
            mode: "default",
            additionalWorkingDirectories: new Set(),
            alwaysAllowRules: {},
            alwaysDenyRules: {}
          }),
          tools: []
        });
        setToolDescription(description);
      } catch {
        setToolDescription("Failed to load description");
      }
    }
    fetchDescription();
  }, [tool]);

  // Render the details panel
  return Z8.default.createElement(g, {
    flexDirection: "column"
  },
    // Header section with tool name and server context
    Z8.default.createElement(g, {
      flexDirection: "column",
      paddingX: 1,
      borderStyle: "round"
    },
      Z8.default.createElement(g, {
        marginBottom: 1
      },
        Z8.default.createElement(_, { bold: true },
          toolDisplayName,
          Z8.default.createElement(_, { color: theme.secondaryText }, ` (${server.name})`),
          isReadOnly && Z8.default.createElement(_, { color: theme.success }, " [read-only]")
        )
      )
    ),
    // Tool full name
    Z8.default.createElement(g, { flexDirection: "column" },
      Z8.default.createElement(g, null,
        Z8.default.createElement(_, { bold: true }, "Full name: "),
        Z8.default.createElement(_, { color: theme.secondaryText }, tool.name)
      ),
      // Tool description, if available
      toolDescription && Z8.default.createElement(g, {
        flexDirection: "column",
        marginTop: 1
      },
        Z8.default.createElement(_, { bold: true }, "Description:"),
        Z8.default.createElement(_, { wrap: "wrap" }, toolDescription)
      ),
      // Tool parameters, if defined in inputJSONSchema
      tool.inputJSONSchema &&
      tool.inputJSONSchema.properties &&
      Object.keys(tool.inputJSONSchema.properties).length > 0 &&
      Z8.default.createElement(g, {
        flexDirection: "column",
        marginTop: 1
      },
        Z8.default.createElement(_, { bold: true }, "Parameters:"),
        Z8.default.createElement(g, {
          marginLeft: 2,
          flexDirection: "column"
        },
          // List each parameter with type and description
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
      )
    ),
    // Footer with navigation hint
    Z8.default.createElement(g, { marginLeft: 3 },
      Z8.default.createElement(_, { dimColor: true },
        navigation.pending
          ? Z8.default.createElement(Z8.default.Fragment, null, "Press ", navigation.keyName, " again to exit")
          : Z8.default.createElement(Z8.default.Fragment, null, "Esc to go back")
      )
    )
  );
}

module.exports = ErrorToolDetailsPanel;