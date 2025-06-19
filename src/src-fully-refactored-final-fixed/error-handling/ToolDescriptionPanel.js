/**
 * Renders a detailed description panel for a given tool, including its name, description, parameters, and server context.
 * Handles keyboard escape events to trigger a back action, and displays concurrency safety status if available.
 *
 * @param {Object} props - The component props
 * @param {Object} props.tool - The tool object containing metadata, description, and schema
 * @param {Object} props.server - The server object providing context (e.g., name)
 * @param {Function} props.onBack - Callback invoked when the user requests to go back (e.g., presses Escape)
 * @returns {JSX.Element} The rendered tool description panel
 */
function ToolDescriptionPanel({
  tool,
  server,
  onBack
}) {
  // Theme colors
  const theme = getThemeStylesheet();
  // Keyboard state (e.g., pending, keyName)
  const keyboardState = useCtrlKeyActionHandler();
  // Description state
  const [description, setDescription] = Z8.default.useState("");

  // Handle Escape key to trigger onBack callback
  D0((_, keyEvent) => {
    if (keyEvent.escape) {
      onBack();
    }
  });

  // Compose the tool display name with server context
  const toolDisplayName = c51(tool.name, server.name);
  // Check if the tool is concurrency safe (read-only)
  const isReadOnly = typeof tool.isConcurrencySafe === "function" && tool.isConcurrencySafe({});

  // Fetch tool description asynchronously when tool changes
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

  // Render the panel
  return Z8.default.createElement(g, {
    flexDirection: "column"
  },
    // Header section: Tool name, server, read-only status
    Z8.default.createElement(g, {
      flexDirection: "column",
      paddingX: 1,
      borderStyle: "round"
    },
      Z8.default.createElement(g, {
        marginBottom: 1
      },
        Z8.default.createElement(_, {
          bold: true
        },
          toolDisplayName,
          Z8.default.createElement(_, {
            color: theme.secondaryText
          }, ` (${server.name})`),
          isReadOnly && Z8.default.createElement(_, {
            color: theme.success
          }, " [read-only]")
        )
      )
    ),
    // Tool full name
    Z8.default.createElement(g, {
      flexDirection: "column"
    },
      Z8.default.createElement(g, null,
        Z8.default.createElement(_, {
          bold: true
        }, "Full name: "),
        Z8.default.createElement(_, {
          color: theme.secondaryText
        }, tool.name)
      ),
      // Tool description, if available
      description && Z8.default.createElement(g, {
        flexDirection: "column",
        marginTop: 1
      },
        Z8.default.createElement(_, {
          bold: true
        }, "Description:"),
        Z8.default.createElement(_, {
          wrap: "wrap"
        }, description)
      ),
      // Tool parameters, if defined in inputJSONSchema
      tool.inputJSONSchema &&
      tool.inputJSONSchema.properties &&
      Object.keys(tool.inputJSONSchema.properties).length > 0 &&
      Z8.default.createElement(g, {
        flexDirection: "column",
        marginTop: 1
      },
        Z8.default.createElement(_, {
          bold: true
        }, "Parameters:"),
        Z8.default.createElement(g, {
          marginLeft: 2,
          flexDirection: "column"
        },
          Object.entries(tool.inputJSONSchema.properties).map(([paramName, paramSchema]) => {
            // Check if parameter is required
            const isRequired = tool.inputJSONSchema?.required?.includes(paramName);
            return Z8.default.createElement(_, {
              key: paramName
            },
              "• ", paramName,
              isRequired && Z8.default.createElement(_, {
                color: theme.secondaryText
              }, " (required)"),
              ": ",
              Z8.default.createElement(_, {
                color: theme.secondaryText
              }, typeof paramSchema === "object" && paramSchema && "type" in paramSchema ? String(paramSchema.type) : "unknown"),
              typeof paramSchema === "object" && paramSchema && "description" in paramSchema &&
                Z8.default.createElement(_, {
                  color: theme.secondaryText
                }, " - ", String(paramSchema.description))
            );
          })
        )
      )
    ),
    // Footer: Keyboard hint
    Z8.default.createElement(g, {
      marginLeft: 3
    },
      Z8.default.createElement(_, {
        dimColor: true
      },
        keyboardState.pending
          ? Z8.default.createElement(Z8.default.Fragment, null, "Press ", keyboardState.keyName, " again to exit")
          : Z8.default.createElement(Z8.default.Fragment, null, "Esc to go back")
      )
    )
  );
}

module.exports = ToolDescriptionPanel;