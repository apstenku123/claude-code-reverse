/**
 * Creates an operator that manages a set of inner subjects and subscriptions based on emissions from a source observable and a projection function.
 *
 * @param {Observable} sourceObservable - The source observable whose emissions trigger the creation of inner subjects.
 * @param {Function} projectFunction - a function that, given a value from the source observable, returns an inner observable.
 * @returns {Function} An operator function to be used with an observable pipeline.
 */
function createEx9ValueOperator(sourceObservable, projectFunction) {
  return zx9.operate(function (outerObservable, destinationSubscriber) {
    // Array to keep track of all active inner subjects
    const activeSubjects = [];

    /**
     * Handles errors by propagating them to all active subjects and the destination subscriber.
     * @param {any} error
     */
    const handleError = (error) => {
      while (activeSubjects.length > 0) {
        activeSubjects.shift().error(error);
      }
      destinationSubscriber.error(error);
    };

    // Subscribe to the source observable
    cLA.innerFrom(sourceObservable).subscribe(
      aR1.createOperatorSubscriber(
        destinationSubscriber,
        /**
         * For each value from the source observable, create a new subject and subscribe to the projected inner observable.
         * @param {any} sourceValue
         */
        function (sourceValue) {
          const innerSubject = new Kx9.Subject();
          activeSubjects.push(innerSubject);
          const innerSubscription = new Hx9.Subscription();

          /**
           * Cleanup function for when the inner observable completes or errors.
           */
          const cleanup = () => {
            wx9.arrRemove(activeSubjects, innerSubject);
            innerSubject.complete();
            innerSubscription.unsubscribe();
          };

          let projectedObservable;
          try {
            projectedObservable = cLA.innerFrom(projectFunction(sourceValue));
          } catch (error) {
            handleError(error);
            return;
          }

          // Emit the subject as an observable to the destination
          destinationSubscriber.next(innerSubject.asObservable());

          // Subscribe to the projected observable
          innerSubscription.add(
            projectedObservable.subscribe(
              aR1.createOperatorSubscriber(
                destinationSubscriber,
                cleanup, // On next: cleanup
                lLA.noop, // On complete: do nothing
                handleError // On error
              )
            )
          );
        },
        lLA.noop // On complete: do nothing
      )
    );

    // Subscribe to the outer observable
    outerObservable.subscribe(
      aR1.createOperatorSubscriber(
        destinationSubscriber,
        /**
         * For each value from the outer observable, forward isBlobOrFileLikeObject to all active subjects.
         * @param {any} outerValue
         */
        function (outerValue) {
          let errorWrapper;
          let iterator;
          let iterationResult;
          const subjectsSnapshot = activeSubjects.slice();
          try {
            iterator = Vx9(subjectsSnapshot);
            iterationResult = iterator.next();
            while (!iterationResult.done) {
              const subject = iterationResult.value;
              subject.next(outerValue);
              iterationResult = iterator.next();
            }
          } catch (iterationError) {
            errorWrapper = { error: iterationError };
          } finally {
            try {
              if (iterationResult && !iterationResult.done && iterator.return) {
                iterator.return();
              }
            } finally {
              if (errorWrapper) throw errorWrapper.error;
            }
          }
        },
        // On complete: complete all active subjects and the destination subscriber
        function () {
          while (activeSubjects.length > 0) {
            activeSubjects.shift().complete();
          }
          destinationSubscriber.complete();
        },
        handleError, // On error
        // On unsubscribe: unsubscribe all active subjects
        function () {
          while (activeSubjects.length > 0) {
            activeSubjects.shift().unsubscribe();
          }
        }
      )
    );
  });
}

module.exports = createEx9ValueOperator;