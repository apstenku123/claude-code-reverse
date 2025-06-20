/**
 * Returns possible configuration directories for JetBrains products (and Android Studio) based on the platform and product name.
 *
 * @param {string} productName - The name of the JetBrains product (e.g., 'WebStorm', 'PyCharm', 'AndroidStudio').
 * @returns {string[]} Array of absolute paths to possible configuration directories for the specified product.
 */
function getJetBrainsConfigDirectories(productName) {
  const homeDirectory = io.homedir();
  const configDirectories = [];
  // Lookup possible config folder suffixes for this product
  const productConfigSuffixes = qc1[productName.toLowerCase()];
  if (!productConfigSuffixes) return configDirectories;

  // Windows-specific environment variables and fallback paths
  const appDataPath = process.env.APPDATA || K3.join(homeDirectory, "AppData", "Roaming");
  const localAppDataPath = process.env.LOCALAPPDATA || K3.join(homeDirectory, "AppData", "Local");

  switch (io.platform()) {
    case "darwin": // macOS
      // Standard JetBrains config locations
      configDirectories.push(
        K3.join(homeDirectory, "Library", "Application Support", "JetBrains"),
        K3.join(homeDirectory, "Library", "Application Support")
      );
      // Android Studio has a Google config directory on macOS
      if (productName.toLowerCase() === "androidstudio") {
        configDirectories.push(
          K3.join(homeDirectory, "Library", "Application Support", "Google")
        );
      }
      break;
    case "win32": // Windows
      // Standard JetBrains config locations
      configDirectories.push(
        K3.join(appDataPath, "JetBrains"),
        K3.join(localAppDataPath, "JetBrains"),
        K3.join(appDataPath)
      );
      // Android Studio has a Google config directory on Windows
      if (productName.toLowerCase() === "androidstudio") {
        configDirectories.push(
          K3.join(localAppDataPath, "Google")
        );
      }
      break;
    case "linux":
      // Standard JetBrains config locations
      configDirectories.push(
        K3.join(homeDirectory, ".config", "JetBrains"),
        K3.join(homeDirectory, ".local", "share", "JetBrains")
      );
      // Add product-specific hidden directories (e.g., ~/.WebStorm2022.1)
      for (const configSuffix of productConfigSuffixes) {
        configDirectories.push(K3.join(homeDirectory, "." + configSuffix));
      }
      // Android Studio has a Google config directory on Linux
      if (productName.toLowerCase() === "androidstudio") {
        configDirectories.push(
          K3.join(homeDirectory, ".config", "Google")
        );
      }
      break;
    default:
      // Unsupported platform; return empty array
      break;
  }
  return configDirectories;
}

module.exports = getJetBrainsConfigDirectories;