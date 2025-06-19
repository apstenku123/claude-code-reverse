/**
 * Renders a permission rule input UI component, allowing users to add a new permission rule.
 * Handles user input, submission, and cancellation events.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onCancel - Callback invoked when the user cancels input (e.g., presses Escape).
 * @param {Function} props.onSubmit - Callback invoked with the parsed permission rule and rule behavior when the user submits input.
 * @param {string} props.ruleBehavior - The type of permission rule being added (e.g., 'allow', 'deny').
 * @returns {React.ReactElement} The rendered permission rule input component.
 */
function PermissionRuleInput({
  onCancel,
  onSubmit,
  ruleBehavior
}) {
  // Get current theme styles
  const theme = getThemeStylesheet();

  // State for the current input value
  const [inputValue, setInputValue] = PP2.useState("");

  // Get keyboard interaction state (e.g., for showing exit hints)
  const keyboardState = useCtrlKeyActionHandler();

  // Handle Escape key to trigger cancellation
  D0((_, keyEvent) => {
    if (keyEvent.escape) {
      onCancel();
    }
  });

  // Get terminal columns for input sizing
  const { columns: terminalColumns } = Z4();
  const inputFieldWidth = terminalColumns - 6;

  /**
   * Handles submission of the permission rule input.
   * Trims input, parses isBlobOrFileLikeObject, and calls onSubmit with the parsed rule and behavior.
   * @param {string} value - The raw input value from the user.
   */
  const handleSubmit = (value) => {
    const trimmedValue = value.trim();
    if (trimmedValue.length === 0) return;
    const parsedRule = parseToolNameAndRuleContent(trimmedValue);
    onSubmit(parsedRule, ruleBehavior);
  };

  // Render the permission rule input UI
  return q5.createElement(
    q5.Fragment,
    null,
    // Main container with border and padding
    q5.createElement(
      g,
      {
        flexDirection: "column",
        gap: 1,
        borderStyle: "round",
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: theme.permission
      },
      // Header: Add [ruleBehavior] permission rule
      q5.createElement(
        _,
        {
          bold: true,
          color: theme.permission
        },
        "Add ", ruleBehavior, " permission rule"
      ),
      // Description and examples
      q5.createElement(
        g,
        { flexDirection: "column" },
        q5.createElement(
          _,
          null,
          "Permission rules are a tool name, optionally followed by a specifier in parentheses.",
          q5.createElement(RG, null),
          "e.g., ",
          q5.createElement(
            _,
            { bold: true },
            formatToolNameWithRule({ toolName: EW.name })
          ),
          q5.createElement(
            _,
            { bold: false },
            " or "
          ),
          q5.createElement(
            _,
            { bold: true },
            formatToolNameWithRule({ toolName: P4.name, ruleContent: "ls:*" })
          )
        )
      ),
      // Input field for permission rule
      q5.createElement(
        g,
        {
          borderColor: theme.secondaryBorder,
          borderDimColor: true,
          borderStyle: "round",
          marginY: 1,
          paddingLeft: 1
        },
        q5.createElement(TextInputWithController, {
          showCursor: true,
          value: inputValue,
          onChange: setInputValue,
          onSubmit: handleSubmit,
          placeholder: `Enter permission rule${y0.ellipsis}`,
          columns: inputFieldWidth,
          cursorOffset: inputValue.length,
          onChangeCursorOffset: () => {}
        })
      )
    ),
    // Footer: Show exit/submit hints
    q5.createElement(
      g,
      { marginLeft: 3 },
      keyboardState.pending
        ? q5.createElement(
            _,
            { dimColor: true },
            "Press ", keyboardState.keyName, " again to exit"
          )
        : q5.createElement(
            _,
            { dimColor: true },
            "Enter to submit · Esc to cancel"
          )
    )
  );
}

module.exports = PermissionRuleInput;