/**
 * Renders a column UI component for selecting a Claude model.
 * Allows users to switch between Claude models for the current and future sessions.
 *
 * @param {Object} props - The component props.
 * @param {string|null} props.initial - The initially selected model value (or null for default).
 * @param {function} props.onSelect - Callback invoked when a model is selected. Receives the selected value (null for default).
 * @returns {React.ReactElement} The rendered model selector column component.
 */
function ModelSelectorColumn({ initial, onSelect }) {
  // Use default model if initial is null
  const defaultModel = initial === null ? j1A : initial;
  // State for the currently selected model
  const [selectedModel, setSelectedModel] = lR2.useState(defaultModel);
  // Theme colors/styles
  const theme = getThemeStylesheet();
  // List of available model options
  const modelOptions = getAvailableModels();
  // Keyboard interaction state (e.g., for showing hints)
  const keyboardState = useCtrlKeyActionHandler();

  return M8.createElement(
    g,
    { flexDirection: "column" },
    // Outer container
    M8.createElement(
      g,
      {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: theme.remember,
        paddingX: 2,
        paddingY: 1,
        width: "100%"
      },
      // Header and description
      M8.createElement(
        g,
        { marginBottom: 1, flexDirection: "column" },
        M8.createElement(_, { color: theme.remember, bold: true }, "Select Model"),
        M8.createElement(
          _,
          { dimColor: true },
          "Switch between Claude models. Applies to this session and future Claude Code sessions. For custom model names, specify with --model."
        )
      ),
      // Model selection dropdown
      M8.createElement(
        g,
        { flexDirection: "column", paddingX: 1 },
        M8.createElement(SelectableOptionsList, {
          defaultValue: selectedModel,
          // If the current selection is not in the options, focus the first option
          focusValue: modelOptions.some(option => option.value === selectedModel)
            ? selectedModel
            : modelOptions[0]?.value ?? undefined,
          // Map options, replacing null value with default model constant
          options: modelOptions.map(option => ({
            ...option,
            value: option.value === null ? j1A : option.value
          })),
          onFocus: value => setSelectedModel(value),
          onChange: value => onSelect(value === j1A ? null : value),
          onCancel: () => {}
        })
      )
    ),
    // Keyboard hint/footer
    M8.createElement(
      g,
      { paddingX: 1 },
      M8.createElement(
        _,
        { dimColor: true },
        keyboardState.pending
          ? M8.createElement(M8.Fragment, null, "Press ", keyboardState.keyName, " again to exit")
          : M8.createElement(M8.Fragment, null, "Enter to confirm · Esc to exit")
      )
    )
  );
}

module.exports = ModelSelectorColumn;