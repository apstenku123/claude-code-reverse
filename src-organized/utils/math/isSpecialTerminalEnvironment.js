/**
 * Determines if the current terminal environment matches a set of known special terminal emulators or configurations.
 *
 * This function inspects the process environment and platform to check for specific terminal emulators
 * (such as VSCode, JetBrains, Alacritty, etc.) or certain environment variables that indicate a special terminal.
 *
 * @returns {boolean} True if the environment matches a special terminal, false otherwise.
 */
function isSpecialTerminalEnvironment() {
  // Destructure the environment object from the global EG0 object
  const { env: environment } = EG0;
  // Extract commonly used environment variables
  const {
    TERM: termType,
    TERM_PROGRAM: termProgram,
    WT_SESSION: windowsTerminalSession,
    TERMINUS_SUBLIME: terminusSublime,
    ConEmuTask: conEmuTask,
    TERMINAL_EMULATOR: terminalEmulator
  } = environment;

  // If not running on Windows, return true if TERM is not 'linux'
  if (EG0.platform !== "win32") {
    return termType !== "linux";
  }

  // On Windows, check for a variety of special terminal indicators
  return Boolean(windowsTerminalSession) ||
    Boolean(terminusSublime) ||
    conEmuTask === "{cmd::Cmder}" ||
    termProgram === "Terminus-Sublime" ||
    termProgram === "vscode" ||
    termType === "xterm-256color" ||
    termType === "alacritty" ||
    termType === "rxvt-unicode" ||
    termType === "rxvt-unicode-256color" ||
    terminalEmulator === "JetBrains-JediTerm";
}

module.exports = isSpecialTerminalEnvironment;