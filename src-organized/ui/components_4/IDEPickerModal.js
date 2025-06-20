/**
 * Displays a modal UI for selecting an available IDE or viewing unavailable IDEs.
 * Provides options to connect to an IDE for integrated development features.
 *
 * @param {Object} params - The parameters object.
 * @param {Array<Object>} params.availableIDEs - List of available IDEs with name, port, and workspaceFolders.
 * @param {Array<Object>} params.unavailableIDEs - List of detected IDEs that are not available for connection.
 * @param {Object} params.selectedIDE - The currently selected IDE object (may be undefined).
 * @param {Function} params.onClose - Callback invoked when the modal is closed.
 * @param {Function} params.onSelect - Callback invoked when an IDE is selected.
 * @returns {React.ReactElement} The rendered modal component for IDE selection.
 */
function IDEPickerModal({
  availableIDEs,
  unavailableIDEs,
  selectedIDE,
  onClose,
  onSelect
}) {
  // Get theme styles for consistent UI appearance
  const theme = getThemeStylesheet();
  // Get keyboard state (e.g., pending, keyName)
  const keyboardState = getKeyboardState();

  // State: currently selected IDE port as string (or 'None')
  const [selectedPort, setSelectedPort] = YB.useState(
    selectedIDE?.port?.toString() ?? "None"
  );

  // Handler: when an IDE is selected from the dropdown
  const handleSelectIDE = YB.useCallback(
    (portString) => {
      // Find the IDE object by port and invoke onSelect callback
      const selected = availableIDEs.find(
        (ide) => ide.port === parseInt(portString)
      );
      onSelect(selected);
    },
    [availableIDEs, onSelect]
  );

  // Build options for the IDE dropdown
  const ideOptions = availableIDEs
    .map((ide) => ({
      label: `${ide.name}`,
      value: ide.port.toString()
    }))
    .concat([
      {
        label: "None",
        value: "None"
      }
    ]);

  // Register global key handler: close modal on Escape
  useGlobalKeyHandler((_, keyEvent) => {
    if (keyEvent.escape) onClose();
  });

  return YB.default.createElement(
    Container, // Outer container
    {
      marginTop: 1,
      flexDirection: "column"
    },
    YB.default.createElement(
      Container, // Modal box
      {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: theme.remember,
        paddingX: 2,
        paddingY: 1,
        width: "100%"
      },
      YB.default.createElement(
        Container,
        { flexDirection: "column" },
        YB.default.createElement(Text, {
          color: theme.remember,
          bold: true
        }, "Select IDE"),
        YB.default.createElement(Text, {
          dimColor: true
        }, "Connect to an IDE for integrated development features."),
        // If no available IDEs, show help message
        availableIDEs.length === 0 &&
          YB.default.createElement(
            Container,
            { marginTop: 1 },
            YB.default.createElement(
              Text,
              { dimColor: true },
              kZ
                ? `No available IDEs detected. Please install the plugin and restart your IDE:
https://docs.anthropic.com/createInteractionAccessor/claude-code-jetbrains`
                : "No available IDEs detected. Make sure your IDE has the Claude Code extension or plugin installed and is running."
            )
          )
      ),
      // If there are available IDEs, show the dropdown
      availableIDEs.length !== 0 &&
        YB.default.createElement(
          Container,
          {
            flexDirection: "column",
            paddingX: 1,
            marginTop: 1
          },
          YB.default.createElement(SelectableOptionsList, {
            defaultValue: selectedPort,
            focusValue: selectedPort,
            options: ideOptions,
            onFocus: (port) => setSelectedPort(port),
            onChange: (port) => {
              setSelectedPort(port);
              handleSelectIDE(port);
            },
            onCancel: () => onClose()
          })
        ),
      // If there are unavailable IDEs, show their info
      unavailableIDEs.length > 0 &&
        YB.default.createElement(
          Container,
          {
            marginTop: 1,
            flexDirection: "column"
          },
          YB.default.createElement(
            Text,
            { dimColor: true },
            "Found ",
            unavailableIDEs.length,
            " other running IDE(createInteractionAccessor). However, their workspace/project directories do not match the current cwd."
          ),
          YB.default.createElement(
            Container,
            { marginTop: 1, flexDirection: "column" },
            unavailableIDEs.map((ide, idx) =>
              YB.default.createElement(
                Container,
                { key: idx, paddingLeft: 3 },
                YB.default.createElement(
                  Text,
                  { dimColor: true },
                  "• ",
                  ide.name,
                  ": ",
                  ide.workspaceFolders.join(", ")
                )
              )
            )
          )
        )
    ),
    // Footer: instructions for user
    YB.default.createElement(
      Container,
      { paddingX: 1 },
      YB.default.createElement(
        Text,
        { dimColor: true },
        keyboardState.pending
          ? YB.default.createElement(
              YB.default.Fragment,
              null,
              "Press ",
              keyboardState.keyName,
              " again to exit"
            )
          : YB.default.createElement(
              YB.default.Fragment,
              null,
              availableIDEs.length !== 0 && "Enter to confirm · ",
              "Esc to exit"
            )
      )
    )
  );
}

// Dependency mappings for clarity
const getThemeStylesheet = getThemeStylesheet;
const getKeyboardState = useCtrlKeyActionHandler;
const useGlobalKeyHandler = D0;
const Container = g;
const Text = _;

module.exports = IDEPickerModal;