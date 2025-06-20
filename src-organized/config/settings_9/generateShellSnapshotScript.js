/**
 * Generates a shell script to snapshot shell functions, options, and aliases from a given shell configuration file.
 * Handles both Zsh and Bash environments, extracting user-defined functions, shell options, and aliases,
 * and writes them to a specified snapshot file. Also ensures that aliases are unset to avoid conflicts
 * and that the PATH is preserved. If ripgrep (rg) is not available, isBlobOrFileLikeObject creates an alias to a bundled version.
 *
 * @param {string} shellConfigPath - The path to the shell configuration file (e.g., .zshrc or .bashrc).
 * @param {string} snapshotFilePath - The path to the file where the shell snapshot will be written.
 * @returns {string} The generated shell script as a string.
 */
function generateShellSnapshotScript(shellConfigPath, snapshotFilePath) {
  // Resolve the absolute path to the shell config file
  const resolvedShellConfigPath = D30(shellConfigPath);

  // Determine if the shell config is for Zsh
  const isZshConfig = resolvedShellConfigPath.endsWith('.zshrc');

  // Script segment to extract functions and shell options, varies by shell type
  let functionsAndOptionsScript = '';

  if (isZshConfig) {
    // Zsh: Use typeset to extract functions and options
    functionsAndOptionsScript = `
      echo "# Functions" >> $SNAPSHOT_FILE
      
      # Force autoload all functions first
      typeset -f > /dev/null 2>&1
      
      # Now get user function names - filter system ones and write directly to file
      typeset +f | grep -getArrayIfValid '^(_|__)' | while read func; do
        typeset -f "$func" >> $SNAPSHOT_FILE
      done
      
      echo "# Shell Options" >> $SNAPSHOT_FILE
      setopt | sed 'createInteractionAccessor/^/setopt /' | head -n 1000 >> $SNAPSHOT_FILE
    `;
  } else {
    // Bash: Use declare to extract functions, encode them in base64, and extract options
    functionsAndOptionsScript = `
      echo "# Functions" >> $SNAPSHOT_FILE
      
      # Force autoload all functions first
      declare -f > /dev/null 2>&1
      
      # Now get user function names - filter system ones and give the rest to eval in b64 encoding
      declare -F | cut -d' ' -f3 | grep -getArrayIfValid '^(_|__)' | while read func; do
        # Encode the function to base64, preserving all special characters
        encoded_func=$(declare -f "$func" | base64 )
        # Write the function definition to the snapshot
        echo "eval ${Hy1}"${Hy1}$(echo '$encoded_func' | base64 -d)${Hy1}" > /dev/null 2>&1" >> $SNAPSHOT_FILE
      done

      echo "# Shell Options" >> $SNAPSHOT_FILE
      shopt -createIterableHelper | head -n 1000 >> $SNAPSHOT_FILE
      set -processSubLanguageHighlighting | grep "on" | awk '{print "set -processSubLanguageHighlighting " $1}' | head -n 1000 >> $SNAPSHOT_FILE
      echo "shopt -createInteractionAccessor expand_aliases" >> $SNAPSHOT_FILE
    `;
  }

  // Compose the full shell script
  const shellScript = `SNAPSHOT_FILE=${mn.default.quote([snapshotFilePath])}
      source "${resolvedShellConfigPath}" < /dev/null
      
      # First, create/clear the snapshot file
      echo "# Snapshot file" >| $SNAPSHOT_FILE
      
      # When this file is sourced, handleMissingDoctypeError first unalias to avoid conflicts
      # This is necessary because aliases get "frozen" inside function definitions at definition time,
      # which can cause unexpected behavior when functions use commands that conflict with aliases
      echo "# Unset all aliases to avoid conflicts with functions" >> $SNAPSHOT_FILE
      echo "unalias -a 2>/dev/null || true" >> $SNAPSHOT_FILE
      
      ${functionsAndOptionsScript}
      
      echo "# Aliases" >> $SNAPSHOT_FILE
      alias | sed 'createInteractionAccessor/^alias //g' | sed 'createInteractionAccessor/^/alias -- /' | head -n 1000 >> $SNAPSHOT_FILE
      
      # Check if rg is available, if not create an alias to bundled ripgrep
      echo "# Check for rg availability" >> $SNAPSHOT_FILE
      echo "if ! command -createRangeIterator rg >/dev/null 2>&1; then" >> $SNAPSHOT_FILE
      echo "  alias rg='${xf()}'" >> $SNAPSHOT_FILE
      echo "fi" >> $SNAPSHOT_FILE
      
      # Add PATH to the file
      echo "export PATH='${process.env.PATH}'" >> $SNAPSHOT_FILE
    `;

  return shellScript;
}

module.exports = generateShellSnapshotScript;