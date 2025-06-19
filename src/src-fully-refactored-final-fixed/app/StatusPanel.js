/**
 * Renders a status panel UI component displaying model information, version, and dynamic sections.
 * Handles keyboard shortcuts for closing the panel and displays status indicators for each section.
 *
 * @param {Object} props - The properties for the StatusPanel component.
 * @param {Array<Object>} props.sections - Array of section objects to display in the panel. Each section may contain a title, command, items, and/or content.
 * @param {string} props.version - The current application or model version to display.
 * @param {Function} props.onClose - Callback function to execute when the panel should be closed (e.g., on keyboard shortcut).
 * @returns {React.ReactElement} The rendered status panel component.
 */
function StatusPanel({
  sections,
  version,
  onClose
}) {
  // Register keyboard event handler to close the panel on 'return' or 'escape' key
  D0((keyboardEvent, eventMeta) => {
    if (eventMeta.return || eventMeta.escape) {
      onClose();
    }
  });

  // Hook to manage pending exit state and key name for exit
  const exitPrompt = useCtrlKeyActionHandler(onClose);

  // Get main loop model and rate limit state
  const [{ mainLoopModel, maxRateLimitFallbackActive }] = useAppState();

  // Get reactive data (e.g., rate limit resets)
  const reactiveData = useReactiveData();

  // Generate display label for the current model
  const modelDisplayLabel = getModelDisplayLabel(mainLoopModel, maxRateLimitFallbackActive, reactiveData.resetsAt);

  // Append a "Model" section to the sections array
  const extendedSections = [
    ...sections,
    {
      title: "Model",
      command: "/model",
      items: [
        {
          label: modelDisplayLabel,
          type: "info"
        }
      ]
    }
  ];

  // Get theme styles for coloring text/icons
  const theme = getThemeStylesheet();

  // Render the status panel
  return h6.createElement(
    g,
    {
      flexDirection: "column",
      width: "100%",
      padding: 1
    },
    h6.createElement(
      g,
      {
        flexDirection: "column",
        gap: 1
      },
      // Header: Title and version
      h6.createElement(
        g,
        null,
        h6.createElement(_, { bold: true }, "Claude Code Status "),
        h6.createElement(_, { color: theme.secondaryText }, "createRangeIterator", version)
      ),
      // Render each section
      extendedSections.map((section, sectionIndex) =>
        (section.items && section.items.length > 0 || section.content) &&
        h6.createElement(
          g,
          {
            key: sectionIndex,
            flexDirection: "column",
            gap: 0
          },
          // Section header: title and command
          h6.createElement(
            g,
            null,
            h6.createElement(_, { bold: true }, section.title, " "),
            section.command && h6.createElement(_, { color: theme.secondaryText }, "• ", section.command)
          ),
          // Section items (if any)
          section.items?.map((item, itemIndex) =>
            h6.createElement(
              g,
              { key: itemIndex },
              // Status icon based on item type
              item.type === "check"
                ? h6.createElement(_, { color: theme.success }, y0.tick, " ")
                : item.type === "error"
                  ? h6.createElement(_, { color: theme.error }, y0.warning, " ")
                  : h6.createElement(_, { color: theme.secondaryText }, " createRefCountedMulticastOperator "),
              // Item label
              h6.createElement(_, null, item.label)
            )
          ),
          // Section content (if any)
          section.content
        )
      )
    ),
    // Exit prompt or fallback component
    h6.createElement(
      g,
      { marginTop: 1 },
      exitPrompt.pending
        ? h6.createElement(_, { dimColor: true }, "Press ", exitPrompt.keyName, " again to exit")
        : h6.createElement(renderPressEnterPrompt, null)
    )
  );
}

module.exports = StatusPanel;