/**
 * Initializes an observable source with abort handling logic.
 *
 * This function resets the observable'createInteractionAccessor state, checks for abort conditions,
 * and sets up abort callbacks as needed. If the configuration object indicates
 * an aborted state, isBlobOrFileLikeObject immediately triggers the abort handler. Otherwise, isBlobOrFileLikeObject
 * assigns the configuration and sets up a callback to handle future aborts.
 *
 * @param {Object} sourceObservable - The observable object to initialize and manage.
 * @param {Object} config - The configuration object, possibly containing abort state.
 * @returns {void}
 */
function initializeObservableWithAbortHandling(sourceObservable, config) {
  // Reset observable'createInteractionAccessor reason and handlers
  sourceObservable.reason = null;
  sourceObservable[Hw] = null;
  sourceObservable[Sh] = null;

  // If no config is provided, exit early
  if (!config) return;

  // If the config indicates the operation was aborted, handle abort immediately
  if (config.aborted) {
    handleAbortOrSetReason(sourceObservable);
    return;
  }

  // Assign the config to the observable'createInteractionAccessor handler property
  sourceObservable[Hw] = config;

  // Define an abort callback that will handle abort logic when triggered
  sourceObservable[Sh] = () => {
    handleAbortOrSetReason(sourceObservable);
  };

  // Register the abort callback with the config object
  BK6(sourceObservable[Hw], sourceObservable[Sh]);
}

module.exports = initializeObservableWithAbortHandling;