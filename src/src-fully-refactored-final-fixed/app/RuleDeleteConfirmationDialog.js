/**
 * Renders a confirmation dialog for deleting a rule, with special handling for managed (policy) rules.
 * @param {Object} params - The parameters for the dialog.
 * @param {Object} params.rule - The rule object containing rule details and source.
 * @param {Function} params.onDelete - Callback invoked when the user confirms deletion.
 * @param {Function} params.onCancel - Callback invoked when the user cancels the dialog.
 * @returns {React.ReactElement} The rendered confirmation dialog.
 */
function RuleDeleteConfirmationDialog({
  rule,
  onDelete,
  onCancel
}) {
  // Get theme colors/styles
  const theme = getThemeStylesheet();
  // Get pending state and key name for exit
  const exitState = useCtrlKeyActionHandler();

  // Listen for escape key to trigger cancel
  D0((_, keyEvent) => {
    if (keyEvent.escape) {
      onCancel();
    }
  });

  // Rule details section
  const ruleDetailsSection = R2.createElement(
    g,
    {
      flexDirection: "column",
      marginX: 2
    },
    R2.createElement(_, { bold: true }, formatToolNameWithRule(rule.ruleValue)),
    R2.createElement(renderRuleDescription, { ruleValue: rule.ruleValue }),
    R2.createElement(SourceRuleLabel, { rule })
  );

  // Footer section with exit/cancel instructions
  const footerSection = R2.createElement(
    g,
    { marginLeft: 3 },
    exitState.pending
      ? R2.createElement(_, { dimColor: true }, "Press ", exitState.keyName, " again to exit")
      : R2.createElement(_, { dimColor: true }, "Esc to cancel")
  );

  // If the rule is managed by policy, show a non-editable message
  if (rule.source === "policySettings") {
    return R2.createElement(
      R2.Fragment,
      null,
      R2.createElement(
        g,
        {
          flexDirection: "column",
          gap: 1,
          borderStyle: "round",
          paddingLeft: 1,
          paddingRight: 1,
          borderColor: theme.permission
        },
        R2.createElement(_, { bold: true, color: theme.permission }, "Rule details"),
        ruleDetailsSection,
        R2.createElement(
          _,
          { italic: true },
          "This rule is configured by managed settings and cannot be modified.",
          `\n`,
          "Contact your system administrator for more information."
        )
      ),
      footerSection
    );
  }

  // Otherwise, show the delete confirmation dialog
  return R2.createElement(
    R2.Fragment,
    null,
    R2.createElement(
      g,
      {
        flexDirection: "column",
        gap: 1,
        borderStyle: "round",
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: theme.error
      },
      R2.createElement(_, { bold: true, color: theme.error }, "Delete allowed tool?"),
      ruleDetailsSection,
      R2.createElement(
        _,
        null,
        "If deleted, you will have to confirm the next time ",
        m0,
        " tries to use this tool."
      ),
      R2.createElement(SelectableOptionsList, {
        onChange: (selectedValue) => selectedValue === "yes" ? onDelete() : onCancel(),
        onCancel: onCancel,
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" }
        ]
      })
    ),
    footerSection
  );
}

module.exports = RuleDeleteConfirmationDialog;