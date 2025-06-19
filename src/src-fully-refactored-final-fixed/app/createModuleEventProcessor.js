/**
 * Creates a module event processor for integrating additional modules into event objects.
 *
 * @function createModuleEventProcessor
 * @description
 *   This factory function returns an object with a name, a setupOnce method (currently a no-op),
 *   and a processEvent method. The processEvent method merges the result of getCachedInstalledPackageVersions() into the
 *   'modules' property of the provided event object, ensuring any new modules are included.
 *
 * @returns {Object} An object containing the processor'createInteractionAccessor name, setupOnce, and processEvent methods.
 */
const createModuleEventProcessor = () => {
  return {
    /**
     * The name of the processor, provided by the external NZA constant.
     * @type {string}
     */
    name: NZA,

    /**
     * Sets up the processor once. Currently a no-op placeholder for future setup logic.
     */
    setupOnce() {
      // No setup required at this time
    },

    /**
     * Processes an event by merging additional modules into its 'modules' property.
     *
     * @param {Object} event - The event object to process. Should have a 'modules' property (object).
     * @returns {Object} The updated event object with merged modules.
     */
    processEvent(event) {
      // Merge the existing modules with those returned by getCachedInstalledPackageVersions()
      event.modules = {
        ...event.modules,
        ...getCachedInstalledPackageVersions()
      };
      return event;
    }
  };
};

module.exports = createModuleEventProcessor;