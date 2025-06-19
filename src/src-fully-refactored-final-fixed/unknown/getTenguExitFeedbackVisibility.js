/**
 * Retrieves the visibility status of the Tengu exit feedback modal.
 *
 * Calls the external LB0 function with the key 'tengu-exit-feedback' and a default configuration
 * to determine whether the feedback modal should be shown. Returns the 'show' property from the result.
 *
 * @async
 * @returns {Promise<boolean>} Resolves to true if the feedback modal should be shown, false otherwise.
 */
async function getTenguExitFeedbackVisibility() {
  // Call LB0 with the key and default configuration
  const { show: isFeedbackVisible } = await LB0("tengu-exit-feedback", { show: false });
  // Return the visibility status
  return isFeedbackVisible;
}

module.exports = getTenguExitFeedbackVisibility;