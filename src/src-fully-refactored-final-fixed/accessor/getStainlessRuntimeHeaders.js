/**
 * Returns a set of HTTP headers describing the current JavaScript runtime environment.
 *
 * The headers include information about the language, package version, operating system,
 * architecture, runtime type, and runtime version. The function detects the environment
 * (Deno, Node.js, Edge, or browser) and normalizes the values for consistency.
 *
 * @returns {Object} An object containing the stainless runtime headers.
 */
function getStainlessRuntimeHeaders() {
  // Detect the current runtime environment ("deno", "node", etc.)
  const runtimeType = fq6();

  // Handle Deno environment
  if (runtimeType === "deno") {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": OR,
      "X-Stainless-OS": getPlatformDisplayName(Deno.build.os),
      "X-Stainless-Arch": normalizeArchitectureName(Deno.build.arch),
      "X-Stainless-Runtime": "deno",
      // Deno.version may be an object; handle both string and object cases
      "X-Stainless-Runtime-Version": typeof Deno.version === "string"
        ? Deno.version
        : Deno.version?.deno ?? "unknown"
    };
  }

  // Handle Edge Runtime environment (e.g., Vercel Edge Functions)
  if (typeof EdgeRuntime !== "undefined") {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": OR,
      "X-Stainless-OS": "Unknown",
      // EdgeRuntime is a string identifier for the edge environment
      "X-Stainless-Arch": `other:${EdgeRuntime}`,
      "X-Stainless-Runtime": "edge",
      // Use Node.js-like version if available
      "X-Stainless-Runtime-Version": globalThis.process.version
    };
  }

  // Handle Node.js environment
  if (runtimeType === "node") {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": OR,
      "X-Stainless-OS": getPlatformDisplayName(globalThis.process.platform),
      "X-Stainless-Arch": normalizeArchitectureName(globalThis.process.arch),
      "X-Stainless-Runtime": "node",
      "X-Stainless-Runtime-Version": globalThis.process.version
    };
  }

  // Handle browser or other environments using user agent detection
  const browserInfo = detectBrowserAndVersion();
  if (browserInfo) {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": OR,
      "X-Stainless-OS": "Unknown",
      "X-Stainless-Arch": "unknown",
      "X-Stainless-Runtime": `browser:${browserInfo.browser}`,
      "X-Stainless-Runtime-Version": browserInfo.version
    };
  }

  // Fallback for unknown environments
  return {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": OR,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": "unknown",
    "X-Stainless-Runtime-Version": "unknown"
  };
}

module.exports = getStainlessRuntimeHeaders;