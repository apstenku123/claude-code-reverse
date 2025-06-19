/**
 * Registers lifecycle hooks for a given server, integrating additional plugins.
 *
 * @param {Object} [options={}] - Configuration options for the server lifecycle hooks.
 * @param {Object} [options.server] - The server instance to attach hooks to.
 * @returns {Object} An object containing the plugin name and a setupOnce method to register hooks.
 */
function registerServerLifecycleHooks(options = {}) {
  const { server } = options;

  return {
    /**
     * The name of this plugin/module, imported from an external constant.
     */
    name: wDA,

    /**
     * Registers hooks on the server instance if provided.
     * This method should be called once during the setup phase.
     */
    setupOnce() {
      // If no server is provided, do nothing
      if (!server) return;

      // Register a 'start' lifecycle hook on the server
      KDA.fill(server, "start", (originalStartHandler) => {
        // Return an async function that registers additional plugins before calling the original handler
        return async function () {
          // Register the zDA plugin/module
          await this.register(zDA);
          // Register the HDA plugin/module
          await this.register(HDA);
          // Call the original start handler in the correct context
          return originalStartHandler.apply(this);
        };
      });
    }
  };
}

module.exports = registerServerLifecycleHooks;