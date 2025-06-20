/**
 * Displays a UI component for selecting where to save memory (project, local, or user).
 * Handles selection, cancellation, and renders details for the selected memory type.
 *
 * @param {Object} params - The parameters object.
 * @param {function} params.onSelect - Callback invoked when a memory location is selected.
 * @param {function} params.onCancel - Callback invoked when the selection is cancelled (e.g., Escape key).
 * @param {string} [params.title] - Optional title to display at the top of the selector.
 * @param {function} [params.renderDetails] - Optional function to render additional details for the selected memory type.
 * @returns {React.Element} The rendered memory location selector component.
 */
function MemoryLocationSelector({
  onSelect,
  onCancel,
  title,
  renderDetails
}) {
  // State for the currently focused/selected memory type
  const [selectedMemoryType, setSelectedMemoryType] = BT2.useState(AT2);

  // Get theme styles (e.g., colors)
  const theme = getThemeStylesheet();

  // Determine if project memory is checked in (e.g., in git)
  const isProjectMemoryCheckedIn = XE2(C4());

  // Build the list of memory location options
  const memoryOptions = [
    {
      label: "Project memory",
      value: "Project",
      description: `${isProjectMemoryCheckedIn ? "Checked in at" : "Saved in"} ./CLAUDE.md`
    },
    // If project memory is checked in, also offer a local (gitignored) option
    ...(
      isProjectMemoryCheckedIn
        ? [{
            label: "Project memory (local)",
            value: "Local",
            description: "Gitignored in ./CLAUDE.local.md"
          }]
        : []
    ),
    {
      label: "User memory",
      value: "User",
      description: "Saved in ~/.claude/CLAUDE.md"
    }
  ];

  // Call useCtrlKeyActionHandler() (side effect, possibly focus management or analytics)
  useCtrlKeyActionHandler();

  // Register a handler for keyboard events (e.g., Escape key to cancel)
  D0((_, keyEvent) => {
    if (keyEvent.escape) {
      onCancel();
    }
  });

  // Render the memory location selector UI
  return DB.createElement(
    g,
    {
      flexDirection: "column",
      borderStyle: "round",
      borderColor: theme.remember,
      padding: 1,
      width: "100%"
    },
    // Title row
    DB.createElement(
      g,
      {
        marginBottom: 1,
        flexDirection: "row",
        justifyContent: "space-between"
      },
      DB.createElement(
        _,
        {
          color: theme.remember,
          bold: true
        },
        title || "Where should this memory be saved?"
      )
    ),
    // Memory options list
    DB.createElement(
      g,
      {
        flexDirection: "column",
        paddingX: 1
      },
      DB.createElement(SelectableOptionsList, {
        focusValue: selectedMemoryType,
        options: memoryOptions,
        onFocus: setSelectedMemoryType,
        onChange: newValue => {
          AT2 = newValue; // Update global or external state
          onSelect(newValue);
        },
        onCancel: onCancel
      })
    ),
    // Details section for the selected memory type
    DB.createElement(
      g,
      {
        marginTop: 1,
        flexDirection: "column"
      },
      renderDetails
        ? renderDetails(selectedMemoryType)
        : DB.createElement(UH5, { type: selectedMemoryType })
    )
  );
}

module.exports = MemoryLocationSelector;