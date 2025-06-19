# Claude Code Architecture

**Copyright (c) 2025 davidgornshtein@gmail.com**  
**Licensed for non-commercial use only. For commercial use, please contact davidgornshtein@gmail.com**

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Claude Code CLI                          │
├─────────────────────────────────────────────────────────────────┤
│                      Command Line Interface                      │
│                        (Commander.js)                            │
├─────────────────────────┬───────────────────┬──────────────────┤
│   Session Management    │   Tool System     │   MCP Integration │
├─────────────────────────┼───────────────────┼──────────────────┤
│   AI Model Router       │  Permission System │  Config Manager  │
├─────────────────────────┴───────────────────┴──────────────────┤
│                    Core Module System                            │
│              (Custom Module Loader + 12,240 Modules)            │
└─────────────────────────────────────────────────────────────────┘
```

## Module Categories

### 1. Application Core (`app/`)
- **initializeClaudeCli.js**: Main CLI initialization and command setup
- **main.js**: Entry point and error handling
- Tool loaders and syntax highlighting modules

### 2. Accessor Layer (`accessor/`)
- Configuration management
- Server interactions
- Permission handling
- GitHub App integration

### 3. Factory Pattern Modules (`factory/`)
- Language syntax highlighters
- Configuration builders
- Object factories for various components

### 4. Utilities (`unknown/`)
- String manipulation
- File operations
- Data transformations
- Validation functions

## Key Design Patterns

### 1. Module Loader Pattern

```javascript
// Custom module system for CommonJS compatibility
const modules = {};
const moduleExports = {};

function define(id, factory) {
  modules[id] = factory;
}

function requireModule(id) {
  if (moduleExports[id]) {
    return moduleExports[id];
  }
  
  if (!modules[id]) {
    // Fallback to Node.js require
    return require(id);
  }
  
  const module = { exports: {} };
  modules[id](module, module.exports, requireModule);
  moduleExports[id] = module.exports;
  
  return module.exports;
}
```

### 2. AI Model Orchestration

```
User Request
     │
     ▼
┌─────────────┐
│Model Router │──┬─→ Cost Analysis
└─────────────┘  │
                 ├─→ Capability Check
                 │
                 └─→ Load Balance
                      │
     ┌───────────────┼───────────────┐
     ▼               ▼               ▼
┌─────────┐    ┌─────────┐    ┌─────────┐
│ GPT-4.1 │    │ O4-Mini │    │ Gemini  │
└─────────┘    └─────────┘    └─────────┘
     │               │               │
     └───────────────┴───────────────┘
                     │
                     ▼
              Response Handler
```

### 3. Tool System Architecture

```
┌─────────────────────────┐
│      Tool Registry      │
├─────────────────────────┤
│   - Tool Discovery      │
│   - Permission Check    │
│   - Execution Context   │
└───────────┬─────────────┘
            │
    ┌───────┴───────┐
    ▼               ▼
Built-in Tools   MCP Tools
    │               │
    ├─ Bash         ├─ Custom
    ├─ Edit         ├─ Server
    ├─ Read         └─ Tools
    └─ Write
```

### 4. Session Management

```javascript
// Session state flow
Session {
  id: UUID,
  messages: Message[],
  tools: Tool[],
  permissions: Permission[],
  state: {
    model: string,
    context: object,
    history: Entry[]
  }
}
```

## Data Flow

### 1. Command Processing

```
User Input → Parser → Validator → Router → Handler → Response
                         │
                         └─→ Permission Check
```

### 2. Tool Execution

```
Tool Request → Permission → Validation → Execution → Result
      │            │            │            │          │
      └────────────┴────────────┴────────────┴──────────┘
                          Audit Trail
```

### 3. AI Model Integration

```
Prompt → Preprocessor → Model Selection → API Call → Postprocessor → Response
             │               │                │           │
             └───────────────┴────────────────┴───────────┘
                         Telemetry & Monitoring
```

## Security Architecture

### 1. Permission Layers

```
┌─────────────────────────┐
│    User Permissions     │
├─────────────────────────┤
│    Tool Permissions     │
├─────────────────────────┤
│  Directory Permissions  │
├─────────────────────────┤
│   System Permissions    │
└─────────────────────────┘
```

### 2. Credential Management

- Environment variables for API keys
- No hardcoded credentials
- Redaction utilities for logging
- Secure session storage

### 3. Access Control

```javascript
// Permission check flow
function checkPermission(tool, action, resource) {
  return checkUserPermission(user, tool) &&
         checkToolPermission(tool, action) &&
         checkResourcePermission(resource, action);
}
```

## Module Communication

### 1. Event System

```javascript
// Event-driven architecture
EventEmitter {
  'session:start': Session,
  'tool:execute': ToolExecution,
  'model:response': ModelResponse,
  'error:*': Error
}
```

### 2. Inter-module Dependencies

```
Core Modules
     │
     ├─→ Utility Modules
     │
     ├─→ Factory Modules
     │
     └─→ Accessor Modules
```

## Performance Optimizations

### 1. Lazy Loading

- Modules loaded on-demand
- Reduced initial startup time
- Memory efficiency

### 2. Caching Strategy

```javascript
// Multi-level cache
Cache {
  L1: Memory (hot data),
  L2: Disk (session data),
  L3: Remote (shared data)
}
```

### 3. Parallel Processing

- Concurrent tool execution
- Batch API requests
- Worker thread utilization

## Extension Points

### 1. Custom Tools

```javascript
// Tool interface
interface Tool {
  name: string;
  description: string;
  parameters: Schema;
  execute(params: any): Promise<Result>;
  validate?(params: any): boolean;
}
```

### 2. Model Providers

```javascript
// Provider interface
interface AIProvider {
  name: string;
  complete(prompt: string, options?: any): Promise<Response>;
  stream?(prompt: string, options?: any): AsyncIterator<Token>;
}
```

### 3. MCP Servers

- Standard MCP protocol
- Custom server integration
- Resource management

## Build System

### 1. Module Collection

```
Source Files → Scanner → Wrapper → Bundler → Output
                 │          │         │
                 └──────────┴─────────┘
                      Transformation
```

### 2. Dependency Resolution

- Custom require system
- npm module compatibility
- Circular dependency handling

## Deployment Architecture

### 1. Distribution

```
Built CLI (.cjs)
     │
     ├─→ Standalone executable
     │
     ├─→ npm package
     │
     └─→ Docker image
```

### 2. Configuration

- Environment-based config
- User preferences
- Project-specific settings

---

**Updated by davidgornshtein@gmail.com**