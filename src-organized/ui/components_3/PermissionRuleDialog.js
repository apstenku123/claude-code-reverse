/**
 * Renders a dialog for adding permission rules, allowing the user to select where the rules should be saved.
 * Handles keyboard events for canceling and processes rule addition based on user selection.
 *
 * @param {Object} params - The parameters for the dialog.
 * @param {Function} params.onAddRules - Callback to invoke when rules are added.
 * @param {Function} params.onCancel - Callback to invoke when the dialog is canceled.
 * @param {Array<any>} params.ruleValues - The values of the rules to be added.
 * @param {string} params.ruleBehavior - The behavior type for the rules (e.g., 'allow', 'deny').
 * @param {any} params.initialContext - The initial context for the permission tool.
 * @param {Function} params.setToolPermissionContext - Function to set the tool'createInteractionAccessor permission context.
 * @returns {React.ReactElement} The rendered permission rule dialog component.
 */
function PermissionRuleDialog({
  onAddRules,
  onCancel,
  ruleValues,
  ruleBehavior,
  initialContext,
  setToolPermissionContext
}) {
  // Get theme styles for permission UI elements
  const theme = getThemeStylesheet();

  // Map available destinations for saving rules
  const destinationOptions = RP2.map(getSettingsOptionDetails);

  // Get keyboard navigation state (e.g., pending, keyName)
  const keyboardState = useCtrlKeyActionHandler();

  // Register a handler for keyboard events (e.g., Esc to cancel)
  D0((_, keyEvent) => {
    if (keyEvent.escape) {
      onCancel();
    }
  });

  // Handler for when the user selects a destination or cancels
  const handleDestinationChange = OP2.useCallback(
    (selectedValue) => {
      if (selectedValue === "cancel") {
        onCancel();
        return;
      }
      // If the selected value is a valid destination
      if (RP2.includes(selectedValue)) {
        const destination = selectedValue;
        // Set up the permission context for the selected destination
        updatePermissionContextWithRuleValues({
          ruleValues,
          ruleBehavior,
          destination,
          initialContext,
          setToolPermissionContext
        });
        // Prepare rule entries for the callback
        const ruleEntries = ruleValues.map(ruleValue => ({
          ruleValue,
          ruleBehavior,
          source: destination
        }));
        // Notify parent with the new rules
        onAddRules(ruleEntries);
      }
    },
    [onAddRules, onCancel, ruleValues, ruleBehavior, initialContext, setToolPermissionContext]
  );

  // Render the permission rule dialog UI
  return $5.createElement(
    $5.Fragment,
    null,
    // Main dialog container
    $5.createElement(
      g,
      {
        flexDirection: "column",
        borderStyle: "round",
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: theme.permission
      },
      // Header: Add permission rule(createInteractionAccessor)
      $5.createElement(
        _,
        {
          bold: true,
          color: theme.permission
        },
        "Add ",
        ruleBehavior,
        " permission rule",
        ruleValues.length === 1 ? "" : "createInteractionAccessor",
        $5.createElement(RG, null)
      ),
      // List each rule value
      $5.createElement(
        g,
        {
          flexDirection: "column",
          paddingX: 2
        },
        ruleValues.map(ruleValue =>
          $5.createElement(
            g,
            {
              flexDirection: "column",
              key: formatToolNameWithRule(ruleValue)
            },
            $5.createElement(
              _,
              { bold: true },
              formatToolNameWithRule(ruleValue)
            ),
            $5.createElement(renderRuleDescription, { ruleValue })
          )
        )
      ),
      // Destination selection prompt
      $5.createElement(
        g,
        {
          flexDirection: "column",
          marginY: 1
        },
        $5.createElement(
          _,
          null,
          ruleValues.length === 1
            ? "Where should this rule be saved?"
            : "Where should these rules be saved?"
        ),
        $5.createElement(SelectableOptionsList, {
          options: destinationOptions,
          onChange: handleDestinationChange,
          onCancel
        })
      )
    ),
    // Keyboard navigation/help footer
    $5.createElement(
      g,
      { marginLeft: 3 },
      keyboardState.pending
        ? $5.createElement(
            _,
            { dimColor: true },
            "Press ",
            keyboardState.keyName,
            " again to exit"
          )
        : $5.createElement(
            _,
            { dimColor: true },
            "↑/↓ to select · Enter to confirm · Esc to cancel"
          )
    )
  );
}

module.exports = PermissionRuleDialog;