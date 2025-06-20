/**
 * Detects the current terminal or editor environment based on process.env variables.
 *
 * This function inspects various environment variables to determine which terminal emulator,
 * code editor, or remote session is currently running the process. It returns a string
 * identifier for the detected environment, or null if none is detected.
 *
 * @returns {string|null} a string representing the detected environment, or null if undetected.
 */
function detectTerminalOrEditorEnvironment() {
  const env = process.env;

  // Check for Cursor trace updateSnapshotAndNotify
  if (env.CURSOR_TRACE_ID) return "cursor";

  // Check for VSCode Git Askpass pointing to cursor or windsurf server
  if (env.VSCODE_GIT_ASKPASS_MAIN?.includes("/.cursor-server/bin/")) return "cursor";
  if (env.VSCODE_GIT_ASKPASS_MAIN?.includes("/.windsurf-server/bin/")) return "windsurf";

  // Check for macOS application bundle identifier (for JetBrains, VSCodium, etc.)
  const bundleIdentifier = env.__CFBundleIdentifier?.toLowerCase();
  if (bundleIdentifier) {
    if (bundleIdentifier.includes("vscodium")) return "codium";
    if (bundleIdentifier.includes("windsurf")) return "windsurf";
    if (bundleIdentifier.includes("pycharm")) return "pycharm";
    if (bundleIdentifier.includes("intellij")) return "intellij";
    if (bundleIdentifier.includes("webstorm")) return "webstorm";
    if (bundleIdentifier.includes("phpstorm")) return "phpstorm";
    if (bundleIdentifier.includes("rubymine")) return "rubymine";
    if (bundleIdentifier.includes("clion")) return "clion";
    if (bundleIdentifier.includes("goland")) return "goland";
    if (bundleIdentifier.includes("rider")) return "rider";
    if (bundleIdentifier.includes("datagrip")) return "datagrip";
    if (bundleIdentifier.includes("appcode")) return "appcode";
    if (bundleIdentifier.includes("dataspell")) return "dataspell";
    if (bundleIdentifier.includes("aqua")) return "aqua";
    if (bundleIdentifier.includes("gateway")) return "gateway";
    if (bundleIdentifier.includes("fleet")) return "fleet";
    if (bundleIdentifier.includes("com.google.android.studio")) return "androidstudio";
  }

  // JetBrains JediTerm (PyCharm, etc.)
  if (env.TERMINAL_EMULATOR === "JetBrains-JediTerm") return "pycharm";

  // Ghostty terminal
  if (env.TERM === "xterm-ghostty") return "ghostty";

  // Kitty terminal
  if (env.TERM?.includes("kitty")) return "kitty";

  // Generic terminal program
  if (env.TERM_PROGRAM) return env.TERM_PROGRAM;

  // Tmux
  if (env.TMUX) return "tmux";

  // GNU Screen
  if (env.STY) return "screen";

  // Konsole
  if (env.KONSOLE_VERSION) return "konsole";

  // GNOME Terminal
  if (env.GNOME_TERMINAL_SERVICE) return "gnome-terminal";

  // XTerm
  if (env.XTERM_VERSION) return "xterm";

  // VTE-based terminals
  if (env.VTE_VERSION) return "vte-based";

  // Terminator
  if (env.TERMINATOR_UUID) return "terminator";

  // Kitty terminal (alternate detection)
  if (env.KITTY_WINDOW_ID) return "kitty";

  // Alacritty
  if (env.ALACRITTY_LOG) return "alacritty";

  // Tilix
  if (env.TILIX_ID) return "tilix";

  // Windows Terminal
  if (env.WT_SESSION) return "windows-terminal";

  // Cygwin
  if (env.SESSIONNAME && env.TERM === "cygwin") return "cygwin";

  // MSYS2/MinGW
  if (env.MSYSTEM) return env.MSYSTEM.toLowerCase();

  // ConEmu
  if (env.ConEmuTask) return "conemu";

  // Windows Subsystem for Linux
  if (env.WSL_DISTRO_NAME) return `wsl-${env.WSL_DISTRO_NAME}`;

  // SSH session
  if (env.SSH_CONNECTION || env.SSH_CLIENT || env.SSH_TTY) return "ssh-session";

  // Fallback: inspect TERM variable for known terminal types
  if (env.TERM) {
    const termValue = env.TERM;
    if (termValue.includes("alacritty")) return "alacritty";
    if (termValue.includes("rxvt")) return "rxvt";
    if (termValue.includes("termite")) return "termite";
    return termValue;
  }

  // If not running in a TTY, isBlobOrFileLikeObject'createInteractionAccessor non-interactive
  if (!process.stdout.isTTY) return "non-interactive";

  // No environment detected
  return null;
}

module.exports = detectTerminalOrEditorEnvironment;
