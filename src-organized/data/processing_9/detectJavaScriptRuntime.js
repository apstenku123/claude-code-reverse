/**
 * Detects the current JavaScript runtime environment.
 *
 * Checks for Deno, Edge Runtime, Node.js, or returns 'unknown' if none are detected.
 *
 * @returns {string} The name of the detected runtime environment: 'deno', 'edge', 'node', or 'unknown'.
 */
function detectJavaScriptRuntime() {
  // Check if running in Deno by verifying the global Deno object and its build property
  if (typeof Deno !== "undefined" && Deno.build != null) {
    return "deno";
  }

  // Check if running in Edge Runtime by verifying the global EdgeRuntime object
  if (typeof EdgeRuntime !== "undefined") {
    return "edge";
  }

  // Check if running in Node.js by inspecting the global process object
  // The Object.prototype.toString.call is used to get the internal [[Class]] property
  // In Node.js, this returns '[object process]'
  const areObjectsDeepEqual = typeof globalThis.process !== "undefined" ? globalThis.process : 0;
  if (Object.prototype.toString.call(areObjectsDeepEqual) === "[object process]") {
    return "node";
  }

  // If none of the above, return 'unknown'
  return "unknown";
}

module.exports = detectJavaScriptRuntime;