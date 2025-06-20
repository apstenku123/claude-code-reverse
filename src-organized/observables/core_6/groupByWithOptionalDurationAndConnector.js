/**
 * Groups items from the source observable by a key, optionally managing group duration and custom connectors.
 *
 * @param {Function} keySelector - Function to extract the key for grouping from each item.
 * @param {Object|Function} [configOrDuration] - Optional configuration object or a function. If an object, can specify duration, element selector, and connector factory.
 * @param {Function} [durationSelector] - Optional function to determine the duration of each group.
 * @param {Function} [connectorFactory] - Optional factory function to create a connector (subject) for each group.
 * @returns {Function} Operator function to be used with an observable.
 */
function groupByWithOptionalDurationAndConnector(keySelector, configOrDuration, durationSelector, connectorFactory) {
  return x_9.operate(function (sourceObservable, subscriber) {
    let elementSelector;
    // Parse config or function overloads
    if (!configOrDuration || typeof configOrDuration === "function") {
      elementSelector = configOrDuration;
    } else {
      durationSelector = configOrDuration.duration;
      elementSelector = configOrDuration.element;
      connectorFactory = configOrDuration.connector;
    }

    // Map to hold group subjects by key
    const groupSubjects = new Map();
    // Helper to apply a function to all group subjects and the main subscriber
    const forEachGroup = (fn) => {
      groupSubjects.forEach(fn);
      fn(subscriber);
    };
    // Helper to propagate errors to all groups
    const errorAllGroups = (err) => {
      forEachGroup(groupSubscriber => groupSubscriber.error(err));
    };

    let activeGroupsCount = 0;
    let isComplete = false;

    // Main operator subscriber
    const operatorSubscriber = new gqA.OperatorSubscriber(
      subscriber,
      (value) => {
        try {
          // Get the group key
          const key = keySelector(value);
          let groupSubject = groupSubjects.get(key);

          // Create group subject if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist
          if (!groupSubject) {
            groupSubject = connectorFactory ? connectorFactory() : new y_9.Subject();
            groupSubjects.set(key, groupSubject);
            const groupedObservable = createGroupedObservable(key, groupSubject);
            subscriber.next(groupedObservable);

            // If a duration selector is provided, manage group duration
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

          // Emit the value to the group, applying elementSelector if provided
          groupSubject.next(elementSelector ? elementSelector(value) : value);
        } catch (error) {
          errorAllGroups(error);
        }
      },
      // On complete: complete all group subjects
      () => {
        forEachGroup(groupSubscriber => groupSubscriber.complete());
      },
      // On error: propagate error to all group subjects
      errorAllGroups,
      // On unsubscribe: clear all group subjects
      () => {
        groupSubjects.clear();
      },
      // On finalization: unsubscribe if all groups are done
      () => {
        isComplete = true;
        return activeGroupsCount === 0;
      }
    );

    // Subscribe to the source observable
    sourceObservable.subscribe(operatorSubscriber);

    /**
     * Creates a grouped observable for a specific key and subject.
     * @param {*} key - The group key.
     * @param {Subject} groupSubject - The subject for this group.
     * @returns {Observable} The grouped observable with a .key property.
     */
    function createGroupedObservable(key, groupSubject) {
      const groupedObservable = new j_9.Observable((groupSubscriber) => {
        activeGroupsCount++;
        const subscription = groupSubject.subscribe(groupSubscriber);
        return () => {
          subscription.unsubscribe();
          // If all groups are done and the source is complete, unsubscribe operator
          if (--activeGroupsCount === 0 && isComplete) {
            operatorSubscriber.unsubscribe();
          }
        };
      });
      groupedObservable.key = key;
      return groupedObservable;
    }
  });
}

module.exports = groupByWithOptionalDurationAndConnector;