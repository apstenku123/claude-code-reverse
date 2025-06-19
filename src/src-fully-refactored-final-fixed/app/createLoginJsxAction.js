/**
 * Creates a local-jsx action for logging in with an Anthropic account.
 * This action provides metadata, enables/disables the action, and handles the login UI and logic.
 *
 * @returns {object} An action object for login, including UI rendering and callbacks.
 */
const createLoginJsxAction = () => ({
  /**
   * The type of this action, used by the system to identify its nature.
   */
  type: "local-jsx",

  /**
   * The internal name of the action.
   */
  name: "login",

  /**
   * a user-facing description of the action, which changes based on the getAnthropicApiKey function'createInteractionAccessor result.
   */
  description: getAnthropicApiKey(false)
    ? "Switch Anthropic accounts"
    : "Sign in with your Anthropic account",

  /**
   * Determines if the action is enabled. Always returns true in this implementation.
   * @returns {boolean}
   */
  isEnabled: () => true,

  /**
   * Determines if the action should be hidden from the user. Always false here.
   */
  isHidden: false,

  /**
   * Handles the login action when triggered by the user.
   *
   * @async
   * @param {function} notifyUser - Callback to notify the user of login result (e.g., success or interruption).
   * @param {object} apiConfig - Configuration object, must include onChangeAPIKey callback.
   * @returns {Promise<React.ReactElement>} The login dialog React element.
   */
  async call(notifyUser, apiConfig) {
    // Ensure any required initialization is complete before showing the login dialog
    await clearConsoleScreen();

    // Render the login dialog (ExitPromptComponent component)
    return bI.createElement(ExitPromptComponent, {
      /**
       * Callback when the login dialog is done (either success or interruption).
       * @param {boolean} loginSuccessful - True if login succeeded, false if interrupted.
       * @param {object} model - The model returned from the login dialog.
       */
      onDone: async (loginSuccessful, model) => {
        // Show a confirmation dialog (renderWelcomePanel component) with the returned model
        ZA1(
          bI.createElement(renderWelcomePanel, {
            model: model
          })
        );
        // Notify the system that the API key may have changed
        apiConfig.onChangeAPIKey();
        // Notify the user of the result
        notifyUser(
          loginSuccessful ? "Login successful" : "Login interrupted"
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
});

module.exports = createLoginJsxAction;