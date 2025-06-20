/**
 * Renders the Claude Code CLI welcome/help screen with animated usage tips and command list.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.commands - Array of available command objects (with name, description, isHidden).
 * @param {Function} props.onClose - Callback to invoke when the user requests to close the welcome screen.
 * @returns {React.Element} The rendered welcome/help screen React element.
 */
function WelcomeScreen({
  commands,
  onClose
}) {
  // Get the current theme'createInteractionAccessor color palette
  const theme = getThemeStylesheet();

  // Static metadata for display
  const METADATA = {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
    VERSION: "1.0.19"
  };

  const learnMoreUrl = `Learn more at: ${METADATA.README_URL}`;

  // Filter and sort visible commands alphabetically
  const visibleCommands = commands
    .filter(command => !command.isHidden)
    .sort((a, b) => a.name.localeCompare(b.name));

  // State for the current animation step (0-3)
  const [animationStep, setAnimationStep] = I2.useState(0);

  // Animate the welcome screen by incrementally revealing sections
  I2.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (animationStep < 3) setAnimationStep(animationStep + 1);
    }, 250);
    return () => clearTimeout(timeoutId);
  }, [animationStep]);

  // Listen for keyboard events (return or escape) to close the welcome screen
  D0((_, keyEvent) => {
    if (keyEvent.return || keyEvent.escape) onClose();
  });

  // Get exit key info and pending state
  const exitKeyInfo = useCtrlKeyActionHandler(onClose);

  return I2.createElement(g, {
    flexDirection: "column",
    padding: 1
  },
    // Header: App name and version
    I2.createElement(_, {
      bold: true,
      color: theme.claude
    }, `${m0} defineOrAssignProperty{METADATA.VERSION}`),

    // Safety warning
    I2.createElement(g, {
      marginTop: 1,
      flexDirection: "column"
    },
      I2.createElement(_, null, "Always review Claude'createInteractionAccessor responses, especially when running code. Claude has read access to files in the current directory and can run commands and edit files with your permission.")
    ),

    // Usage modes (step 1)
    animationStep >= 1 && I2.createElement(g, {
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

    // Common tasks (step 2)
    animationStep >= 2 && I2.createElement(g, {
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

    // Interactive mode commands (step 3)
    animationStep >= 3 && I2.createElement(g, {
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
      exitKeyInfo.pending
        ? I2.createElement(_, { dimColor: true }, "Press ", exitKeyInfo.keyName, " again to exit")
        : I2.createElement(renderPressEnterPrompt, null)
    )
  );
}

module.exports = WelcomeScreen;