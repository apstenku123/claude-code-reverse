/**
 * Renders a confirmation panel for editing a file, including file info, IDE name, and edit options.
 *
 * @param {Object} params - The parameters for rendering the panel.
 * @param {function} params.onChange - Callback invoked when an option is selected or cancelled.
 * @param {Array} params.options - List of options to present to the user.
 * @param {any} params.input - The current input context or value.
 * @param {string} params.filePath - The path of the file being edited.
 * @param {string} params.ideName - The name of the IDE in use.
 * @returns {React.ReactElement} The rendered confirmation panel React element.
 */
function renderEditConfirmationPanel({
  onChange,
  options,
  input,
  filePath,
  ideName
}) {
  // Retrieve the current theme'createInteractionAccessor stylesheet for consistent styling
  const theme = getThemeStylesheet();

  return bG.createElement(
    g,
    {
      flexDirection: "column",
      borderStyle: "round",
      borderColor: theme.permission,
      marginTop: 1,
      paddingLeft: 1,
      paddingRight: 1,
      paddingBottom: 1
    },
    // Header section: shows which IDE is open and a save reminder if needed
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
          color: theme.permission
        },
        "Opened changes in ",
        ideName,
        " ⧉"
      ),
      // Show save reminder if jR is truthy (likely a global flag)
      jR &&
        bG.createElement(
          _,
          {
            dimColor: true
          },
          "Save file to continue…"
        )
    ),
    // Main confirmation prompt
    bG.createElement(
      g,
      {
        flexDirection: "column"
      },
      bG.createElement(
        _,
        null,
        "normalizeToError you want to make this edit to",
        " ",
        bG.createElement(
          _,
          {
            bold: true
          },
          lW5(filePath)
        ),
        "?"
      ),
      // Render the options selector component
      bG.createElement(SelectableOptionsList, {
        options: options,
        // Passes the selected option and input context to the onChange handler
        onChange: selectedOption => onChange(selectedOption, input),
        // Handles cancellation by passing "no" as the selected option
        onCancel: () => onChange("no", input)
      })
    )
  );
}

module.exports = renderEditConfirmationPanel;