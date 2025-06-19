/**
 * Renders a theme selection and preview UI for terminal applications.
 *
 * @param {Object} params - The configuration object for the theme preview.
 * @param {string} params.initialTheme - The initial theme to display as selected.
 * @param {function} params.onThemeSelect - Callback invoked when a theme is selected.
 * @param {boolean} [params.showIntroText=false] - Whether to show introductory text at the top.
 * @param {string} [params.helpText=""] - Optional help text to display.
 * @param {boolean} [params.showHelpTextBelow=false] - Whether to show help text below the main UI.
 * @param {boolean} [params.hideEscToCancel=false] - If true, hides the 'Esc to cancel' message.
 * @param {boolean} [params.skipExitHandling=false] - If true, disables exit/cancel handling.
 * @returns {React.ReactElement} The rendered theme preview component.
 */
function renderThemePreview({
  initialTheme,
  onThemeSelect,
  showIntroText = false,
  helpText = "",
  showHelpTextBelow = false,
  hideEscToCancel = false,
  skipExitHandling = false
}) {
  // Handles exit/cancel logic unless skipExitHandling is true
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

  // Main content block for the theme preview UI
  const mainContent = _4.createElement(g, {
    flexDirection: "column",
    gap: 1,
    paddingLeft: 1
  },
    // Optional intro text
    showIntroText && _4.createElement(_, null, "Let'createInteractionAccessor get started."),

    // Theme selection prompt and optional help text (above)
    _4.createElement(g, { flexDirection: "column" },
      _4.createElement(_, { bold: true }, "Choose the text style that looks best with your terminal:"),
      helpText && !showHelpTextBelow && _4.createElement(_, { dimColor: true }, helpText)
    ),

    // Theme selection menu
    _4.createElement(SelectableOptionsList, {
      options: themeOptions,
      onFocus: setSelectedTheme,
      onChange: onThemeSelect,
      onCancel: skipExitHandling ? () => {} : async () => { await performCleanupAndExit(0); },
      visibleOptionCount: 6,
      defaultValue: selectedTheme
    }),

    // Preview section
    _4.createElement(g, {
      flexDirection: "column",
      paddingTop: 1
    },
      _4.createElement(_, { bold: true }, "Preview"),
      _4.createElement(g, {
        paddingLeft: 1,
        marginRight: 1,
        borderStyle: "round",
        flexDirection: "column"
      },
        // Example code diff preview
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

  // If not showing intro text, wrap main content with border and show help/cancel info
  if (!showIntroText) {
    return _4.createElement(_4.Fragment, null,
      _4.createElement(g, {
        flexDirection: "column",
        borderStyle: "round",
        paddingX: 1,
        marginTop: 1
      }, mainContent),

      // Optional help text below
      showHelpTextBelow && helpText && _4.createElement(g, {
        marginLeft: 3,
        marginTop: 1
      }, _4.createElement(_, { dimColor: true }, helpText)),

      // Optional 'Esc to cancel' message
      !hideEscToCancel && _4.createElement(g, {
        marginLeft: 3
      }, _4.createElement(_, { dimColor: true },
        exitHandler.pending
          ? _4.createElement(_4.Fragment, null, "Press ", exitHandler.keyName, " again to exit")
          : _4.createElement(_4.Fragment, null, "Esc to cancel")
      ))
    );
  }

  // If showing intro text, just return the main content
  return mainContent;
}

module.exports = renderThemePreview;