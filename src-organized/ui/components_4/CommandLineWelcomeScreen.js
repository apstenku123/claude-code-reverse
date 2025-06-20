/**
 * Renders the interactive command-line welcome/help screen for Claude Code CLI.
 * Displays version, usage instructions, common tasks, and available commands, with staged reveal and exit handling.
 *
 * @param {Object} props - The component props
 * @param {Array<Object>} props.commands - Array of command objects to display (each with name, description, isHidden)
 * @param {Function} props.onClose - Callback to invoke when the user requests to close the screen
 * @returns {React.ReactElement}
 */
function CommandLineWelcomeScreen({
  commands,
  onClose
}) {
  // Get theme colors/styles
  const theme = getThemeStylesheet();

  // Static info constants
  const PACKAGE_INFO = {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
    VERSION: "1.0.19"
  };
  const learnMoreUrl = `Learn more at: ${PACKAGE_INFO.README_URL}`;

  // Filter out hidden commands and sort alphabetically
  const visibleCommands = commands
    .filter(command => !command.isHidden)
    .sort((a, b) => a.name.localeCompare(b.name));

  // State: controls staged reveal of help sections
  const [revealStep, setRevealStep] = I2.useState(0);

  // Reveal next help section every 250ms, up to 3 steps
  I2.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (revealStep < 3) setRevealStep(revealStep + 1);
    }, 250);
    return () => clearTimeout(timeoutId);
  }, [revealStep]);

  // Keyboard handler: close on Return or Escape
  D0((_, key) => {
    if (key.return || key.escape) onClose();
  });

  // Get exit key state (for double-press exit prompt)
  const exitKeyState = useCtrlKeyActionHandler(onClose);

  return I2.createElement(g, {
    flexDirection: "column",
    padding: 1
  },
    // Header: App name and version
    I2.createElement(_, {
      bold: true,
      color: theme.claude
    }, `${m0} defineOrAssignProperty{PACKAGE_INFO.VERSION}`),

    // Safety warning
    I2.createElement(g, {
      marginTop: 1,
      flexDirection: "column"
    },
      I2.createElement(_, null, "Always review Claude'createInteractionAccessor responses, especially when running code. Claude has read access to files in the current directory and can run commands and edit files with your permission.")
    ),

    // Usage modes (revealed at step 1)
    revealStep >= 1 && I2.createElement(g, {
      flexDirection: "column",
      marginTop: 1
    },
      I2.createElement(_, { bold: true }, "Usage Modes:"),
      I2.createElement(_, null, "• REPL: ", I2.createElement(_, { bold: true }, "claude"), " (interactive session)"),
      I2.createElement(_, null, "• Non-interactive: ", I2.createElement(_, { bold: true }, 'claude -createIterableHelper "question"')),
      I2.createElement(g, { marginTop: 1 },
        I2.createElement(_, null, "Run ", I2.createElement(_, { bold: true }, "claude -h"), " for all command line options")
      )
    ),

    // Common tasks (revealed at step 2)
    revealStep >= 2 && I2.createElement(g, {
      marginTop: 1,
      flexDirection: "column"
    },
      I2.createElement(_, { bold: true }, "Common Tasks:"),
      I2.createElement(_, null, "• Ask questions about your codebase ", I2.createElement(_, { color: getThemeStylesheet().secondaryText }, "> How does foo.py work?")),
      I2.createElement(_, null, "• Edit files ", I2.createElement(_, { color: getThemeStylesheet().secondaryText }, "> Update bar.ts to...")),
      I2.createElement(_, null, "• Fix errors ", I2.createElement(_, { color: getThemeStylesheet().secondaryText }, "> cargo build")),
      I2.createElement(_, null, "• Run commands ", I2.createElement(_, { color: getThemeStylesheet().secondaryText }, "> /help")),
      I2.createElement(_, null, "• Run bash commands ", I2.createElement(_, { color: getThemeStylesheet().secondaryText }, "> !ls"))
    ),

    // Interactive mode commands (revealed at step 3)
    revealStep >= 3 && I2.createElement(g, {
      marginTop: 1,
      flexDirection: "column"
    },
      I2.createElement(_, { bold: true }, "Interactive Mode Commands:"),
      I2.createElement(g, { flexDirection: "column" },
        visibleCommands.map((command, idx) => I2.createElement(g, {
          key: idx,
          marginLeft: 1
        },
          I2.createElement(_, { bold: true }, `/${command.name}`),
          I2.createElement(_, null, " - ", command.description)
        ))
      )
    ),

    // Learn more link
    I2.createElement(g, { marginTop: 1 },
      I2.createElement(_, { color: theme.secondaryText }, learnMoreUrl)
    ),

    // Exit prompt or spinner
    I2.createElement(g, { marginTop: 2 },
      exitKeyState.pending
        ? I2.createElement(_, { dimColor: true }, "Press ", exitKeyState.keyName, " again to exit")
        : I2.createElement(renderPressEnterPrompt, null)
    )
  );
}

module.exports = CommandLineWelcomeScreen;