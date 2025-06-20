/**
 * Displays an error UI component, handles user exit or reset actions, and manages process termination.
 *
 * @param {Object} params - The parameters object.
 * @param {Object} params.error - The error object containing details about the error.
 * @param {string} params.error.filePath - The file path related to the error.
 * @param {string} params.error.message - The error message to display.
 * @param {Object} params.error.defaultConfig - The default configuration to restore on reset.
 * @returns {void}
 */
function showErrorAndHandleReset({ error }) {
  // Render the error UI and get the unmount function
  const { unmount } = C8(
    $zA.default.createElement(
      h3,
      null,
      $zA.default.createElement(renderConfigurationErrorPrompt, {
        filePath: error.filePath,
        errorDescription: error.message,
        onExit: () => {
          // Unmount the UI and exit the process with error code
          unmount();
          process.exit(1);
        },
        onReset: () => {
          // Overwrite the file with the default config, unmount, and exit successfully
          f1().writeFileSync(
            error.filePath,
            JSON.stringify(error.defaultConfig, null, 2),
            {
              flush: false,
              encoding: "utf8"
            }
          );
          unmount();
          process.exit(0);
        }
      })
    ),
    {
      exitOnCtrlC: false
    }
  );
}

module.exports = showErrorAndHandleReset;