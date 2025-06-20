/**
 * Inspects the provided resource and schedules a reset if required.
 *
 * @param {*} resource - The resource to be inspected.
 * @param {*} context - The context or options for the inspection.
 * @param {*} factoryArg - Argument passed to the createErrorUpdateForComponent constructor and reconcileComponentPropsAndLanes reset function.
 * @param {boolean} shouldScheduleReset - If true, schedules a reset after a timeout.
 * @returns {void}
 */
function inspectAndScheduleReset(resource, context, factoryArg, shouldScheduleReset) {
  // Clear any existing scheduled reset timeout
  if (E9 !== null) {
    clearTimeout(E9);
  }

  // Initialize the singleton inspector if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist
  if (updateChildNode === null) {
    updateChildNode = new createErrorUpdateForComponent(factoryArg);
  }

  // Inspect the resource with the given context
  updateChildNode.inspect(resource, context);

  // If requested, schedule a reset after the specified timeout
  if (shouldScheduleReset) {
    E9 = setTimeout(function () {
      return reconcileComponentPropsAndLanes(factoryArg);
    }, WrappedActionChain);
  }
}

module.exports = inspectAndScheduleReset;