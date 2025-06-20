/**
 * Determines if the current terminal emulator is supported based on environment variables and platform.
 *
 * @returns {boolean} True if the terminal emulator is supported, false otherwise.
 */
function isSupportedTerminalEmulator() {
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

  // If not running on Windows, check if TERM is not 'linux'
  if (EG0.platform !== "win32") {
    return termType !== "linux";
  }

  // On Windows, check for various supported terminal emulators
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

module.exports = isSupportedTerminalEmulator;