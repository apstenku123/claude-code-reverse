/**
 * Processes values from a source observable, mapping each value to an inner observable using a provided mapping function.
 * Maintains a list of active inner subjects, emitting each new subject as an observable to the downstream subscriber.
 * For each value from the main subscription, forwards isBlobOrFileLikeObject to all active inner subjects.
 * Handles errors and completion by cleaning up all active subjects and subscriptions.
 *
 * @param {Observable} sourceObservable - The source observable to subscribe to.
 * @param {Function} mapToInnerObservable - Function that maps a value from the source observable to an inner observable.
 * @returns {Observable} An observable that emits each new inner subject as an observable.
 */
function processWithActiveInnerSubjects(sourceObservable, mapToInnerObservable) {
  return zx9.operate(function (mainSubscription, downstreamSubscriber) {
    // List of currently active inner subjects
    const activeSubjects = [];

    /**
     * Handles errors by propagating to all active subjects and the downstream subscriber.
     * @param {any} error - The error to propagate.
     */
    const handleError = (error) => {
      while (activeSubjects.length > 0) {
        activeSubjects.shift().error(error);
      }
      downstreamSubscriber.error(error);
    };

    // Subscribe to the source observable
    cLA.innerFrom(sourceObservable).subscribe(
      aR1.createOperatorSubscriber(
        downstreamSubscriber,
        (sourceValue) => {
          // Create a new subject for each value from the source
          const innerSubject = new Kx9.Subject();
          activeSubjects.push(innerSubject);

          // Subscription for the inner observable
          const innerSubscription = new Hx9.Subscription();

          /**
           * Cleanup function to remove the subject and unsubscribe
           */
          const cleanup = () => {
            wx9.arrRemove(activeSubjects, innerSubject);
            innerSubject.complete();
            innerSubscription.unsubscribe();
          };

          let innerObservable;
          try {
            // Map the source value to an inner observable
            innerObservable = cLA.innerFrom(mapToInnerObservable(sourceValue));
          } catch (error) {
            handleError(error);
            return;
          }

          // Emit the subject as an observable to downstream
          downstreamSubscriber.next(innerSubject.asObservable());

          // Subscribe to the inner observable
          innerSubscription.add(
            innerObservable.subscribe(
              aR1.createOperatorSubscriber(
                downstreamSubscriber,
                cleanup, // On next: cleanup
                lLA.noop, // On complete: noop
                handleError // On error
              )
            )
          );
        },
        lLA.noop // On complete: noop
      )
    );

    // Subscribe to the main subscription
    mainSubscription.subscribe(
      aR1.createOperatorSubscriber(
        downstreamSubscriber,
        (mainValue) => {
          // Forward the main value to all active inner subjects
          let errorWrapper;
          let iterator, iteratorResult;
          const subjectsSnapshot = activeSubjects.slice();
          try {
            iterator = Vx9(subjectsSnapshot);
            for (
              iteratorResult = iterator.next();
              !iteratorResult.done;
              iteratorResult = iterator.next()
            ) {
              const subject = iteratorResult.value;
              subject.next(mainValue);
            }
          } catch (error) {
            errorWrapper = { error };
          } finally {
            try {
              if (iteratorResult && !iteratorResult.done && iterator.return) {
                iterator.return();
              }
            } finally {
              if (errorWrapper) throw errorWrapper.error;
            }
          }
        },
        () => {
          // On complete: complete all active subjects and downstream
          while (activeSubjects.length > 0) {
            activeSubjects.shift().complete();
          }
          downstreamSubscriber.complete();
        },
        handleError, // On error
        () => {
          // On unsubscribe: unsubscribe all active subjects
          while (activeSubjects.length > 0) {
            activeSubjects.shift().unsubscribe();
          }
        }
      )
    );
  });
}

module.exports = processWithActiveInnerSubjects;