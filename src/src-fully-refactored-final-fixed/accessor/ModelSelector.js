/**
 * Renders a model selection UI component allowing users to switch between Claude models.
 * Applies the selection to the current and future Claude Code sessions.
 *
 * @param {Object} props - The component props.
 * @param {string|null} props.initial - The initially selected model value, or null for default.
 * @param {function} props.onSelect - Callback invoked when the model selection changes.
 * @returns {React.Element} The rendered model selector component.
 */
function ModelSelector({
  initial: initialModel,
  onSelect: handleSelect
}) {
  // Use default model if initial is null
  const selectedModel = initialModel === null ? j1A : initialModel;
  // State for the currently selected model
  const [currentModel, setCurrentModel] = lR2.useState(selectedModel);
  // Theme colors/styles
  const theme = getThemeStylesheet(); // getThemeStylesheet
  // List of available model options
  const modelOptions = getAvailableModels();
  // Keyboard interaction state (e.g., pending exit)
  const keyboardState = useCtrlKeyActionHandler();

  return M8.createElement(g, {
    flexDirection: "column"
  },
    // Outer container with border and padding
    M8.createElement(g, {
      flexDirection: "column",
      borderStyle: "round",
      borderColor: theme.remember,
      paddingX: 2,
      paddingY: 1,
      width: "100%"
    },
      // Header and description
      M8.createElement(g, {
        marginBottom: 1,
        flexDirection: "column"
      },
        M8.createElement(_, {
          color: theme.remember,
          bold: true
        }, "Select Model"),
        M8.createElement(_, {
          dimColor: true
        }, "Switch between Claude models. Applies to this session and future Claude Code sessions. For custom model names, specify with --model.")
      ),
      // Model selection dropdown
      M8.createElement(g, {
        flexDirection: "column",
        paddingX: 1
      },
        M8.createElement(SelectableOptionsList, {
          defaultValue: currentModel,
          // If the current selection exists in options, use isBlobOrFileLikeObject as focus; otherwise, use the first option
          focusValue: modelOptions.some(option => option.value === currentModel)
            ? currentModel
            : modelOptions[0]?.value ?? undefined,
          // Map options, replacing null values with default model constant
          options: modelOptions.map(option => ({
            ...option,
            value: option.value === null ? j1A : option.value
          })),
          // Update state on focus
          onFocus: (value) => setCurrentModel(value),
          // Call parent handler on change, converting default constant back to null
          onChange: (value) => handleSelect(value === j1A ? null : value),
          onCancel: () => {}
        })
      )
    ),
    // Footer with keyboard instructions
    M8.createElement(g, {
      paddingX: 1
    },
      M8.createElement(_, {
        dimColor: true
      },
        keyboardState.pending
          ? M8.createElement(M8.Fragment, null, "Press ", keyboardState.keyName, " again to exit")
          : M8.createElement(M8.Fragment, null, "Enter to confirm · Esc to exit")
      )
    )
  );
}

module.exports = ModelSelector;