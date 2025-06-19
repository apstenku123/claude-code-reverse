/**
 * Applies a mapping function to each value from the source observable, creating inner observables for each value.
 * Merges emissions from the source observable into all currently active inner observables.
 * Handles completion, errors, and unsubscription for all inner observables and the main subscriber.
 *
 * @param {Observable} sourceObservable - The main observable whose values will be mapped.
 * @param {Function} projectFunction - Function to map each value from the source observable to an inner observable.
 * @returns {Function} Operator function to be used with an observable pipeline.
 */
function mergeWithMappedObservables(sourceObservable, projectFunction) {
  return zx9.operate(function (outerObservable, mainSubscriber) {
    // Array to keep track of all active inner subjects
    const activeInnerSubjects = [];

    /**
     * Handles errors by propagating them to all active inner subjects and the main subscriber.
     * @param {any} error - The error to propagate.
     */
    const handleError = function (error) {
      while (activeInnerSubjects.length > 0) {
        activeInnerSubjects.shift().error(error);
      }
      mainSubscriber.error(error);
    };

    // Subscribe to the source observable and create inner observables for each emission
    cLA.innerFrom(sourceObservable).subscribe(
      aR1.createOperatorSubscriber(
        mainSubscriber,
        function (sourceValue) {
          // Create a new subject for this inner observable
          const innerSubject = new Kx9.Subject();
          activeInnerSubjects.push(innerSubject);

          // Subscription to manage the inner observable
          const innerSubscription = new Hx9.Subscription();

          /**
           * Cleanup function to remove the subject and unsubscribe
           */
          const cleanupInner = function () {
            wx9.arrRemove(activeInnerSubjects, innerSubject);
            innerSubject.complete();
            innerSubscription.unsubscribe();
          };

          let innerObservable;
          try {
            // Map the source value to an inner observable
            innerObservable = cLA.innerFrom(projectFunction(sourceValue));
          } catch (mappingError) {
            handleError(mappingError);
            return;
          }

          // Emit the inner subject as an observable to the main subscriber
          mainSubscriber.next(innerSubject.asObservable());

          // Subscribe to the inner observable
          innerSubscription.add(
            innerObservable.subscribe(
              aR1.createOperatorSubscriber(
                mainSubscriber,
                cleanupInner, // On next: cleanup when inner completes
                lLA.noop,     // On error: no operation
                handleError   // On error: propagate error
              )
            )
          );
        },
        lLA.noop // On complete: no operation
      )
    );

    // Subscribe to the outer observable and forward emissions to all active inner subjects
    outerObservable.subscribe(
      aR1.createOperatorSubscriber(
        mainSubscriber,
        function (outerValue) {
          let errorToThrow;
          let iteratorReturn;
          // Make a shallow copy to avoid mutation during iteration
          const subjectsSnapshot = activeInnerSubjects.slice();
          try {
            // Iterate over all active inner subjects and emit the value
            for (const innerSubject of subjectsSnapshot) {
              innerSubject.next(outerValue);
            }
          } catch (iterationError) {
            errorToThrow = { error: iterationError };
          } finally {
            // Ensure iterator cleanup if necessary
            try {
              if (iteratorReturn) iteratorReturn.call();
            } finally {
              if (errorToThrow) throw errorToThrow.error;
            }
          }
        },
        function () {
          // On complete: complete all inner subjects and the main subscriber
          while (activeInnerSubjects.length > 0) {
            activeInnerSubjects.shift().complete();
          }
          mainSubscriber.complete();
        },
        handleError, // On error: propagate error
        function () {
          // On unsubscribe: unsubscribe all inner subjects
          while (activeInnerSubjects.length > 0) {
            activeInnerSubjects.shift().unsubscribe();
          }
        }
      )
    );
  });
}

module.exports = mergeWithMappedObservables;