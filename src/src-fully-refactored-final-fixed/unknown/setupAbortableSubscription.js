/**
 * Handles setting up an abortable subscription on a source observable, cleaning up previous state,
 * and ensuring proper abort handling if the configuration indicates an aborted state.
 *
 * @param {Object} sourceObservable - The observable or subscription object to manage.
 * @param {Object} config - The configuration object, possibly containing an 'aborted' flag.
 * @returns {void}
 */
function setupAbortableSubscription(sourceObservable, config) {
  // Reset abort reason and cleanup previous handlers
  sourceObservable.reason = null;
  sourceObservable[Hw] = null;
  sourceObservable[Sh] = null;

  // If no config is provided, exit early
  if (!config) return;

  // If the config indicates the operation was aborted, handle abort and exit
  if (config.aborted) {
    handleAbortOrSetReason(sourceObservable);
    return;
  }

  // Assign the config to the observable'createInteractionAccessor handler property
  sourceObservable[Hw] = config;

  // Define the abort handler, which will clean up the observable when called
  sourceObservable[Sh] = () => {
    handleAbortOrSetReason(sourceObservable);
  };

  // Register the abort handler with the config object
  BK6(sourceObservable[Hw], sourceObservable[Sh]);
}

module.exports = setupAbortableSubscription;