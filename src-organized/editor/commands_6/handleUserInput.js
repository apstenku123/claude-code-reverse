/**
 * Handles user input for various modes (bash, memory selection, slash commands, or general prompt).
 * Processes the input, manages UI updates, and returns appropriate messages and query flags.
 *
 * @param {string} userInput - The user'createInteractionAccessor input string.
 * @param {string} inputMode - The mode of input (e.g., 'bash', 'memorySelect', etc.).
 * @param {function} updateUI - Callback to update the UI (e.g., with JSX elements).
 * @param {object} session - Session or context object containing options and state.
 * @param {object} attachedMedia - Optional media objects attached to the input (e.g., images).
 * @param {object} userSettings - User settings or configuration.
 * @param {object} memoryStore - Memory store or context for memory selection.
 * @returns {Promise<{messages: Array, shouldQuery: boolean}>} - Processed messages and query flag.
 */
async function handleUserInput(
  userInput,
  inputMode,
  updateUI,
  session,
  attachedMedia,
  userSettings,
  memoryStore
) {
  // Retrieve previous messages or context for the current session
  const previousMessages = await collectAsyncIterableItems(qK1(userInput, session, userSettings, []));

  // Handle Bash command input
  if (inputMode === "bash") {
    logTelemetryEventIfEnabled("tengu_input_bash", {});
    const bashInputMessage = createUserMessageObject({ content: `<bash-input>${userInput}</bash-input>` });

    // Handle 'cd' (change directory) command
    if (userInput.startsWith("cd ")) {
      const currentDirectory = iA();
      const targetDirectory = Mw5(currentDirectory, userInput.slice(3));
      try {
        setShellCurrentWorkingDirectory(targetDirectory);
        return {
          messages: [
            HC,
            bashInputMessage,
            ...previousMessages,
            createUserMessageObject({
              content: `<bash-stdout>Changed directory to ${FA.bold(`${targetDirectory}/`)}</bash-stdout>`
            })
          ],
          shouldQuery: false
        };
      } catch (error) {
        reportErrorIfAllowed(error);
        return {
          messages: [
            HC,
            bashInputMessage,
            ...previousMessages,
            createUserMessageObject({
              content: `<bash-stderr>cwd error: ${error instanceof Error ? error.message : String(error)}</bash-stderr>`
            })
          ],
          shouldQuery: false
        };
      }
    }

    // Show bash input UI feedback
    updateUI({
      jsx: Vk.createElement(
        g,
        { flexDirection: "column", marginTop: 1 },
        Vk.createElement(renderBashInputWithMargin, {
          addMargin: false,
          param: {
            text: `<bash-input>${userInput}</bash-input>`,
            type: "text"
          }
        }),
        Vk.createElement(HaikuStatusBar, {
          mode: "tool-use",
          haikuWords: ["Bashing"],
          currentResponseLength: 0
        })
      ),
      shouldHidePromptInput: false
    });

    try {
      // Validate the bash command
      const validationResult = await P4.validateInput({ command: userInput });
      if (!validationResult.result) {
        return {
          messages: [
            HC,
            bashInputMessage,
            ...previousMessages,
            createUserMessageObject({ content: validationResult.message })
          ],
          shouldQuery: false
        };
      }
      // Execute the bash command
      const { data: executionResult } = await getLastItemFromAsyncIterable(P4.call({ command: userInput }, session));
      return {
        messages: [
          HC,
          bashInputMessage,
          ...previousMessages,
          createUserMessageObject({
            content: `<bash-stdout>${executionResult.stdout}</bash-stdout><bash-stderr>${executionResult.stderr}</bash-stderr>`
          })
        ],
        shouldQuery: false
      };
    } catch (error) {
      // Handle interruption or command error
      if (error instanceof $M) {
        if (error.interrupted) {
          return {
            messages: [HC, bashInputMessage, createUserMessageObject({ content: $createDebouncedFunction }), ...previousMessages],
            shouldQuery: false
          };
        }
        return {
          messages: [
            HC,
            bashInputMessage,
            ...previousMessages,
            createUserMessageObject({
              content: `<bash-stdout>${error.stdout}</bash-stdout><bash-stderr>${error.stderr}</bash-stderr>`
            })
          ],
          shouldQuery: false
        };
      }
      return {
        messages: [
          HC,
          bashInputMessage,
          ...previousMessages,
          createUserMessageObject({
            content: `<bash-stderr>Command failed: ${error instanceof Error ? error.message : String(error)}</bash-stderr>`
          })
        ],
        shouldQuery: false
      };
    } finally {
      // Hide the bash input UI after a short delay
      setTimeout(() => {
        updateUI(null);
      }, 200);
    }
  }

  // Handle memory selection input
  if (inputMode === "memorySelect") {
    logTelemetryEventIfEnabled("tengu_input_memory", {});
    const memoryInputMessage = createUserMessageObject({ content: `<user-memory-input>${userInput}</user-memory-input>` });
    VE2(userInput, session, memoryStore);
    return {
      messages: [HC, memoryInputMessage, ...previousMessages, createUserMessageObject({ content: eY })],
      shouldQuery: false
    };
  }

  // Handle slash commands (e.g., /command)
  if (userInput.startsWith("/")) {
    const commandParts = userInput.slice(1).split(" ");
    let commandName = commandParts[0];
    let isMcpCommand = false;
    // Detect (MCP) modifier
    if (commandParts.length > 1 && commandParts[1] === "(MCP)") {
      commandName = commandName + " (MCP)";
      isMcpCommand = true;
    }
    if (!commandName) {
      logTelemetryEventIfEnabled("tengu_input_slash_missing", {});
      return {
        messages: [HC, ...previousMessages, createUserMessageObject({ content: "Commands are in the form `/command [args]`" })],
        shouldQuery: false
      };
    }
    const isCustomCommand = commandName.includes(":");
    const commandType = isMcpCommand ? "mcp" : isCustomCommand ? "custom" : commandName;

    // If command is not recognized, treat as prompt
    if (!gP2(commandName, session.options.commands)) {
      logTelemetryEventIfEnabled("tengu_input_prompt", {});
      SK("user_prompt", {
        prompt_length: String(userInput.length),
        prompt: getProcessedInteractionEntriesOrRedacted(userInput)
      });
      return {
        messages: [createUserMessageObject({ content: userInput }), ...previousMessages],
        shouldQuery: true
      };
    }

    // Extract command arguments
    const commandArgs = userInput.slice(commandName.length + 2);
    const { messages: commandMessages, shouldQuery: commandShouldQuery } = await Lw5(commandName, commandArgs, updateUI, session);

    // Handle empty or invalid command responses
    if (commandMessages.length === 0) {
      logTelemetryEventIfEnabled("tengu_input_command", { input: commandType });
      return { messages: [], shouldQuery: false };
    }
    if (
      commandMessages.length === 2 &&
      typeof commandMessages[1].message.content === "string" &&
      commandMessages[1].message.content.startsWith("Unknown command:")
    ) {
      logTelemetryEventIfEnabled("tengu_input_slash_invalid", { input: commandName });
      return {
        messages: [HC, ...commandMessages],
        shouldQuery: commandShouldQuery
      };
    }
    logTelemetryEventIfEnabled("tengu_input_command", { input: commandType });
    return {
      messages: commandShouldQuery ? commandMessages : [HC, ...commandMessages],
      shouldQuery: commandShouldQuery
    };
  }

  // Handle general prompt input (default case)
  logTelemetryEventIfEnabled("tengu_input_prompt", {});
  SK("user_prompt", {
    prompt_length: String(userInput.length),
    prompt: getProcessedInteractionEntriesOrRedacted(userInput)
  });

  // If images are attached, include them in the message
  const imageAttachments = attachedMedia
    ? Object.values(attachedMedia).filter(media => media.type === "image")
    : [];
  if (imageAttachments.length > 0) {
    const formattedImages = imageAttachments.map(image => ({
      type: "image",
      source: {
        type: "base64",
        media_type: image.mediaType || "image/png",
        data: image.content
      }
    }));
    return {
      messages: [
        createUserMessageObject({
          content: [
            ...formattedImages,
            { type: "text", text: userInput }
          ]
        }),
        ...previousMessages
      ],
      shouldQuery: true
    };
  }

  // Default: return the user input as a message
  return {
    messages: [createUserMessageObject({ content: userInput }), ...previousMessages],
    shouldQuery: true
  };
}

module.exports = handleUserInput;