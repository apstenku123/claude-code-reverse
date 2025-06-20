/**
 * Renders a theme selection and preview UI for terminal applications.
 *
 * @param {Object} params - The parameters for the theme preview selector.
 * @param {string} params.initialTheme - The currently selected theme value.
 * @param {function} params.onThemeSelect - Callback invoked when a theme is selected.
 * @param {boolean} [params.showIntroText=false] - Whether to show the introductory text.
 * @param {string} [params.helpText=""] - Optional help text to display.
 * @param {boolean} [params.showHelpTextBelow=false] - If true, help text is shown below the selector.
 * @param {boolean} [params.hideEscToCancel=false] - If true, hides the 'Esc to cancel' prompt.
 * @param {boolean} [params.skipExitHandling=false] - If true, disables exit handling logic.
 * @returns {React.ReactElement} The rendered theme selector and preview component.
 */
function ThemePreviewSelector({
  initialTheme,
  onThemeSelect,
  showIntroText = false,
  helpText = "",
  showHelpTextBelow = false,
  hideEscToCancel = false,
  skipExitHandling = false
}) {
  // Setup exit/cancel handler, or a no-op if skipping exit handling
  const exitHandler = useCtrlKeyActionHandler(skipExitHandling ? () => {} : undefined);

  // State for the currently focused/selected theme option
  const [selectedTheme, setSelectedTheme] = cR2.useState(showIntroText ? undefined : initialTheme);

  // Theme options for the selector
  const themeOptions = [
    { label: "Dark mode", value: "dark" },
    { label: "Light mode", value: "light" },
    { label: "Dark mode (colorblind-friendly)", value: "dark-daltonized" },
    { label: "Light mode (colorblind-friendly)", value: "light-daltonized" },
    { label: "Dark mode (ANSI colors only)", value: "dark-ansi" },
    { label: "Light mode (ANSI colors only)", value: "light-ansi" }
  ];

  // Main content for the selector and preview
  const selectorContent = _4.createElement(
    g, // Container
    {
      flexDirection: "column",
      gap: 1,
      paddingLeft: 1
    },
    // Optional intro text
    showIntroText && _4.createElement(_, null, "Let'createInteractionAccessor get started."),
    // Theme selection prompt and help text (above selector)
    _4.createElement(
      g,
      { flexDirection: "column" },
      _4.createElement(_, { bold: true }, "Choose the text style that looks best with your terminal:"),
      helpText && !showHelpTextBelow && _4.createElement(_, { dimColor: true }, helpText)
    ),
    // Theme selector component
    _4.createElement(SelectableOptionsList, {
      options: themeOptions,
      onFocus: setSelectedTheme,
      onChange: onThemeSelect,
      onCancel: skipExitHandling ? () => {} : async () => { await performCleanupAndExit(0); },
      visibleOptionCount: 6,
      defaultValue: selectedTheme
    }),
    // Preview section
    _4.createElement(
      g,
      { flexDirection: "column", paddingTop: 1 },
      _4.createElement(_, { bold: true }, "Preview"),
      _4.createElement(
        g,
        {
          paddingLeft: 1,
          marginRight: 1,
          borderStyle: "round",
          flexDirection: "column"
        },
        _4.createElement(dD, {
          patch: {
            oldStart: 1,
            newStart: 1,
            oldLines: 3,
            newLines: 3,
            lines: [
              "function greet() {",
              '-  console.log("Hello, World!");',
              '+  console.log("Hello, Claude!");',
              "}"
            ]
          },
          dim: false,
          overrideTheme: selectedTheme || initialTheme
        })
      )
    )
  );

  // If not showing intro text, wrap in a bordered container and add help/cancel prompts
  if (!showIntroText) {
    return _4.createElement(
      _4.Fragment,
      null,
      // Main bordered container
      _4.createElement(
        g,
        {
          flexDirection: "column",
          borderStyle: "round",
          paddingX: 1,
          marginTop: 1
        },
        selectorContent
      ),
      // Help text below selector, if enabled
      showHelpTextBelow && helpText && _4.createElement(
        g,
        { marginLeft: 3, marginTop: 1 },
        _4.createElement(_, { dimColor: true }, helpText)
      ),
      // Esc to cancel prompt, if not hidden
      !hideEscToCancel && _4.createElement(
        g,
        { marginLeft: 3 },
        _4.createElement(
          _,
          { dimColor: true },
          exitHandler.pending
            ? _4.createElement(_4.Fragment, null, "Press ", exitHandler.keyName, " again to exit")
            : _4.createElement(_4.Fragment, null, "Esc to cancel")
        )
      )
    );
  }

  // Otherwise, just return the selector content
  return selectorContent;
}

module.exports = ThemePreviewSelector;