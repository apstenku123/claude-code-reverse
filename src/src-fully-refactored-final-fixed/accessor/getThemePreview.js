/**
 * Renders a theme selection and preview UI component for terminal applications.
 *
 * @param {Object} params - The configuration object for the preview component.
 * @param {string} params.initialTheme - The initial theme value to use (e.g., 'dark', 'light').
 * @param {function} params.onThemeSelect - Callback invoked when a theme is selected.
 * @param {boolean} [params.showIntroText=false] - Whether to show the introductory text at the top.
 * @param {string} [params.helpText=""] - Optional help text to display.
 * @param {boolean} [params.showHelpTextBelow=false] - If true, help text is shown below the main UI.
 * @param {boolean} [params.hideEscToCancel=false] - If true, hides the 'Esc to cancel' prompt.
 * @param {boolean} [params.skipExitHandling=false] - If true, disables exit handling logic.
 * @returns {React.ReactElement} The rendered theme preview component.
 */
function getThemePreview({
  initialTheme,
  onThemeSelect,
  showIntroText = false,
  helpText = "",
  showHelpTextBelow = false,
  hideEscToCancel = false,
  skipExitHandling = false
}) {
  // Setup exit/cancel handling, unless skipExitHandling is true
  const exitHandler = useCtrlKeyActionHandler(skipExitHandling ? () => {} : undefined);

  // State for the currently selected theme option
  const [selectedTheme, setSelectedTheme] = cR2.useState(showIntroText ? undefined : initialTheme);

  // Theme options for the selection menu
  const themeOptions = [
    { label: "Dark mode", value: "dark" },
    { label: "Light mode", value: "light" },
    { label: "Dark mode (colorblind-friendly)", value: "dark-daltonized" },
    { label: "Light mode (colorblind-friendly)", value: "light-daltonized" },
    { label: "Dark mode (ANSI colors only)", value: "dark-ansi" },
    { label: "Light mode (ANSI colors only)", value: "light-ansi" }
  ];

  // Main UI layout
  const mainContent = _4.createElement(
    g, // Container component
    {
      flexDirection: "column",
      gap: 1,
      paddingLeft: 1
    },
    // Optional intro text
    showIntroText && _4.createElement(_, null, "Let'createInteractionAccessor get started."),

    // Theme selection prompt and help text (above)
    _4.createElement(
      g,
      { flexDirection: "column" },
      _4.createElement(_, { bold: true }, "Choose the text style that looks best with your terminal:"),
      helpText && !showHelpTextBelow && _4.createElement(_, { dimColor: true }, helpText)
    ),

    // Theme selection menu
    _4.createElement(SelectableOptionsList, {
      options: themeOptions,
      onFocus: (optionValue) => setSelectedTheme(optionValue),
      onChange: onThemeSelect,
      onCancel: skipExitHandling ? () => {} : async () => {
        // If not skipping exit handling, call performCleanupAndExit(0) to handle cancel
        await performCleanupAndExit(0);
      },
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

  // If not showing intro text, wrap main content in additional containers and show help/cancel prompts
  if (!showIntroText) {
    return _4.createElement(
      _4.Fragment,
      null,
      // Main content with border and padding
      _4.createElement(
        g,
        {
          flexDirection: "column",
          borderStyle: "round",
          paddingX: 1,
          marginTop: 1
        },
        mainContent
      ),
      // Help text below, if specified
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

  // If showing intro text, just return the main content
  return mainContent;
}

module.exports = getThemePreview;