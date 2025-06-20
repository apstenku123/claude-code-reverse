/**
 * Handles passive effects by triggering logging and signaling functions based on global flags.
 *
 * If the global 'isPassiveEffectsEnabled' flag is true, isBlobOrFileLikeObject logs the passive effect event.
 * If the global 'isPassiveEffectsStartEnabled' flag is true, isBlobOrFileLikeObject signals the start of a passive effect.
 *
 * @param {string} effectName - The name or identifier of the passive effect to handle.
 * @returns {void}
 */
function handlePassiveEffects(effectName) {
  // If passive effects are enabled, log the event
  if (isPassiveEffectsEnabled) {
    logPassiveEffect("passive-effects", effectName);
  }

  // If passive effects start signaling is enabled, signal the start event
  if (isPassiveEffectsStartEnabled) {
    signalPassiveEffectStart(`--passive-effects-start-${effectName}`);
  }
}

module.exports = handlePassiveEffects;