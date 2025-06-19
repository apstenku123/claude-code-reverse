/**
 * Renders a confirmation panel for tool usage, displaying Claude'createInteractionAccessor plan and asking the user to proceed or keep planning.
 * Handles user confirmation or rejection, updates tool permission context, and triggers appropriate callbacks.
 *
 * @param {Object} props - The properties for the confirmation panel.
 * @param {Object} props.toolUseConfirm - Contains context and callbacks for tool usage confirmation.
 * @param {Function} props.setToolPermissionContext - Function to update the tool permission context.
 * @param {Function} props.onDone - Callback to invoke when the confirmation process is done.
 * @param {Function} props.onReject - Callback to invoke when the confirmation is rejected.
 * @returns {React.ReactElement} The rendered confirmation panel component.
 */
function ToolUseConfirmationPanel({
  toolUseConfirm,
  setToolPermissionContext,
  onDone,
  onReject
}) {
  // Retrieve theme styles for consistent UI appearance
  const themeStyles = getThemeStylesheet();

  /**
   * Handles the user'createInteractionAccessor confirmation decision.
   * @param {string} userDecision - 'yes' to proceed, 'no' to reject.
   */
  function handleUserDecision(userDecision) {
    if (userDecision === "yes") {
      // Accept edits: update context, call onDone, and trigger onAllow callback
      setToolPermissionContext({
        ...toolUseConfirm.toolUseContext.getToolPermissionContext(),
        mode: "acceptEdits"
      });
      onDone();
      toolUseConfirm.onAllow("temporary", toolUseConfirm.input);
    } else {
      // Reject: call onDone, onReject, and trigger onReject callback
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
    DE.default.createElement(renderPermissionTitle, {
      title: "Ready to code?"
    }),
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
      DE.default.createElement(g, {
        marginTop: 1
      },
        DE.default.createElement(SelectableOptionsList, {
          options: [
            { label: "Yes", value: "yes" },
            { label: "No, keep planning", value: "no" }
          ],
          onChange: decision => handleUserDecision(decision),
          onCancel: () => handleUserDecision("no")
        })
      )
    )
  );
}

module.exports = ToolUseConfirmationPanel;