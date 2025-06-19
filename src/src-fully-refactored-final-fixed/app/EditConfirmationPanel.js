/**
 * Renders a confirmation panel for editing a file, including context about the IDE and file path.
 * Displays options for the user to confirm or cancel the edit action.
 *
 * @param {Object} params - The parameters for rendering the panel.
 * @param {function} params.onChange - Callback invoked when the user selects an option or cancels.
 * @param {Array} params.options - List of selectable options for the user.
 * @param {any} params.input - The current input or selection context (passed to onChange).
 * @param {string} params.filePath - The path of the file being edited.
 * @param {string} params.ideName - The name of the IDE where the file is open.
 * @returns {React.ReactElement} The rendered confirmation panel component.
 */
function EditConfirmationPanel({
  onChange,
  options,
  input,
  filePath,
  ideName
}) {
  // Retrieve themed styles for permission color
  const themeStyles = getThemeStylesheet();

  return bG.createElement(
    g,
    {
      flexDirection: "column",
      borderStyle: "round",
      borderColor: themeStyles.permission,
      marginTop: 1,
      paddingLeft: 1,
      paddingRight: 1,
      paddingBottom: 1
    },
    // Header section: IDE info and save prompt
    bG.createElement(
      g,
      {
        flexDirection: "column",
        padding: 1
      },
      bG.createElement(
        _,
        {
          bold: true,
          color: themeStyles.permission
        },
        "Opened changes in ",
        ideName,
        " ⧉"
      ),
      // Show save prompt if jR is truthy (likely a global flag)
      jR && bG.createElement(
        _,
        {
          dimColor: true
        },
        "Save file to continue…"
      )
    ),
    // Main confirmation message and options
    bG.createElement(
      g,
      {
        flexDirection: "column"
      },
      bG.createElement(
        _,
        null,
        "normalizeToError you want to make this edit to ",
        bG.createElement(
          _,
          { bold: true },
          lW5(filePath)
        ),
        "?"
      ),
      bG.createElement(
        SelectableOptionsList,
        {
          options: options,
          // Passes the selected option and input context to onChange
          onChange: selectedOption => onChange(selectedOption, input),
          // Cancels the edit, passing 'no' and input context
          onCancel: () => onChange("no", input)
        }
      )
    )
  );
}

module.exports = EditConfirmationPanel;