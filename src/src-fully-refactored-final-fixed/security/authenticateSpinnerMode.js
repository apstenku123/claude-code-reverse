/**
 * Renders the spinner mode UI for authentication, including connection status, elapsed time, token count, and interruption instructions.
 *
 * @param {Object} props - The component props.
 * @param {string} props.mode - The current spinner mode (e.g., 'authenticating', 'loading').
 * @param {string[]} props.haikuWords - Array of words to display as haiku or spinner message.
 * @param {number} props.currentResponseLength - The current response length (used for token calculation).
 * @param {string} [props.overrideMessage] - Optional message to override the spinner message.
 * @returns {React.ReactElement} The spinner mode UI component.
 */
function authenticateSpinnerMode({
  mode,
  haikuWords,
  currentResponseLength,
  overrideMessage
}) {
  // Spinner animation frame index
  const [spinnerFrameIndex, setSpinnerFrameIndex] = AJ.useState(0);
  // Elapsed time in seconds
  const [elapsedTime, setElapsedTime] = AJ.useState(0);
  // Number of tokens processed
  const [tokenCount, setTokenCount] = AJ.useState(0);

  // Get connection status
  const { isConnected } = useConnectionStatus();

  // Compute the spinner message (haiku or default) with throttling
  const spinnerMessage = useDebouncedObservableValue(
    () => iT(haikuWords.length > 0 ? haikuWords : SH5),
    [haikuWords.length],
    1000
  );

  // Use override message if provided, otherwise use spinner message
  const displayMessage = overrideMessage || spinnerMessage;

  // Ref to store the start time
  const startTimeRef = AJ.useRef(Date.now());
  // Ref to store the latest response length
  const responseLengthRef = AJ.useRef(currentResponseLength);

  // Update response length ref when currentResponseLength changes
  AJ.useEffect(() => {
    responseLengthRef.current = currentResponseLength;
  }, [currentResponseLength]);

  // Advance spinner frame or set to offline if disconnected
  YC(() => {
    if (!isConnected) {
      setSpinnerFrameIndex(4); // Show a specific frame for offline
      return;
    }
    setSpinnerFrameIndex(prev => prev + 1);
  }, 120);

  // Animate token count incrementally to match the current response length
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

  // Update elapsed time every 10ms
  YC(() => {
    setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
  }, 10);

  // Build the info elements: elapsed time, token count, and interruption instructions
  const infoElements = [
    J9.createElement(_, {
      color: getThemeStylesheet().secondaryText,
      key: "elapsedTime"
    }, elapsedTime, "createInteractionAccessor"),
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

  // If offline, show offline indicator
  if (isConnected === false) {
    infoElements.push(
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

  // Determine spinner color based on connection status
  const spinnerColor = isConnected === false ? getThemeStylesheet().secondaryText : getThemeStylesheet().claude;

  // Render the spinner mode UI
  return J9.createElement(g, {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 1,
    width: "100%"
  },
    // Spinner animation
    J9.createElement(g, {
      flexWrap: "wrap",
      height: 1,
      width: 2,
      key: "spinner"
    },
      J9.createElement(_, {
        color: spinnerColor
      }, Jz1[spinnerFrameIndex % Jz1.length])
    ),
    // Spinner message
    J9.createElement(_, {
      color: spinnerColor,
      key: "message"
    }, displayMessage, "…", " "),
    // Info elements with separators
    J9.createElement(_, {
      color: getThemeStylesheet().secondaryText
    }, "("),
    FW(infoElements, (element, index) =>
      J9.createElement(_, {
        color: getThemeStylesheet().secondaryText,
        key: `separator-${index}`
      }, " ", "·", " ")
    ),
    J9.createElement(_, {
      color: getThemeStylesheet().secondaryText
    }, ")")
  );
}

module.exports = authenticateSpinnerMode;