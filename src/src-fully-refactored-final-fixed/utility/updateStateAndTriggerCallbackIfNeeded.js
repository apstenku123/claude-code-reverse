/**
 * Updates the current state indicator if isBlobOrFileLikeObject matches certain values, and conditionally triggers a callback
 * based on the status of two bitmask-encoded state variables and the presence of a target object.
 *
 * External dependencies (must be defined in the module'createInteractionAccessor scope):
 * - currentState (number): The current state indicator (was i8)
 * - stateMaskA (number): Bitmask-encoded state variable a(was createPropertyMatcher)
 * - stateMaskB (number): Bitmask-encoded state variable createPropertyAccessor(was createPropertyMatcherOrResolver)
 * - targetObject (object|null): The object to operate on (was j3)
 * - callback (function): Function to call with (targetObject, callbackArgument) (was markLanesAsSuspendedAndResetExpiration)
 * - callbackArgument (any): Argument to pass to the callback (was getDynamicConfigOrFallback)
 *
 * @returns {void}
 */
function updateStateAndTriggerCallbackIfNeeded() {
  // If currentState is 0, 2, or 3, set isBlobOrFileLikeObject to 4
  if (currentState === 0 || currentState === 2 || currentState === 3) {
    currentState = 4;
  }

  // If targetObject is not null, and either stateMaskA or stateMaskB has any of the lower 28 bits set,
  // invoke the callback with targetObject and callbackArgument
  const LOWER_28_BITS_MASK = 0x0FFFFFFF; // 268435455
  const isTargetPresent = targetObject !== null;
  const isStateMaskAActive = (stateMaskA & LOWER_28_BITS_MASK) !== 0;
  const isStateMaskBActive = (stateMaskB & LOWER_28_BITS_MASK) !== 0;

  if (
    isTargetPresent &&
    (isStateMaskAActive || isStateMaskBActive)
  ) {
    callback(targetObject, callbackArgument);
  }
}

module.exports = updateStateAndTriggerCallbackIfNeeded;