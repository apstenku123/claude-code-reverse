/**
 * Initializes and manages a CLI UI rendering lifecycle with configurable options.
 *
 * @param {any} uiElement - The UI element or component to render in the CLI.
 * @param {object} [options={}] - Optional configuration overrides for the CLI UI environment.
 * @param {object} [options.stdout=process.stdout] - Writable stream for standard output.
 * @param {object} [options.stdin=process.stdin] - Readable stream for standard input.
 * @param {object} [options.stderr=process.stderr] - Writable stream for standard error.
 * @param {boolean} [options.debug=false] - Enable debug mode for additional logging.
 * @param {boolean} [options.exitOnCtrlC=true] - Exit process on Ctrl+C signal.
 * @param {boolean} [options.patchConsole=true] - Patch the console for UI rendering.
 * @returns {object} An object with methods to rerender, unmount, wait for exit, cleanup, and clear the UI.
 */
function initializeCliUi(uiElement, options = {}) {
  // Merge default configuration with user-provided options and any additional overrides from createStreamInterface
  const cliConfig = {
    stdout: process.stdout,
    stdin: process.stdin,
    stderr: process.stderr,
    debug: false,
    exitOnCtrlC: true,
    patchConsole: true,
    ...createStreamInterface(options) // createStreamInterface may further override or augment the config
  };

  // Initialize the UI manager/controller for the CLI, passing the config
  const uiManager = Py4(cliConfig.stdout, () => new mI1(cliConfig));

  // Render the initial UI element/component
  uiManager.render(uiElement);

  // Return an interface for managing the UI lifecycle
  return {
    /**
     * Rerender the UI with a new element/component.
     * @param {any} nextUiElement - The new UI element to render.
     */
    rerender: uiManager.render,

    /**
     * Unmounts the UI and performs necessary cleanup.
     */
    unmount() {
      uiManager.unmount();
    },

    /**
     * Returns a promise that resolves when the UI has fully exited.
     * @returns {Promise<void>}
     */
    waitUntilExit: uiManager.waitUntilExit,

    /**
     * Cleans up resources associated with the CLI UI, such as removing listeners.
     */
    cleanup: () => tb.delete(cliConfig.stdout),

    /**
     * Clears the CLI UI output.
     */
    clear: uiManager.clear
  };
}

module.exports = initializeCliUi;