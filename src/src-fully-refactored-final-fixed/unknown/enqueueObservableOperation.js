/**
 * Enqueues an observable operation for processing, logs the enqueue action, and triggers the processing queue.
 *
 * @param {Array} observableOperation - An array containing the observable and its configuration.
 *   observableOperation[0]: { name: string } - The observable object with a 'name' property.
 *   observableOperation[1]: any - The configuration or payload for the operation.
 * @returns {void}
 */
function enqueueObservableOperation(observableOperation) {
  // Log the enqueue action with the observable'createInteractionAccessor name and configuration
  tP("ENQUEUE", observableOperation[0].name, observableOperation[1]);

  // Add the operation to the processing queue
  J3[wG].push(observableOperation);

  // Trigger the processing of the queue
  processPendingTasks();
}

module.exports = enqueueObservableOperation;