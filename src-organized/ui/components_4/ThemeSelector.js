/**
 * Renders a theme selection UI component with optional intro/help text and a preview.
 *
 * @param {Object} params - The parameters for the theme selector.
 * @param {string} params.initialTheme - The currently selected theme value.
 * @param {function} params.onThemeSelect - Callback when a theme is selected.
 * @param {boolean} [params.showIntroText=false] - Whether to show the intro text.
 * @param {string} [params.helpText=""] - Optional help text to display.
 * @param {boolean} [params.showHelpTextBelow=false] - If true, help text is shown below the selector.
 * @param {boolean} [params.hideEscToCancel=false] - If true, hides the 'Esc to cancel' message.
 * @param {boolean} [params.skipExitHandling=false] - If true, disables exit/cancel handling.
 * @returns {React.ReactElement} The rendered theme selector component.
 */
function ThemeSelector({
  initialTheme,
  onThemeSelect,
  showIntroText = false,
  helpText = "",
  showHelpTextBelow = false,
  hideEscToCancel = false,
  skipExitHandling = false
}) {
  // Setup exit/cancel handling unless skipExitHandling is true
  const exitHandler = useCtrlKeyActionHandler(skipExitHandling ? () => {} : undefined);

  // State for the currently focused/selected theme
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

  // Main content layout
  const mainContent = _4.createElement(g, {
    flexDirection: "column",
    gap: 1,
    paddingLeft: 1
  },
    // Optional intro text
    showIntroText && _4.createElement(_, null, "Let'createInteractionAccessor get started."),

    // Theme selection prompt and optional help text (above selector)
    _4.createElement(g, { flexDirection: "column" },
      _4.createElement(_, { bold: true }, "Choose the text style that looks best with your terminal:"),
      helpText && !showHelpTextBelow && _4.createElement(_, { dimColor: true }, helpText)
    ),

    // Theme selector component
    _4.createElement(SelectableOptionsList, {
      options: themeOptions,
      onFocus: theme => setSelectedTheme(theme),
      onChange: onThemeSelect,
      onCancel: skipExitHandling ? () => {} : async () => {
        // If not skipping exit handling, handle cancel (e.g., exit animation)
        await performCleanupAndExit(0);
      },
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

  // If intro text is not shown, wrap content with border and add help/cancel hints
  if (!showIntroText) {
    return _4.createElement(_4.Fragment, null,
      _4.createElement(g, {
        flexDirection: "column",
        borderStyle: "round",
        paddingX: 1,
        marginTop: 1
      }, mainContent),
      // Help text below selector if requested
      showHelpTextBelow && helpText && _4.createElement(g, {
        marginLeft: 3,
        marginTop: 1
      }, _4.createElement(_, { dimColor: true }, helpText)),
      // Esc to cancel hint (unless hidden)
      !hideEscToCancel && _4.createElement(g, {
        marginLeft: 3
      }, _4.createElement(_, { dimColor: true },
        exitHandler.pending
          ? _4.createElement(_4.Fragment, null, "Press ", exitHandler.keyName, " again to exit")
          : _4.createElement(_4.Fragment, null, "Esc to cancel")
      ))
    );
  }

  // Otherwise, just return the main content
  return mainContent;
}

module.exports = ThemeSelector;