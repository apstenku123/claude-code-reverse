/**
 * useToolPermissionHandler is a React hook factory that returns a callback for handling tool permission logic.
 * It evaluates tool permissions, manages user prompts, handles aborts, and records decisions for analytics/logging.
 *
 * @param {function} updatePromptEntries - Function to update the UI prompt entries (e.g., setState for prompts)
 * @returns {function} - a memoized async callback to handle tool permission logic
 */
function useToolPermissionHandler(updatePromptEntries) {
  return US2.useCallback(
    /**
     * Handles tool permission evaluation and user interaction.
     *
     * @param {object} toolConfig - The tool configuration object (must have .name, .description, .inputsEquivalent)
     * @param {any} toolInput - The input provided to the tool
     * @param {object} toolContext - Context for tool execution (must have .abortController, .options, .getToolPermissionContext)
     * @param {object} assistantMessageContext - Context for the assistant message (must have .message.id)
     * @returns {Promise<object>} - Resolves with the permission result and any updated input
     */
    async (toolConfig, toolInput, toolContext, assistantMessageContext) => {
      return new Promise(resolve => {
        /**
         * Handles cancellation: logs the event.
         */
        function handleCancel() {
          logTelemetryEventIfEnabled("tengu_tool_use_cancelled", {
            messageID: assistantMessageContext.message.id,
            toolName: toolConfig.name
          });
        }

        /**
         * Resolves with an 'ask' behavior and aborts the tool operation.
         */
        function resolveWithAsk() {
          resolve({
            behavior: "ask",
            message: ce // 'ce' is assumed to be defined in the outer scope
          });
          toolContext.abortController.abort();
        }

        // If already aborted, log and resolve immediately
        if (toolContext.abortController.signal.aborted) {
          handleCancel();
          resolveWithAsk();
          return;
        }

        // Evaluate tool permission
        return evaluateToolPermission(toolConfig, toolInput, toolContext, assistantMessageContext)
          .then(async permissionResult => {
            if (permissionResult.behavior === "allow") {
              // Log granted in config
              logTelemetryEventIfEnabled("tengu_tool_use_granted_in_config", {
                messageID: assistantMessageContext.message.id,
                toolName: toolConfig.name
              });
              // Record analytics if enabled
              if (HA1(toolConfig.name)) {
                Fy()?.add(1, {
                  decision: "accept",
                  source: "config",
                  tool_name: toolConfig.name
                });
              }
              zA1(toolConfig.name, "accept", "config");
              resolve({
                ...permissionResult,
                updatedInput: toolInput,
                userModified: false
              });
              return;
            }

            // Get tool description for prompt
            const toolDescription = await toolConfig.description(toolInput, {
              isNonInteractiveSession: toolContext.options.isNonInteractiveSession,
              getToolPermissionContext: toolContext.getToolPermissionContext,
              tools: toolContext.options.tools
            });

            // If aborted after description, handle cancel
            if (toolContext.abortController.signal.aborted) {
              handleCancel();
              resolveWithAsk();
              return;
            }

            switch (permissionResult.behavior) {
              case "deny": {
                // Log denied in config
                logTelemetryEventIfEnabled("tengu_tool_use_denied_in_config", {
                  messageID: assistantMessageContext.message.id,
                  toolName: toolConfig.name
                });
                // Record analytics if enabled
                if (HA1(toolConfig.name)) {
                  Fy()?.add(1, {
                    decision: "reject",
                    source: "config",
                    tool_name: toolConfig.name
                  });
                }
                zA1(toolConfig.name, "reject", "config");
                resolve(permissionResult);
                return;
              }
              case "ask": {
                // Add a prompt entry for user interaction
                updatePromptEntries(prevEntries => [
                  ...prevEntries,
                  {
                    assistantMessage: assistantMessageContext,
                    tool: toolConfig,
                    description: toolDescription,
                    input: toolInput,
                    toolUseContext: toolContext,
                    permissionResult,
                    /**
                     * Called when user aborts the prompt
                     */
                    onAbort() {
                      handleCancel();
                      logTelemetryEventIfEnabled("tengu_tool_use_rejected_in_prompt", {
                        messageID: assistantMessageContext.message.id,
                        toolName: toolConfig.name
                      });
                      if (HA1(toolConfig.name)) {
                        Fy()?.add(1, {
                          decision: "reject",
                          source: "user_abort",
                          tool_name: toolConfig.name
                        });
                      }
                      zA1(toolConfig.name, "reject", "user_abort");
                      resolveWithAsk();
                    },
                    /**
                     * Called when user allows the tool use
                     * @param {string} allowType - 'permanent' or 'temporary'
                     * @param {any} updatedInput - The (possibly) user-modified input
                     */
                    onAllow(allowType, updatedInput) {
                      if (allowType === "permanent") {
                        logTelemetryEventIfEnabled("tengu_tool_use_granted_in_prompt_permanent", {
                          messageID: assistantMessageContext.message.id,
                          toolName: toolConfig.name
                        });
                      } else {
                        logTelemetryEventIfEnabled("tengu_tool_use_granted_in_prompt_temporary", {
                          messageID: assistantMessageContext.message.id,
                          toolName: toolConfig.name
                        });
                      }
                      if (HA1(toolConfig.name)) {
                        Fy()?.add(1, {
                          decision: "accept",
                          source: allowType === "permanent" ? "user_permanent" : "user_temporary",
                          tool_name: toolConfig.name
                        });
                      }
                      const decisionSource = allowType === "permanent" ? "user_permanent" : "user_temporary";
                      zA1(toolConfig.name, "accept", decisionSource);
                      // Determine if user modified the input
                      const userModified = toolConfig.inputsEquivalent
                        ? !toolConfig.inputsEquivalent(toolInput, updatedInput)
                        : false;
                      resolve({
                        behavior: "allow",
                        updatedInput,
                        userModified
                      });
                    },
                    /**
                     * Called when user rejects the tool use
                     */
                    onReject() {
                      logTelemetryEventIfEnabled("tengu_tool_use_rejected_in_prompt", {
                        messageID: assistantMessageContext.message.id,
                        toolName: toolConfig.name
                      });
                      if (HA1(toolConfig.name)) {
                        Fy()?.add(1, {
                          decision: "reject",
                          source: "user_reject",
                          tool_name: toolConfig.name
                        });
                      }
                      zA1(toolConfig.name, "reject", "user_reject");
                      resolveWithAsk();
                    }
                  }
                ]);
                return;
              }
            }
          })
          .catch(error => {
            // If error is an abort, handle cancel; otherwise, log error
            if (error instanceof KG) {
              handleCancel();
              resolveWithAsk();
            } else {
              reportErrorIfAllowed(error);
            }
          });
      });
    },
    [updatePromptEntries]
  );
}

module.exports = useToolPermissionHandler;