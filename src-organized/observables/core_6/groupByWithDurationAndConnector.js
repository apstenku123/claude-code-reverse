/**
 * Groups items from the source observable by a key, optionally managing group duration and custom connectors.
 *
 * @param {Function} keySelector - Function to extract the key for each item emitted by the source observable.
 * @param {Object|Function} [configOrDurationSelector] - Optional configuration object or a function. If an object, may contain 'duration', 'element', and 'connector'.
 * @param {Function} [durationSelector] - Optional function to determine the duration of each group.
 * @param {Function} [connectorFactory] - Optional factory function to create a connector (subject) for each group.
 * @returns {Function} Operator function to be used with an observable.
 */
function groupByWithDurationAndConnector(keySelector, configOrDurationSelector, durationSelector, connectorFactory) {
  return x_9.operate(function (sourceObservable, subscriber) {
    let elementSelector;
    // Parse configuration if configOrDurationSelector is an object
    if (!configOrDurationSelector || typeof configOrDurationSelector === "function") {
      elementSelector = configOrDurationSelector;
    } else {
      durationSelector = configOrDurationSelector.duration;
      elementSelector = configOrDurationSelector.element;
      connectorFactory = configOrDurationSelector.connector;
    }

    const groupSubjects = new Map(); // Map of group key -> Subject

    /**
     * Helper to apply a function to all group subjects and the main subscriber.
     * @param {Function} fn
     */
    const forEachGroup = (fn) => {
      groupSubjects.forEach(fn);
      fn(subscriber);
    };

    /**
     * Helper to error all groups and the main subscriber.
     * @param {any} error
     */
    const errorAllGroups = (error) => {
      forEachGroup((group) => group.error(error));
    };

    let activeGroups = 0;
    let isComplete = false;

    // Subscriber for the source observable
    const operatorSubscriber = new gqA.OperatorSubscriber(
      subscriber,
      (value) => {
        try {
          const key = keySelector(value);
          let groupSubject = groupSubjects.get(key);

          // Create a new group if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist
          if (!groupSubject) {
            groupSubject = connectorFactory ? connectorFactory() : new y_9.Subject();
            groupSubjects.set(key, groupSubject);
            const groupedObservable = createGroupedObservable(key, groupSubject);
            subscriber.next(groupedObservable);

            // If a durationSelector is provided, close the group after duration
            if (durationSelector) {
              const durationSubscriber = gqA.createOperatorSubscriber(
                groupSubject,
                () => {
                  groupSubject.complete();
                  durationSubscriber?.unsubscribe();
                },
                undefined,
                undefined,
                () => groupSubjects.delete(key)
              );
              operatorSubscriber.add(
                k_9.innerFrom(durationSelector(groupedObservable)).subscribe(durationSubscriber)
              );
            }
          }

          // Emit the value to the group
          groupSubject.next(elementSelector ? elementSelector(value) : value);
        } catch (err) {
          errorAllGroups(err);
        }
      },
      // Complete handler: complete all groups
      () => {
        forEachGroup((group) => group.complete());
      },
      // Error handler: error all groups
      errorAllGroups,
      // Unsubscribe handler: clear all groups
      () => {
        groupSubjects.clear();
      },
      // Finalize handler: unsubscribe if all groups are done
      () => {
        isComplete = true;
        return activeGroups === 0;
      }
    );

    // Subscribe to the source observable
    sourceObservable.subscribe(operatorSubscriber);

    /**
     * Creates a grouped observable for a given key and subject.
     * Handles group subscription and automatic unsubscription.
     * @param {any} key
     * @param {Subject} subject
     * @returns {Observable}
     */
    function createGroupedObservable(key, subject) {
      const groupedObservable = new j_9.Observable((groupSubscriber) => {
        activeGroups++;
        const subscription = subject.subscribe(groupSubscriber);
        return () => {
          subscription.unsubscribe();
          if (--activeGroups === 0 && isComplete) {
            operatorSubscriber.unsubscribe();
          }
        };
      });
      groupedObservable.key = key;
      return groupedObservable;
    }
  });
}

module.exports = groupByWithDurationAndConnector;