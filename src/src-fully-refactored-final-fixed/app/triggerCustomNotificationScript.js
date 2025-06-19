/**
 * Triggers a custom notification script using provided observable data and configuration.
 *
 * @async
 * @function triggerCustomNotificationScript
 * @param {Object} sourceObservable - The observable object containing notification data (e.g., title, message).
 * @param {Object} config - Configuration object used to resolve the observable path.
 * @returns {Promise<void>} Resolves when the notification script is triggered, or does nothing if an error occurs.
 */
async function triggerCustomNotificationScript(sourceObservable, config) {
  try {
    // Use the title from the observable, or a default value if not present
    const notificationTitle = sourceObservable.title || m0;
    // Resolve the observable path using the provided config and context
    const resolvedPath = resolveObservablePath(config, iA());
    // Trigger the notification script with the resolved path, title, and message
    await i0(resolvedPath, [notificationTitle, sourceObservable.message]);
  } catch (error) {
    // Log any errors that occur during notification triggering
    HG(`Error triggering custom notify script: ${String(error)}`);
  }
}

module.exports = triggerCustomNotificationScript;