/**
 * Renders a CLI application component with customizable configuration and lifecycle controls.
 *
 * @param {any} component - The component or element to render in the CLI.
 * @param {object} [options={}] - Optional configuration overrides for rendering behavior.
 * @returns {object} An object with methods to rerender, unmount, wait for exit, cleanup, and clear the CLI output.
 */
function renderCliApp(component, options = {}) {
  // Merge default configuration with overrides from createStreamInterface(options)
  const renderConfig = {
    stdout: process.stdout,
    stdin: process.stdin,
    stderr: process.stderr,
    debug: false,
    exitOnCtrlC: true,
    patchConsole: true,
    ...createStreamInterface(options)
  };

  // Initialize the renderer with the output stream and a new UI instance
  const renderer = Py4(renderConfig.stdout, () => new mI1(renderConfig));

  // Initial render of the component
  renderer.render(component);

  return {
    /**
     * Rerenders the CLI component with new data or props.
     */
    rerender: renderer.render,

    /**
     * Unmounts the CLI component and performs cleanup.
     */
    unmount() {
      renderer.unmount();
    },

    /**
     * Returns a promise that resolves when the CLI app has fully exited.
     */
    waitUntilExit: renderer.waitUntilExit,

    /**
     * Cleans up resources associated with the output stream.
     */
    cleanup: () => tb.delete(renderConfig.stdout),

    /**
     * Clears the CLI output.
     */
    clear: renderer.clear
  };
}

module.exports = renderCliApp;
