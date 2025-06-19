/**
 * Creates an operator that splits an Observable into windows (sub-Observables) based on a time span and/or count.
 * Each window emits values from the source Observable for a specified duration or until a maximum count is reached.
 *
 * @param {number} windowTimeSpan - The amount of time (in milliseconds) each window remains open.
 * @param {...any} args - Optional arguments: windowCreationInterval (number), maxWindowSize (number), scheduler (SchedulerLike)
 * @returns {function} An operator function to be used with Observable.pipe()
 */
function windowTimeOperator(windowTimeSpan, ...args) {
  // Extract scheduler from arguments or use default asyncScheduler
  const scheduler = Xx9.popScheduler(args) ?? Dx9.asyncScheduler;
  // The interval at which to start new windows (null means only one window at a time)
  const windowCreationInterval = args[0] ?? null;
  // The maximum number of values per window (default: Infinity)
  const maxWindowSize = args[1] || Infinity;

  // Return the operator function
  return Wx9.operate(function (source, subscriber) {
    /**
     * Array of active windows, each with its Subject, Subscription, and count of seen values.
     * @type {Array<{ window: Subject, subs: Subscription, seen: number }>}
     */
    let activeWindows = [];
    // Indicates if handleMissingDoctypeError should continue creating windows (false if using windowCreationInterval)
    let canCreateWindow = false;

    /**
     * Closes and cleans up a window.
     * @param {{ window: Subject, subs: Subscription, seen: number }} windowRecord
     */
    const closeWindow = (windowRecord) => {
      const { window, subs } = windowRecord;
      window.complete();
      subs.unsubscribe();
      Jx9.arrRemove(activeWindows, windowRecord);
      // If handleMissingDoctypeError're only supposed to have one window at a time, open a new one
      if (canCreateWindow) {
        openWindow();
      }
    };

    /**
     * Opens a new window and schedules its closure after windowTimeSpan.
     */
    const openWindow = () => {
      if (activeWindows) {
        const windowSubscription = new Yx9.Subscription();
        subscriber.add(windowSubscription);
        const windowSubject = new Zx9.Subject();
        const windowRecord = {
          window: windowSubject,
          subs: windowSubscription,
          seen: 0
        };
        activeWindows.push(windowRecord);
        // Emit the window as an Observable
        subscriber.next(windowSubject.asObservable());
        // Schedule window closure after windowTimeSpan
        dLA.executeSchedule(
          windowSubscription,
          scheduler,
          () => closeWindow(windowRecord),
          windowTimeSpan
        );
      }
    };

    // If windowCreationInterval is specified and valid, schedule window creation
    if (windowCreationInterval !== null && windowCreationInterval >= 0) {
      dLA.executeSchedule(
        subscriber,
        scheduler,
        openWindow,
        windowCreationInterval,
        true // repeat
      );
    } else {
      // Otherwise, allow only one window at a time
      canCreateWindow = true;
    }
    // Always open the first window
    openWindow();

    /**
     * Helper to apply a callback to all active windows (shallow copy for safety)
     * @param {function} callback
     */
    const forEachWindow = (callback) => {
      activeWindows.slice().forEach(callback);
    };

    /**
     * Completes or errors all windows and unsubscribes the subscriber
     * @param {function} windowAction - Function to call on each window (e.g., complete or error)
     */
    const finalizeAll = (windowAction) => {
      forEachWindow(windowRecord => {
        windowAction(windowRecord.window);
      });
      windowAction(subscriber);
      subscriber.unsubscribe();
    };

    // Subscribe to the source Observable
    return source.subscribe(
      Fx9.createOperatorSubscriber(
        subscriber,
        // next handler: forward value to all windows, close if maxWindowSize reached
        (value) => {
          forEachWindow(windowRecord => {
            windowRecord.window.next(value);
            if (++windowRecord.seen >= maxWindowSize) {
              closeWindow(windowRecord);
            }
          });
        },
        // complete handler: complete all windows and the subscriber
        () => finalizeAll(window => window.complete()),
        // error handler: error all windows and the subscriber
        (err) => finalizeAll(window => window.error(err))
      ),
      // Teardown logic: clear active windows reference
      () => {
        activeWindows = null;
      }
    );
  });
}

module.exports = windowTimeOperator;