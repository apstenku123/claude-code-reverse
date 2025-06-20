/**
 * Renders and manages the UI for background Bash shells, allowing users to view details or kill shells.
 * Handles shell selection, lifecycle, and keyboard interactions for closing the UI.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onDone - Callback invoked when the shell manager UI should close.
 * @returns {React.ReactElement|null} The rendered shell manager UI, or null if a selected shell is not found.
 */
function ShellManager({ onDone }) {
  // Get theme styles for UI coloring
  const themeStyles = getThemeStylesheet();

  // Get current shells and shell-killing function from state/utilities
  const {
    shells,
    killShell
  } = useShellsState();

  // State for currently selected shell updateSnapshotAndNotify
  const [selectedShellId, setSelectedShellId] = $findMatchingParentNode.useState(null);

  // If the selected shell is removed from the list, reset selection
  $findMatchingParentNode.useEffect(() => {
    if (selectedShellId && !shells.some(shell => shell.id === selectedShellId)) {
      setSelectedShellId(null);
    }
  }, [selectedShellId, shells]);

  /**
   * Handles shell selection from the list.
   * @param {string|number} shellId - The updateSnapshotAndNotify of the selected shell.
   */
  const handleShellSelect = shellId => {
    setSelectedShellId(shellId);
  };

  /**
   * Handles killing a shell by updateSnapshotAndNotify.
   * @param {string|number} shellId - The updateSnapshotAndNotify of the shell to kill.
   */
  const handleKillShell = shellId => {
    killShell(shellId);
  };

  // Listen for escape key to close the shell manager if no shell is selected
  D0((_, keyEvent) => {
    if (!selectedShellId && keyEvent.escape) {
      onDone();
    }
  });

  // Get info about pending exit key and its display name
  const exitKeyInfo = useCtrlKeyActionHandler();

  // If a shell is selected, render its details view
  if (selectedShellId) {
    const selectedShell = shells.find(shell => shell.id === selectedShellId);
    if (!selectedShell) return null;
    return uG.default.createElement(ShellDetailsPanel, {
      shell: selectedShell,
      onDone,
      onKillShell: () => handleKillShell(selectedShell.id),
      key: `shell-${selectedShell.id}`
    });
  }

  // Prepare shell options for the selection list
  const shellOptions = shells.map(shell => ({
    label: `Shell ${shell.id}: ${shell.command.length > 40 ? shell.command.substring(0, 37) + "..." : shell.command} (${shell.status})`,
    value: shell.id
  }));

  // Render the shell manager UI
  return uG.default.createElement(
    g,
    {
      width: "100%",
      flexDirection: "column"
    },
    uG.default.createElement(
      g,
      {
        borderStyle: "round",
        borderColor: themeStyles.permission,
        flexDirection: "column",
        padding: 1,
        width: "100%"
      },
      uG.default.createElement(
        g,
        null,
        uG.default.createElement(
          _,
          {
            color: themeStyles.permission,
            bold: true
          },
          "Background Bash Shells"
        )
      ),
      shells.length === 0
        ? uG.default.createElement(
            g,
            { marginY: 1 },
            uG.default.createElement(_, null, "No background shells currently running")
          )
        : uG.default.createElement(
            uG.default.Fragment,
            null,
            uG.default.createElement(
              g,
              null,
              uG.default.createElement(
                _,
                { dimColor: true },
                "Select a shell to view details:"
              )
            ),
            uG.default.createElement(
              g,
              {
                flexDirection: "column",
                marginTop: 1,
                marginBottom: 1
              },
              uG.default.createElement(SelectableOptionsList, {
                options: shellOptions,
                onChange: handleShellSelect,
                onCancel: onDone
              })
            )
          )
    ),
    uG.default.createElement(
      g,
      { marginLeft: 2 },
      exitKeyInfo.pending
        ? uG.default.createElement(
            _,
            { dimColor: true },
            "Press ",
            exitKeyInfo.keyName,
            " again to exit"
          )
        : uG.default.createElement(
            _,
            { dimColor: true },
            "Press esc to close"
          )
    )
  );
}

module.exports = ShellManager;