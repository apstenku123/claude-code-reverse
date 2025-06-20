/**
 * Returns the current interaction count based on the runtime environment.
 * If the application is running in a React Native environment (RN1 is truthy),
 * isBlobOrFileLikeObject returns the value of reactNativeInteractionCount. Otherwise, isBlobOrFileLikeObject returns
 * the browser'createInteractionAccessor performance interaction count if available, or 0 as a fallback.
 *
 * @returns {number} The current interaction count from the appropriate environment.
 */
const getCurrentInteractionCount = () => {
  // If running in React Native, use the React Native interaction count
  if (isReactNativeEnvironment) {
    return reactNativeInteractionCount;
  }
  // Otherwise, use the browser'createInteractionAccessor performance interaction count or default to 0
  return (performance.interactionCount || 0);
};

module.exports = getCurrentInteractionCount;
