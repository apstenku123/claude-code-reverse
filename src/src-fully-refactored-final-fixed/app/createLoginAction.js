/**
 * @function createLoginAction
 * @description
 *   Creates a login action object for the local-jsx system, providing metadata and a handler for login flow.
 *   The action displays a login UI, handles completion, and triggers API key change callbacks.
 *
 * @returns {object} An action object with login metadata and a call handler.
 */
function createLoginAction() {
  return {
    /**
     * The type of this action, used by the system to identify its handler.
     */
    type: "local-jsx",

    /**
     * The internal name of this action.
     */
    name: "login",

    /**
     * The user-facing description of the action, which changes depending on account state.
     */
    description: getAnthropicApiKey(false)
      ? "Switch Anthropic accounts"
      : "Sign in with your Anthropic account",

    /**
     * Determines if the action is enabled. Always returns true.
     * @returns {boolean}
     */
    isEnabled: () => true,

    /**
     * Determines if the action should be hidden from the UI. Always false.
     */
    isHidden: false,

    /**
     * Handles the login action when invoked.
     *
     * @async
     * @param {function} resolveLoginResult - Callback to resolve the login result message.
     * @param {object} actionConfig - Configuration object, must have an onChangeAPIKey() callback.
     * @returns {Promise<ReactElement>} The rendered login UI component.
     */
    async call(resolveLoginResult, actionConfig) {
      // Ensure any required preconditions or setup is complete
      await clearConsoleScreen();

      // Render the login dialog component
      return bI.createElement(ExitPromptComponent, {
        /**
         * Called when the login dialog is done (either success or interruption)
         * @param {boolean} loginSuccess - True if login succeeded, false if interrupted
         * @param {object} model - The login model returned from the dialog
         */
        onDone: async (loginSuccess, model) => {
          // Show a confirmation dialog with the login model
          ZA1(
            bI.createElement(renderWelcomePanel, {
              model: model
            })
          );

          // Notify the system that the API key has changed
          actionConfig.onChangeAPIKey();

          // Resolve the login result with an appropriate message
          resolveLoginResult(
            loginSuccess ? "Login successful" : "Login interrupted"
          );
        }
      });
    },

    /**
     * Returns the user-facing name of the action.
     * @returns {string}
     */
    userFacingName() {
      return "login";
    }
  };
}

module.exports = createLoginAction;