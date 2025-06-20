/**
 * Initializes and manages a CLI application UI lifecycle.
 *
 * This function sets up the standard input/output/error streams, applies configuration overrides,
 * initializes the UI renderer, and returns an object with methods to control the UI lifecycle.
 *
 * @param {any} appElement - The root element or component to render in the CLI UI.
 * @param {object} [options={}] - Optional configuration overrides for the CLI environment.
 * @returns {object} An object with methods to rerender, unmount, wait for exit, cleanup, and clear the UI.
 */
function initializeCliApp(appElement, options = {}) {
  // Merge default CLI configuration with any overrides provided in options
  const cliConfig = {
    stdout: process.stdout,
    stdin: process.stdin,
    stderr: process.stderr,
    debug: false,
    exitOnCtrlC: true,
    patchConsole: true,
    ...createStreamInterface(options) // Apply additional configuration overrides via createStreamInterface
  };

  // Initialize the UI renderer with the configured stdout stream
  const uiRenderer = Py4(cliConfig.stdout, () => new mI1(cliConfig));

  // Render the initial app element/component
  uiRenderer.render(appElement);

  // Return an interface for controlling the UI lifecycle
  return {
    /**
     * Rerenders the UI with a new app element/component.
     * @param {any} nextAppElement - The new element/component to render.
     */
    rerender: uiRenderer.render,

    /**
     * Unmounts the UI and performs cleanup.
     */
    unmount() {
      uiRenderer.unmount();
    },

    /**
     * Returns a promise that resolves when the UI has fully exited.
     * @returns {Promise<void>}
     */
    waitUntilExit: uiRenderer.waitUntilExit,

    /**
     * Cleans up resources associated with the configured stdout stream.
     */
    cleanup: () => tb.delete(cliConfig.stdout),

    /**
     * Clears the UI output.
     */
    clear: uiRenderer.clear
  };
}

module.exports = initializeCliApp;
