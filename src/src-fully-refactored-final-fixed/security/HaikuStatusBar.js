/**
 * HaikuStatusBar displays the current status of haiku generation, including elapsed time, token count, and connection status.
 *
 * @param {Object} props - Component props
 * @param {string} props.mode - The current mode of the haiku generator (e.g., 'edit', 'view')
 * @param {string[]} props.haikuWords - Array of words currently being used/generated for the haiku
 * @param {number} props.currentResponseLength - The current length of the response (number of tokens generated)
 * @param {string} [props.overrideMessage] - Optional message to override the default status message
 * @returns {React.ReactElement} The rendered status bar component
 */
function HaikuStatusBar({
  mode,
  haikuWords,
  currentResponseLength,
  overrideMessage
}) {
  // Spinner animation state
  const [spinnerIndex, setSpinnerIndex] = AJ.useState(0);
  // Elapsed time in seconds
  const [elapsedSeconds, setElapsedSeconds] = AJ.useState(0);
  // Number of tokens generated so far
  const [tokenCount, setTokenCount] = AJ.useState(0);

  // Connection status
  const { isConnected } = useConnectionStatus();

  // Debounced haiku message (fallbacks to default if haikuWords is empty)
  const debouncedHaikuMessage = useDebouncedObservableValue(
    () => iT(haikuWords.length > 0 ? haikuWords : SH5),
    [haikuWords.length],
    1000
  );

  // The message to display (override if provided)
  const statusMessage = overrideMessage || debouncedHaikuMessage;

  // Ref to track the start time for elapsed seconds
  const startTimeRef = AJ.useRef(Date.now());
  // Ref to track the latest response length
  const responseLengthRef = AJ.useRef(currentResponseLength);

  // Keep responseLengthRef up to date with currentResponseLength
  AJ.useEffect(() => {
    responseLengthRef.current = currentResponseLength;
  }, [currentResponseLength]);

  // Spinner animation effect (updates spinnerIndex every 120ms)
  YC(() => {
    if (!isConnected) {
      setSpinnerIndex(4); // Show 'offline' spinner state
      return;
    }
    setSpinnerIndex(prev => prev + 1);
  }, 120);

  // Token count update effect (updates tokenCount every 10ms)
  YC(() => {
    setTokenCount(prevTokenCount => {
      const tokensRemaining = responseLengthRef.current - prevTokenCount;
      if (tokensRemaining <= 0) return prevTokenCount;
      let increment;
      if (tokensRemaining < 70) {
        increment = 1;
      } else if (tokensRemaining < 200) {
        increment = Math.max(2, Math.ceil(tokensRemaining * 0.08));
      } else {
        increment = 18;
      }
      return Math.min(prevTokenCount + increment, responseLengthRef.current);
    });
  }, 10);

  // Elapsed seconds update effect (updates elapsedSeconds every 10ms)
  YC(() => {
    setElapsedSeconds(Math.floor((Date.now() - startTimeRef.current) / 1000));
  }, 10);

  // Build the status elements (elapsed time, token count, and instructions)
  const statusElements = [
    J9.createElement(_, {
      color: getThemeStylesheet().secondaryText,
      key: "elapsedTime"
    }, elapsedSeconds, "createInteractionAccessor"),
    J9.createElement(g, {
      flexDirection: "row",
      key: "tokens"
    },
      J9.createElement(renderInteractionModeIcon, {
        mode: mode,
        key: "spinnerMode"
      }),
      J9.createElement(_, {
        color: getThemeStylesheet().secondaryText
      }, formatNumberCompact(Math.round(tokenCount / 4)), " tokens")
    ),
    J9.createElement(g, {
      key: "esc"
    },
      J9.createElement(_, {
        color: getThemeStylesheet().secondaryText,
        bold: true
      }, "esc", " "),
      J9.createElement(_, {
        color: getThemeStylesheet().secondaryText
      }, "to interrupt")
    )
  ];

  // If offline, show offline status
  if (isConnected === false) {
    statusElements.push(
      J9.createElement(g, {
        key: "offline"
      },
        J9.createElement(_, {
          color: getThemeStylesheet().error,
          bold: true
        }, "offline")
      )
    );
  }

  // Choose color based on connection status
  const spinnerColor = isConnected === false ? getThemeStylesheet().secondaryText : getThemeStylesheet().claude;

  // Render the status bar
  return J9.createElement(g, {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 1,
    width: "100%"
  },
    // Spinner
    J9.createElement(g, {
      flexWrap: "wrap",
      height: 1,
      width: 2,
      key: "spinner"
    },
      J9.createElement(_, {
        color: spinnerColor
      }, Jz1[spinnerIndex % Jz1.length])
    ),
    // Status message
    J9.createElement(_, {
      color: spinnerColor,
      key: "message"
    }, statusMessage, "…", " "),
    // Open parenthesis
    J9.createElement(_, {
      color: getThemeStylesheet().secondaryText
    }, "("),
    // Status elements separated by ·
    FW(statusElements, (element, idx) =>
      J9.createElement(_, {
        color: getThemeStylesheet().secondaryText,
        key: `separator-${idx}`
      }, " ", "·", " ")
    ),
    // Close parenthesis
    J9.createElement(_, {
      color: getThemeStylesheet().secondaryText
    }, ")")
  );
}

module.exports = HaikuStatusBar;