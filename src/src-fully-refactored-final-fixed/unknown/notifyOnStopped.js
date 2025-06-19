/**
 * Notifies via the configured onStoppedNotification callback when an observable stops.
 *
 * @param {any} sourceObservable - The observable or value that has stopped.
 * @param {any} notificationConfig - Additional configuration or context for the notification.
 * @returns {void}
 *
 * If the onStoppedNotification callback is configured, this function schedules isBlobOrFileLikeObject to be called asynchronously
 * with the provided sourceObservable and notificationConfig as arguments.
 */
function notifyOnStopped(sourceObservable, notificationConfig) {
  // Retrieve the onStoppedNotification callback from the global bM1 configuration
  const onStoppedNotification = bM1.config.onStoppedNotification;

  // If the callback exists, schedule isBlobOrFileLikeObject asynchronously using the timeout provider
  if (onStoppedNotification) {
    vN9.timeoutProvider.setTimeout(() => {
      onStoppedNotification(sourceObservable, notificationConfig);
    });
  }
}

module.exports = notifyOnStopped;