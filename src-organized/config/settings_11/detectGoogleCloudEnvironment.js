/**
 * Detects the current Google Cloud environment in which the code is running.
 * Checks for App Engine, Cloud Functions, Kubernetes Engine, Cloud Run, or Compute Engine.
 * Returns a constant from the deepCloneWithCycleDetection$ object representing the detected environment.
 *
 * @async
 * @returns {string} One of the deepCloneWithCycleDetection$ environment constants (e.g., deepCloneWithCycleDetection$.APP_ENGINE, deepCloneWithCycleDetection$.CLOUD_FUNCTIONS, etc.)
 */
async function detectGoogleCloudEnvironment() {
  let detectedEnvironment = deepCloneWithCycleDetection$.NONE;

  // Check if running on App Engine
  if (hA5()) {
    detectedEnvironment = deepCloneWithCycleDetection$.APP_ENGINE;
  } 
  // Check if running on Cloud Functions
  else if (mA5()) {
    detectedEnvironment = deepCloneWithCycleDetection$.CLOUD_FUNCTIONS;
  } 
  // Check if running on a Google Cloud environment (Kubernetes, Cloud Run, or Compute Engine)
  else if (await pA5()) {
    // Check if running on Kubernetes Engine
    if (await uA5()) {
      detectedEnvironment = deepCloneWithCycleDetection$.KUBERNETES_ENGINE;
    } 
    // Check if running on Cloud Run
    else if (dA5()) {
      detectedEnvironment = deepCloneWithCycleDetection$.CLOUD_RUN;
    } 
    // Default to Compute Engine if none of the above
    else {
      detectedEnvironment = deepCloneWithCycleDetection$.COMPUTE_ENGINE;
    }
  } 
  // If none of the above, default to NONE
  else {
    detectedEnvironment = deepCloneWithCycleDetection$.NONE;
  }

  return detectedEnvironment;
}

module.exports = detectGoogleCloudEnvironment;