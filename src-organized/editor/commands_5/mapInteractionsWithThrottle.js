/**
 * Processes a source observable of user interactions, mapping each interaction to a route using mapInteractionsToRoutes,
 * and controls emission timing using configurable leading/trailing throttle behavior. Completes the output observable
 * according to the trailing configuration and the completion of the source.
 *
 * @param {function(any): Observable} mapInteractionsToRoutes - Function that maps an interaction to a route observable.
 * @param {Object} [config] - Configuration object for throttle behavior.
 * @param {boolean} [config.leading=true] - If true, emit the first value in the throttle period.
 * @param {boolean} [config.trailing=false] - If true, emit the last value in the throttle period when the source completes.
 * @returns {function(Observable, Observer): void} Operator function to be used with an observable pipeline.
 */
function mapInteractionsWithThrottle(mapInteractionsToRoutes, config) {
  return ky9.operate(function (sourceObservable, destinationObserver) {
    // Extract configuration with defaults
    const {
      leading: emitLeading = true,
      trailing: emitTrailing = false
    } = config != null ? config : {};

    let hasPendingValue = false; // True if a value is waiting to be emitted
    let pendingValue = null;     // Stores the pending value
    let innerSubscription = null; // Subscription to the inner observable
    let sourceCompleted = false;  // True if the source observable has completed

    /**
     * Cleans up the inner subscription and, if trailing is enabled, emits the pending value and completes.
     */
    const cleanupInnerSubscription = () => {
      if (innerSubscription != null) {
        innerSubscription.unsubscribe();
        innerSubscription = null;
      }
      if (emitTrailing) {
        emitPendingValue();
        if (sourceCompleted) {
          destinationObserver.complete();
        }
      }
    };

    /**
     * Handles completion of the inner observable. Completes the destination if the source is done.
     */
    const handleInnerComplete = () => {
      innerSubscription = null;
      if (sourceCompleted) {
        destinationObserver.complete();
      }
    };

    /**
     * Subscribes to the mapped route observable for the given interaction.
     * @param {any} interaction - The user interaction entry.
     */
    const subscribeToMappedRoute = (interaction) => {
      innerSubscription = yy9.innerFrom(mapInteractionsToRoutes(interaction)).subscribe(
        LLA.createOperatorSubscriber(destinationObserver, cleanupInnerSubscription, handleInnerComplete)
      );
    };

    /**
     * Emits the pending value if there is one, and subscribes to its mapped route.
     */
    const emitPendingValue = () => {
      if (hasPendingValue) {
        hasPendingValue = false;
        const valueToEmit = pendingValue;
        pendingValue = null;
        destinationObserver.next(valueToEmit);
        if (!sourceCompleted) {
          subscribeToMappedRoute(valueToEmit);
        }
      }
    };

    // Subscribe to the source observable
    sourceObservable.subscribe(
      LLA.createOperatorSubscriber(
        destinationObserver,
        /**
         * On next interaction from the source:
         * - Store as pending value
         * - If no inner subscription is active, emit immediately if leading is enabled, otherwise subscribe to mapped route
         */
        (interaction) => {
          hasPendingValue = true;
          pendingValue = interaction;
          if (!(innerSubscription && !innerSubscription.closed)) {
            if (emitLeading) {
              emitPendingValue();
            } else {
              subscribeToMappedRoute(interaction);
            }
          }
        },
        /**
         * On source completion:
         * - If trailing is enabled and a value is pending and inner subscription is active, do not complete yet
         * - Otherwise, complete the destination observer
         */
        () => {
          sourceCompleted = true;
          if (!(emitTrailing && hasPendingValue && innerSubscription && !innerSubscription.closed)) {
            destinationObserver.complete();
          }
        }
      )
    );
  });
}

module.exports = mapInteractionsWithThrottle;