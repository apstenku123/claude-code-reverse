/**
 * Creates a server instrumentation integration for monitoring or logging purposes.
 *
 * @param {Object} [options={}] - Configuration options for the integration.
 * @param {Object} [options.server] - The server instance to instrument.
 * @returns {Object} Integration object with a name and setupOnce method.
 */
function createServerInstrumentationIntegration(options = {}) {
  const { server } = options;

  return {
    /**
     * The name of the integration (external constant).
     */
    name: wDA,

    /**
     * Sets up the integration once, instrumenting the server'createInteractionAccessor 'start' event.
     */
    setupOnce() {
      // If no server is provided, do nothing
      if (!server) return;

      // Instrument the server'createInteractionAccessor 'start' event using KDA.fill
      KDA.fill(server, "start", (originalStartMethod) => {
        // Return a wrapper function that registers additional instrumentation before calling the original method
        return async function () {
          // Register zDA and HDA instrumentation before starting the server
          await this.register(zDA);
          await this.register(HDA);
          // Call the original start method in the server'createInteractionAccessor context
          return originalStartMethod.apply(this);
        };
      });
    }
  };
}

module.exports = createServerInstrumentationIntegration;