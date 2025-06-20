/**
 * Displays an error UI component, and handles user actions to either exit the process or reset the configuration file.
 *
 * @param {Object} params - The parameters object.
 * @param {Object} params.error - The error object containing details about the error.
 * @param {string} params.error.filePath - The path to the configuration file that caused the error.
 * @param {string} params.error.message - The error message to display.
 * @param {Object} params.error.defaultConfig - The default configuration to reset to if requested.
 * @returns {void}
 */
function showErrorAndHandleConfigReset({ error }) {
  // Render the error UI and get the unmount function
  const { unmount } = C8(
    $zA.default.createElement(
      h3,
      null,
      $zA.default.createElement(renderConfigurationErrorPrompt, {
        filePath: error.filePath,
        errorDescription: error.message,
        onExit: () => {
          // Unmount the UI and exit with error code
          unmount();
          process.exit(1);
        },
        onReset: () => {
          // Overwrite the config file with the default config, unmount, and exit cleanly
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

module.exports = showErrorAndHandleConfigReset;