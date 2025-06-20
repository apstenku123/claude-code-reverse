/**
 * Returns an object containing standardized HTTP headers that describe the current JavaScript runtime environment.
 * The headers include information about the language, package version, operating system, architecture,
 * runtime type, and runtime version. The function detects the environment (Deno, Edge, Node.js, or browser)
 * and formats the header values accordingly.
 *
 * @returns {Object} An object mapping header names to their respective values, describing the runtime environment.
 */
function getRuntimeEnvironmentHeaders() {
  // Detect the current runtime environment using fq6 (returns 'deno', 'node', etc.)
  const runtimeType = fq6();

  // If running in Deno
  if (runtimeType === "deno") {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": OR,
      "X-Stainless-OS": getPlatformDisplayName(Deno.build.os),
      "X-Stainless-Arch": normalizeArchitectureName(Deno.build.arch),
      "X-Stainless-Runtime": "deno",
      // Deno.version is an object; use .deno property if available, else fallback
      "X-Stainless-Runtime-Version": typeof Deno.version === "string"
        ? Deno.version
        : Deno.version?.deno ?? "unknown"
    };
  }

  // If running in Edge Runtime (e.g., Vercel Edge Functions)
  if (typeof EdgeRuntime !== "undefined") {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": OR,
      "X-Stainless-OS": "Unknown",
      // EdgeRuntime is a string describing the edge runtime version
      "X-Stainless-Arch": `other:${EdgeRuntime}`,
      "X-Stainless-Runtime": "edge",
      "X-Stainless-Runtime-Version": globalThis.process.version
    };
  }

  // If running in Node.js
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

  // If running in a browser or other environment detected by detectBrowserAndVersion
  const browserInfo = detectBrowserAndVersion();
  if (browserInfo) {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": OR,
      "X-Stainless-OS": "Unknown",
      "X-Stainless-Arch": "unknown",
      // browserInfo.browser is a string describing the browser name
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

module.exports = getRuntimeEnvironmentHeaders;