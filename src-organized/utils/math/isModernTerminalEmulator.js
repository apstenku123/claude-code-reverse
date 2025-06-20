/**
 * Determines if the current environment is a modern or enhanced terminal emulator.
 *
 * This function inspects the environment variables and platform to detect if the process
 * is running inside a modern terminal emulator (such as VSCode, Alacritty, JetBrains, etc.).
 *
 * @returns {boolean} True if running in a modern/enhanced terminal emulator, false otherwise.
 */
function isModernTerminalEmulator() {
  // Destructure environment variables from the global EG0 object
  const { env: environment } = EG0;
  const {
    TERM: termType,
    TERM_PROGRAM: termProgram,
    WT_SESSION: windowsTerminalSession,
    TERMINUS_SUBLIME: terminusSublime,
    ConEmuTask: conEmuTask,
    TERMINAL_EMULATOR: terminalEmulator
  } = environment;

  // If not on Windows, return true if TERM is not 'linux' (i.e., likely a modern terminal)
  if (EG0.platform !== "win32") {
    return termType !== "linux";
  }

  // On Windows, check for various modern terminal indicators
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

module.exports = isModernTerminalEmulator;