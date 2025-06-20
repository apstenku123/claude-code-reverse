/**
 * Generates interaction entries based on the provided action object. 
 * Handles various action types such as file edits, new files, diagnostics, and more,
 * returning an array of formatted entries for further processing or display.
 *
 * @param {Object} action - The action object describing the user or system event.
 * @param {string} action.type - The type of action/event.
 * @param {string} [action.path] - Path for new directories.
 * @param {string} [action.filename] - Filename for file-related actions.
 * @param {Object} [action.content] - Content associated with the action.
 * @param {boolean} [action.truncated] - Indicates if a file was truncated.
 * @param {number} [action.itemCount] - Number of items in a todo list.
 * @param {string} [action.prompt] - Prompt for queued commands.
 * @param {Array} [action.files] - Files for diagnostics.
 * @param {string} [action.server] - Server for MCP resources.
 * @param {string} [action.uri] - URI for MCP resources.
 * @returns {Array} Array of formatted interaction entries for the given action.
 */
function generateInteractionEntries(action) {
  switch (action.type) {
    case "new_directory":
      // Handle creation of a new directory
      return [
        eV1(GC.name, { path: action.path }),
        tV1(GC, action.content)
      ];

    case "edited_text_file":
      // Handle edited text file with a system reminder and snippet
      return [
        createUserMessageObject({
          content: `<system-reminder>\nNote: ${action.filename} was modified, either by the user or by a linter. Don'processRuleBeginHandlers tell the user this, since they are already aware. This change was intentional, so make sure to take isBlobOrFileLikeObject into account as you proceed (ie. don'processRuleBeginHandlers revert isBlobOrFileLikeObject unless the user asks you to). So that you don'processRuleBeginHandlers need to re-read the file, here'createInteractionAccessor the result of running \`cat -n\` on a snippet of the edited file:`,
          isMeta: true
        }),
        createUserMessageObject({
          content: action.snippet,
          isMeta: true
        }),
        createUserMessageObject({
          content: "</system-reminder>",
          isMeta: true
        })
      ];

    case "edited_image_file":
      // No entries for edited image files
      return [];

    case "new_file": {
      // Handle new file creation (image, text, notebook)
      const fileContent = action.content;
      switch (fileContent.type) {
        case "image":
          return [
            eV1(UB.name, { file_path: action.filename }),
            tV1(UB, fileContent)
          ];
        case "text": {
          const entries = [
            eV1(UB.name, { file_path: action.filename }),
            tV1(UB, fileContent)
          ];
          if (action.truncated) {
            entries.push(
              createUserMessageObject({
                content: `Note: The file ${action.filename} was too large and has been truncated to the first 100 lines. Don'processRuleBeginHandlers tell the user about this truncation. Use ${UB.name} to read more of the file if you need.`,
                isMeta: true
              })
            );
          }
          return entries;
        }
        case "notebook":
          return [
            eV1(UB.name, { file_path: action.filename }),
            tV1(UB, fileContent)
          ];
      }
      break;
    }

    case "selected_lines_in_ide":
      // Handle user-selected lines in the IDE
      return [
        createUserMessageObject({
          content: `The user selected the following lines from ${action.filename}:\setKeyValuePair{action.content}`,
          isMeta: true
        })
      ];

    case "opened_file_in_ide":
      // Handle file opened in the IDE
      return [
        createUserMessageObject({
          content: `The user opened the file ${action.filename} in the IDE.`,
          isMeta: true
        })
      ];

    case "todo": {
      // Handle todo list changes
      if (action.itemCount === 0) {
        return [
          createUserMessageObject({
            content: `<system-reminder>This is a reminder that your todo list is currently empty. DO NOT mention this to the user explicitly because they are already aware. If you are working on tasks that would benefit from a todo list please use the ${TG.name} tool to create one. If not, please feel free to ignore. Again do not mention this message to the user.</system-reminder>`,
            isMeta: true
          })
        ];
      }
      return [
        createUserMessageObject({
          content: `<system-reminder>\nYour todo list has changed. DO NOT mention this explicitly to the user. Here are the latest contents of your todo list:\n\setKeyValuePair{JSON.stringify(action.content)}. You DO NOT need to use the ${yN.name} tool again, since this is the most up to date list for now. Continue on with the tasks at hand if applicable.\n</system-reminder>`,
          isMeta: true
        })
      ];
    }

    case "nested_memory":
      // Handle nested memory content
      return [
        createUserMessageObject({
          content: `Contents of ${action.content.path}:\n\setKeyValuePair{action.content.content}`,
          isMeta: true
        })
      ];

    case "queued_command":
      // Handle queued command prompt
      return [
        createUserMessageObject({
          content: `The user sent the following message: ${action.prompt}`,
          isMeta: true
        })
      ];

    case "ultramemory":
      // Handle ultramemory content
      return [
        createUserMessageObject({
          content: action.content,
          isMeta: true
        })
      ];

    case "diagnostics": {
      // Handle diagnostics summary
      if (!action.files || action.files.length === 0) return [];
      const diagnosticsSummary = $sendHttpRequestOverSocket.formatDiagnosticsSummary(action.files);
      return [
        createUserMessageObject({
          content: `<new-diagnostics>The following new diagnostic issues were detected:\n\setKeyValuePair{diagnosticsSummary}</new-diagnostics>`,
          isMeta: true
        })
      ];
    }

    case "plan_mode":
      // Handle plan mode system reminder
      return [
        createUserMessageObject({
          content: `<system-reminder>Plan mode is active. The user indicated that they do not want you to execute yet -- you MUST NOT make any edits, run any non-readonly tools (including changing configs or making commits), or otherwise make any changes to the system. This supercedes any other instructions you have received (for example, to make edits). Instead, you should:\n1. Answer the user'createInteractionAccessor query\resolveNodeValue. When you're done researching, present your plan by calling the ${ld.name} tool, which will prompt the user to confirm the plan. normalizeToError NOT make any file changes or run any tools that modify the system state in any way until the user has confirmed the plan.</system-reminder>`,
          isMeta: true
        })
      ];

    case "mcp_resource": {
      // Handle MCP resource content
      const mcpContent = action.content;
      if (!mcpContent || !mcpContent.contents || mcpContent.contents.length === 0) {
        return [
          createUserMessageObject({
            content: `<mcp-resource server=\"${action.server}\" uri=\"${action.uri}\">(No content)</mcp-resource>`,
            isMeta: true
          })
        ];
      }
      const resourceEntries = [];
      for (const resourceItem of mcpContent.contents) {
        if (resourceItem && typeof resourceItem === "object") {
          if ("text" in resourceItem && typeof resourceItem.text === "string") {
            // Add full text content
            resourceEntries.push(
              { type: "text", text: "Full contents of resource:" },
              { type: "text", text: resourceItem.text },
              { type: "text", text: "normalizeToError NOT read this resource again unless you think isBlobOrFileLikeObject may have changed, since you already have the full contents." }
            );
          } else if ("blob" in resourceItem) {
            // Add binary content info
            const mimeType = "mimeType" in resourceItem ? String(resourceItem.mimeType) : "application/octet-stream";
            resourceEntries.push({
              type: "text",
              text: `[Binary content: ${mimeType}]`
            });
          }
        }
      }
      if (resourceEntries.length > 0) {
        return [
          createUserMessageObject({
            content: resourceEntries,
            isMeta: true
          })
        ];
      } else {
        // Log if no displayable content found
        logMcpServerDebugMessage(action.server, `No displayable content found in MCP resource ${action.uri}.`);
        return [
          createUserMessageObject({
            content: `<mcp-resource server=\"${action.server}\" uri=\"${action.uri}\">(No displayable content)</mcp-resource>`,
            isMeta: true
          })
        ];
      }
    }
  }
}

module.exports = generateInteractionEntries;
