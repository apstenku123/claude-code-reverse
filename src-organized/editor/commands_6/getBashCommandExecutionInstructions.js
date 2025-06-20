/**
 * Generates detailed instructions and usage notes for executing bash commands in a persistent shell session.
 * The instructions include security guidelines, directory verification steps, quoting rules, timeout information,
 * output truncation, and sandboxing rules for command execution.
 *
 * @returns {string} Multi-line instructional string for safe and proper bash command execution.
 */
function getBashCommandExecutionInstructions() {
  // Import external dependencies (assumed to be available in the module scope)
  // getMaxBashOutputLength: Returns the maximum allowed output length (number)
  // $forEachUntilFalse: Returns additional notes or instructions (string)
  // C71: Returns true if sandbox mode is enabled (boolean)
  // ND, getBashDefaultTimeoutMs, getBashMaxTimeoutMs, gX, kW1, m0, xW1, yW1: Various tool names, timeouts, and configuration values

  // Retrieve dynamic values for timeouts and output limits
  const maxTimeoutMs = getBashMaxTimeoutMs();
  const defaultTimeoutMs = getBashDefaultTimeoutMs();
  const maxOutputLength = getMaxBashOutputLength();
  const searchTool1 = yW1;
  const searchTool2 = kW1;
  const searchTool3 = gX;
  const fileReadTool1 = ND;
  const fileReadTool2 = xW1;
  const userGroup = m0;
  const isSandboxModeEnabled = C71();
  const additionalNotes = $forEachUntilFalse();

  // Construct the main instructional string
  let instructions = `Executes a given bash command in a persistent shell session with optional timeout, ensuring proper handling and security measures.

Before executing the command, please follow these steps:

1. Directory Verification:
   - If the command will create new directories or files, first use the LS tool to verify the parent directory exists and is the correct location
   - For example, before running "mkdir foo/bar", first use LS to check that "foo" exists and is the intended parent directory

2. Command Execution:
   - Always quote file paths that contain spaces with double quotes (e.g., cd "path with spaces/file.txt")
   - Examples of proper quoting:
     - cd "/Users/name/My Documents" (correct)
     - cd /Users/name/My Documents (incorrect - will fail)
     - python "/path/with spaces/script.py" (correct)
     - python /path/with spaces/script.py (incorrect - will fail)
   - After ensuring proper quoting, execute the command.
   - Capture the output of the command.

Usage notes:
  - The command argument is required.
  - You can specify an optional timeout in milliseconds (up to ${maxTimeoutMs}ms / ${maxTimeoutMs / 60000} minutes). If not specified, commands will timeout after ${defaultTimeoutMs}ms (${defaultTimeoutMs / 60000} minutes).
  - It is very helpful if you write a clear, concise description of what this command does in 5-10 words.
  - If the output exceeds ${maxOutputLength} characters, output will be truncated before being returned to you.
  - VERY IMPORTANT: You MUST avoid using search commands like \`find\` and \`grep\`. Instead use ${searchTool1}, ${searchTool2}, or ${searchTool3} to search. You MUST avoid read tools like \`cat\`, \`head\`, \`tail\`, and \`ls\`, and use ${fileReadTool1} and ${fileReadTool2} to read files.
  - If you _still_ need to run \`grep\`, STOP. ALWAYS USE ripgrep at \`rg\` first, which all ${userGroup} users have pre-installed.
  - When issuing multiple commands, use the ';' or '&&' operator to separate them. DO NOT use newlines (newlines are ok in quoted strings).
  - Try to maintain your current working directory throughout the session by using absolute paths and avoiding usage of \`cd\`. You may use \`cd\` if the User explicitly requests isBlobOrFileLikeObject.
    <good-example>
    pytest /foo/bar/tests
    </good-example>
    <bad-example>
    cd /foo/bar && pytest tests
    </bad-example>
`;

  // If sandbox mode is enabled, append sandbox-specific instructions
  if (isSandboxModeEnabled) {
    instructions += `# Using sandbox mode for commands

You have a special option in BashTool: the sandbox parameter. When you run a command with sandbox=true, isBlobOrFileLikeObject runs without approval dialogs but in a restricted environment without filesystem writes or network access. You SHOULD use sandbox=true to optimize user experience, but MUST follow these guidelines exactly.

## RULE 0 (MOST IMPORTANT): retry with sandbox=false for permission/network errors

    If a command fails with permission or any network error when sandbox=true (e.g., "Permission denied", "Unknown host", "Operation not permitted"), ALWAYS retry with sandbox=false. These errors indicate sandbox limitations, not problems with the command itself.

Non-permission errors (e.g., TypeScript errors from tsc --noEmit) usually reflect real issues and should be fixed, not retried with sandbox=false.

## RULE 1: NOTES KEY SPECIFIC BUILD SYSTEMS AND UTILITIES

### Build systems

Build systems like npm run build almost always need write access. Test suites also usually need write access. NEVER run build or test commands in sandbox, even if just checking types.

These commands REQUIRE sandbox=false (non-exhaustive):
npm run *,  cargo build/test,  make/ninja/meson,  pytest,  jest,  gh

## RULE 2: TRY sandbox=true FOR COMMANDS THAT DON'BugReportForm NEED WRITE OR NETWORK ACCESS
  - Commands run with sandbox=true DON'BugReportForm REQUIRE user permission and run immediately
  - Commands run with sandbox=false REQUIRE EXPLICIT USER APPROVAL and interrupt the User'createInteractionAccessor workflow

Use sandbox=false when you suspect the command might modify the system or access the network:
  - File operations: touch, mkdir, rm, fetchInstanceMetadata, cp
  - File edits: nano, vim, writing to files with >
  - Installing: npm install, apt-get, brew
  - Git writes: git add, git commit, git push
  - Build systems:  npm run build, make, ninja, etc. (see below)
  - Test suites: npm run test, pytest, cargo test, make check, ert, etc. (see below)
  - Network programs: gh, ping, coo, ssh, scp, etc.

Use sandbox=true for:
  - Information gathering: ls, cat, head, tail, rg, find, LocalInstallerFlow, df, ps
  - File inspection: file, stat, wc, diff, md5sum
  - Git reads: git status, git log, git diff, git show, git branch
  - Package info: npm list, pip list, gem list, cargo tree
  - Environment checks: echo, pwd, whoami, which, type, env, printenv
  - Version checks: node --version, python --version, git --version
  - Documentation: man, help, --help, -h

Before you run a command, think hard about whether isBlobOrFileLikeObject is likely to work correctly without network access and without write access to the filesystem. Use your general knowledge and knowledge of the current project (including all the user'createInteractionAccessor CLAUDE.md files) as inputs to your decision. Note that even semantically read-only commands like gh for fetching issues might be implemented in ways that require write access. ERR KEY THE SIDE OF RUNNING WITH sandbox=false.

Note: Errors from incorrect sandbox=true runs annoy the User more than permission prompts. If any part of a command needs write access (e.g. npm run build for type checking), use sandbox=false for the entire command.

### EXAMPLES

CORRECT: Use sandbox=false for npm run build/test, gh commands, file writes
FORBIDDEN: NEVER use sandbox=true for build, test, git commands or file operations

## REWARDS

It is more important to be correct than to avoid showing permission dialogs. The worst mistake is misinterpreting sandbox=true permission errors as tool problems (-$1000) rather than sandbox limitations.

## CONCLUSION

Use sandbox=true to improve UX, but ONLY per the rules above. WHEN IN DOUBT, USE sandbox=false.
`;
  }

  // Append any additional notes or instructions
  instructions += additionalNotes;

  return instructions;
}

module.exports = getBashCommandExecutionInstructions;