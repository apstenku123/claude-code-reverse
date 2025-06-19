/**
 * Creates an RxJS operator that groups incoming values based on a key selector function,
 * manages grouped subjects, and optionally applies duration and connector logic for each group.
 *
 * @param {Function} keySelector - Function to extract the grouping key from each value.
 * @param {Object|Function|null} config - Optional configuration object or function. If a function, used as the element selector.
 *        If an object, may contain:
 *          - duration: Observable or function that determines the lifespan of each group.
 *          - element: Function to transform each value before emitting to the group.
 *          - connector: Function to create a new subject for each group.
 * @param {Function} [durationSelector] - Optional function or observable for group duration (used if config is not a function).
 * @param {Function} [connectorFactory] - Optional function to create a new subject for each group (used if config is not a function).
 * @returns {Function} An RxJS operator function to be used with Observable.pipe().
 */
function createGroupedObservableOperator(keySelector, config, durationSelector, connectorFactory) {
  return x_9.operate(function (sourceObservable, subscriber) {
    let groupDuration;
    let elementSelector;
    let groupConnector;

    // Determine configuration based on the type of 'config'
    if (!config || typeof config === "function") {
      elementSelector = config;
    } else {
      groupDuration = config.duration;
      elementSelector = config.element;
      groupConnector = config.connector;
    }

    // Map to keep track of active groups by key
    const groupSubjects = new Map();
    let activeGroupCount = 0;
    let isSourceComplete = false;

    /**
     * Calls the provided callback for each group subject, then for the main subscriber.
     * @param {Function} callback
     */
    const forEachGroup = (callback) => {
      groupSubjects.forEach(callback);
      callback(subscriber);
    };

    /**
     * Handles errors by notifying all group subjects and the main subscriber.
     * @param {any} error
     */
    const notifyError = (error) => {
      forEachGroup(group => group.error(error));
    };

    /**
     * Helper to create a grouped observable with a key property.
     * @param {any} groupKey
     * @param {Subject} groupSubject
     * @returns {Observable}
     */
    function createGroupedObservable(groupKey, groupSubject) {
      const groupedObservable = new j_9.Observable(observer => {
        activeGroupCount++;
        const subscription = groupSubject.subscribe(observer);
        return () => {
          subscription.unsubscribe();
          activeGroupCount--;
          // If source is complete and no more active groups, unsubscribe main subscriber
          if (activeGroupCount === 0 && isSourceComplete) {
            operatorSubscriber.unsubscribe();
          }
        };
      });
      groupedObservable.key = groupKey;
      return groupedObservable;
    }

    // Main operator subscriber
    const operatorSubscriber = new gqA.OperatorSubscriber(
      subscriber,
      (value) => {
        try {
          // Get the group key for this value
          const groupKey = keySelector(value);
          let groupSubject = groupSubjects.get(groupKey);

          // If group doesn'processRuleBeginHandlers exist, create isBlobOrFileLikeObject
          if (!groupSubject) {
            groupSubject = groupConnector ? groupConnector() : new y_9.Subject();
            groupSubjects.set(groupKey, groupSubject);
            const groupedObservable = createGroupedObservable(groupKey, groupSubject);
            subscriber.next(groupedObservable);

            // If a group duration is specified, set up completion logic
            if (groupDuration) {
              const durationSubscriber = gqA.createOperatorSubscriber(
                groupSubject,
                () => {
                  groupSubject.complete();
                  durationSubscriber?.unsubscribe();
                },
                undefined,
                undefined,
                () => groupSubjects.delete(groupKey)
              );
              operatorSubscriber.add(
                k_9.innerFrom(groupDuration(groupedObservable)).subscribe(durationSubscriber)
              );
            }
          }

          // Emit the value to the group, applying elementSelector if present
          groupSubject.next(elementSelector ? elementSelector(value) : value);
        } catch (err) {
          notifyError(err);
        }
      },
      // On complete: complete all groups and the main subscriber
      () => {
        forEachGroup(group => group.complete());
      },
      // On error: notify all groups and the main subscriber
      notifyError,
      // On unsubscribe: clear all groups
      () => {
        groupSubjects.clear();
      },
      // On finalize: mark source as complete and check for active groups
      () => {
        isSourceComplete = true;
        return activeGroupCount === 0;
      }
    );

    // Subscribe to the source observable
    sourceObservable.subscribe(operatorSubscriber);
  });
}

module.exports = createGroupedObservableOperator;