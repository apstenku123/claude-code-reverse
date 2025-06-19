/**
 * @function createModuleProcessor
 * @description
 * Factory function that returns an object representing a module processor. This processor provides a name, a setup hook, and a method to process events by merging additional modules into the event'createInteractionAccessor modules property.
 *
 * @returns {Object} An object with the following properties:
 *   - name: The module name (from NZA)
 *   - setupOnce: a no-op setup function (for future extensibility)
 *   - processEvent: a function that merges additional modules into the event object
 */
const createModuleProcessor = () => {
  return {
    /**
     * The name of the module, imported from external dependency NZA.
     * @type {string}
     */
    name: NZA,

    /**
     * Setup hook for the module processor. Currently a no-op, but can be extended in the future.
     */
    setupOnce() {
      // No setup required at this time
    },

    /**
     * Processes an event object by merging additional modules into its modules property.
     *
     * @param {Object} event - The event object to process. Must have a 'modules' property (object).
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

module.exports = createModuleProcessor;