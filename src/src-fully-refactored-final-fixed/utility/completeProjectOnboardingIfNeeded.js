/**
 * Checks if the user needs to complete project onboarding and updates the onboarding status if necessary.
 *
 * This utility retrieves the current user/project state, checks if the project onboarding
 * has not been completed and if the onboarding condition is met, then updates the state
 * to mark onboarding as completed.
 *
 * @returns {void} This function does not return a value.
 */
function completeProjectOnboardingIfNeeded() {
  // Retrieve the current project/user state
  const currentProjectState = getProjectSubscriptionConfig();

  // Check if onboarding is required and has not been completed yet
  if (vi0() && !currentProjectState.hasCompletedProjectOnboarding) {
    // Update the project state to mark onboarding as completed
    updateProjectInConfig({
      ...currentProjectState,
      hasCompletedProjectOnboarding: true
    });
  }
}

module.exports = completeProjectOnboardingIfNeeded;