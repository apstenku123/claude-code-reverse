/**
 * Renders a confirmation dialog for proceeding with a coding plan, allowing the user to accept or reject the plan.
 *
 * @param {Object} props - The properties for the dialog.
 * @param {Object} props.toolUseConfirm - Contains context and handlers for tool use confirmation.
 * @param {Function} props.setToolPermissionContext - Updates the tool permission context.
 * @param {Function} props.onDone - Callback invoked when the dialog is completed (regardless of choice).
 * @param {Function} props.onReject - Callback invoked when the plan is rejected.
 * @returns {React.ReactElement} The rendered confirmation dialog component.
 */
function ToolUseConfirmationDialog({
  toolUseConfirm,
  setToolPermissionContext,
  onDone,
  onReject
}) {
  // Retrieve the current theme styles
  const themeStyles = getThemeStylesheet();

  /**
   * Handles the user'createInteractionAccessor response to the confirmation dialog.
   * @param {string} userChoice - The user'createInteractionAccessor choice, either 'yes' or 'no'.
   */
  function handleUserChoice(userChoice) {
    if (userChoice === "yes") {
      // Accept edits: update permission context, call onDone, and notify allow handler
      setToolPermissionContext({
        ...toolUseConfirm.toolUseContext.getToolPermissionContext(),
        mode: "acceptEdits"
      });
      onDone();
      toolUseConfirm.onAllow("temporary", toolUseConfirm.input);
    } else {
      // Reject: call onDone, onReject, and notify reject handler
      onDone();
      onReject();
      toolUseConfirm.onReject();
    }
  }

  return DE.default.createElement(g, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: themeStyles.planMode,
    marginTop: 1,
    paddingLeft: 1,
    paddingRight: 1,
    paddingBottom: 1
  },
    // Title
    DE.default.createElement(renderPermissionTitle, {
      title: "Ready to code?"
    }),
    // Plan summary and confirmation prompt
    DE.default.createElement(g, {
      flexDirection: "column",
      marginTop: 1
    },
      DE.default.createElement(_, null, "Here is Claude'createInteractionAccessor plan:"),
      DE.default.createElement(g, {
        borderStyle: "round",
        borderColor: themeStyles.secondaryText,
        marginBottom: 1,
        paddingX: 1
      },
        DE.default.createElement(_, null, processAndFormatTokens(toolUseConfirm.input.plan))
      ),
      DE.default.createElement(_, {
        color: themeStyles.secondaryText
      }, "Would you like to proceed?"),
      // Yes/No options
      DE.default.createElement(g, {
        marginTop: 1
      },
        DE.default.createElement(SelectableOptionsList, {
          options: [
            { label: "Yes", value: "yes" },
            { label: "No, keep planning", value: "no" }
          ],
          onChange: handleUserChoice,
          onCancel: () => handleUserChoice("no")
        })
      )
    )
  );
}

module.exports = ToolUseConfirmationDialog;