#!/usr/bin/env node

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const fs = require('fs').promises;
const path = require('path');
const { HybridBatchAnalyzer } = require('./hybrid-analyzer');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

class CLIRefactorer {
  constructor(config = {}) {
    this.config = {
      inputFile: config.inputFile || path.join(__dirname, '..', 'cli.js'),
      outputDir: config.outputDir || path.join(__dirname, '..', 'src'),
      metadataDir: config.metadataDir || path.join(__dirname, '..', 'metadata'),
      aiConfig: config.aiConfig || {
        geminiApiKey: process.env.GEMINI_API_KEY,
        azureOpenAI: {
          apiKey: process.env.AZURE_OPENAI_KEY,
          endpoint: process.env.AZURE_OPENAI_ENDPOINT
        },
        primaryService: 'azure-gpt4',
        fallbackOrder: ['azure-gpt4', 'azure-o4mini', 'gemini']
      },
      batchSize: config.batchSize || 10,
      useAI: config.useAI !== false,
      dryRun: config.dryRun || false,
      ...config
    };

    this.analyzer = new HybridBatchAnalyzer({
      aiConfig: this.config.aiConfig,
      useAI: this.config.useAI,
      batchSize: this.config.batchSize
    });

    this.functions = [];
    this.results = [];
    this.mappings = {};
    this.stats = {
      totalFunctions: 0,
      processed: 0,
      renamed: 0,
      errors: 0,
      skipped: 0
    };
  }

  async run() {
    try {
      console.log('=== CLI.js Refactoring Tool ===\n');
      console.log('Configuration:', JSON.stringify(this.config, null, 2));
      console.log('\n');

      // Step 1: Extract functions
      console.log('Step 1: Extracting functions from CLI.js...');
      await this.extractFunctions();
      console.log(`Found ${this.functions.length} functions\n`);

      // Step 2: Analyze and rename functions
      console.log('Step 2: Analyzing and renaming functions...');
      if (this.config.useAI) {
        console.log('Using AI services:');
        console.log(`- Primary: ${this.config.aiConfig.primaryService}`);
        console.log(`- Fallback order: ${this.config.aiConfig.fallbackOrder.join(', ')}`);
      }
      await this.analyzeFunctions();
      console.log(`Analyzed ${this.results.length} functions\n`);

      // Step 3: Organize and write files
      if (!this.config.dryRun) {
        console.log('Step 3: Organizing and writing files...');
        await this.organizeAndWriteFiles();
        console.log('Files written successfully\n');

        // Step 4: Generate metadata
        console.log('Step 4: Generating metadata...');
        await this.generateMetadata();
        console.log('Metadata generated\n');

        // Step 5: Create build script
        console.log('Step 5: Creating build script...');
        await this.createBuildScript();
        console.log('Build script created\n');
      } else {
        console.log('DRY RUN: Skipping file writing\n');
      }

      // Step 6: Generate report
      console.log('Step 6: Generating report...');
      await this.generateReport();
      console.log('Report generated\n');

      console.log('=== Refactoring Complete ===');
      this.printSummary();

    } catch (error) {
      console.error('Refactoring failed:', error);
      process.exit(1);
    }
  }

  async extractFunctions() {
    const cliContent = await fs.readFile(this.config.inputFile, 'utf-8');
    
    const ast = parser.parse(cliContent, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript', 'decorators-legacy', 'topLevelAwait'],
      errorRecovery: true
    });

    const self = this;
    
    traverse(ast, {
      FunctionDeclaration(path) {
        self.extractFunction(path, 'FunctionDeclaration');
      },
      FunctionExpression(path) {
        // Only extract named function expressions
        const parent = path.parent;
        if (t.isVariableDeclarator(parent) && parent.id && t.isIdentifier(parent.id)) {
          self.extractFunction(path, 'FunctionExpression', parent.id.name);
        }
      },
      ArrowFunctionExpression(path) {
        // Only extract named arrow functions
        const parent = path.parent;
        if (t.isVariableDeclarator(parent) && parent.id && t.isIdentifier(parent.id)) {
          self.extractFunction(path, 'ArrowFunctionExpression', parent.id.name);
        }
      }
    });

    // Sort functions by line number for consistent processing
    this.functions.sort((a, b) => a.startLine - b.startLine);
  }

  extractFunction(path, type, nameOverride = null) {
    const node = path.node;
    const functionName = nameOverride || (node.id ? node.id.name : null);
    
    if (!functionName) return;

    // Skip already processed functions
    if (functionName.startsWith('renamed_renamed_')) return;

    const code = generate(node).code;
    const loc = node.loc;

    this.functions.push({
      originalName: functionName,
      type,
      code,
      startLine: loc.start.line,
      endLine: loc.end.line,
      path: this.config.inputFile,
      metadata: {
        type,
        async: node.async || false,
        generator: node.generator || false,
        params: node.params.length
      }
    });

    this.stats.totalFunctions++;
  }

  async analyzeFunctions() {
    const analysisResults = await this.analyzer.analyzeBatch(this.functions, {
      onProgress: (current, total, result) => {
        if (current % 10 === 0 || current === total) {
          console.log(`Progress: ${current}/${total} (${Math.round(current/total * 100)}%)`);
        }
      },
      timeout: 30000,
      batchDelay: 1000
    });

    this.results = analysisResults.results;
    
    // Update stats
    this.results.forEach(result => {
      if (result.error) {
        this.stats.errors++;
      } else if (result.suggestedName !== result.originalName) {
        this.stats.renamed++;
      } else {
        this.stats.skipped++;
      }
      this.stats.processed++;
    });
  }

  async organizeAndWriteFiles() {
    // Create directory structure
    await this.createDirectoryStructure();

    // Process each function result
    for (const result of this.results) {
      if (result.error) continue;

      const category = result.category || 'utility';
      const subdir = this.getSubdirectory(category, result.purpose);
      const targetDir = path.join(this.config.outputDir, subdir);
      
      // Ensure directory exists
      await fs.mkdir(targetDir, { recursive: true });

      // Write function file
      const filename = `${result.suggestedName}.js`;
      const filepath = path.join(targetDir, filename);
      
      const fileContent = this.generateFunctionFile(result);
      await fs.writeFile(filepath, fileContent);

      // Write metadata JSON
      const metaFilename = `${result.suggestedName}.json`;
      const metaFilepath = path.join(targetDir, metaFilename);
      
      const metadata = this.generateFunctionMetadata(result);
      await fs.writeFile(metaFilepath, JSON.stringify(metadata, null, 2));

      // Update mappings
      this.mappings[result.originalName] = {
        newName: result.suggestedName,
        path: path.relative(this.config.outputDir, filepath),
        category,
        purpose: result.purpose
      };
    }
  }

  getSubdirectory(category, purpose) {
    const categoryMap = {
      accessor: 'app/accessors',
      validator: 'app/validators',
      handler: 'app/handlers',
      processor: 'app/processors',
      factory: 'app/factories',
      middleware: 'core/middleware',
      network: 'core/network',
      data: 'core/database',
      storage: 'core/storage',
      security: 'core/auth',
      utility: 'app/utils',
      hook: 'app/hooks',
      'error-handling': 'app/errors'
    };

    const baseDir = categoryMap[category] || 'unknown';
    
    // Further organize by purpose if needed
    if (purpose && purpose !== category) {
      const purposeMap = {
        http: 'http',
        database: 'db',
        cache: 'cache',
        auth: 'auth',
        logging: 'logger'
      };
      
      const purposeDir = purposeMap[purpose];
      if (purposeDir && !baseDir.includes(purposeDir)) {
        return `${baseDir}/${purposeDir}`;
      }
    }

    return baseDir;
  }

  generateFunctionFile(result) {
    const { code, suggestedName, originalName, purpose, features } = result;
    
    // Handle missing code
    if (!code) {
      console.warn(`Missing code for function ${originalName || 'unknown'}`);
      return `// Error: No code available for function ${originalName || 'unknown'}\n`;
    }
    
    // Generate JSDoc
    const jsdoc = this.generateJSDoc(result);
    
    // Update function name in code
    const updatedCode = this.updateFunctionName(code, originalName, suggestedName);
    
    // Generate module exports
    const exports = `\nmodule.exports = { ${suggestedName} };\n`;
    
    return `${jsdoc}\n${updatedCode}\n${exports}`;
  }

  generateJSDoc(result) {
    const { suggestedName, originalName, purpose, features, startLine, endLine } = result;
    
    let jsdoc = `/**
 * @function ${suggestedName}
 * @description ${this.generateDescription(result)}
 * @originalName ${originalName}
 * @extractedFrom cli.js lines ${startLine}-${endLine}`;

    // Add parameters
    if (features.parameters && features.parameters.length > 0) {
      features.parameters.forEach(param => {
        jsdoc += `\n * @param {*} ${param}`;
      });
    }

    // Add return type
    if (features.returnType) {
      jsdoc += `\n * @returns {${features.returnType}}`;
    }

    // Add async indicator
    if (features.isAsync) {
      jsdoc += `\n * @async`;
    }

    jsdoc += '\n */';
    
    return jsdoc;
  }

  generateDescription(result) {
    const { purpose, patterns, suggestedName } = result;
    
    let description = '';
    
    // Base description from purpose
    const purposeDescriptions = {
      getter: 'Retrieves',
      setter: 'Sets',
      validator: 'Validates',
      factory: 'Creates',
      handler: 'Handles',
      processor: 'Processes',
      http: 'Performs HTTP operation for',
      database: 'Database operation for',
      cache: 'Cache operation for',
      auth: 'Authentication operation for'
    };
    
    description = purposeDescriptions[purpose] || 'Performs operation for';
    
    // Extract entity from suggested name
    const entity = suggestedName
      .replace(/^(get|set|validate|create|handle|process|fetch|find|save|cache|authenticate)/, '')
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .toLowerCase();
    
    if (entity) {
      description += ` ${entity}`;
    }
    
    // Add pattern info
    if (patterns && patterns.length > 0) {
      description += `. Pattern: ${patterns.join(', ')}`;
    }
    
    return description;
  }

  updateFunctionName(code, oldName, newName) {
    // Handle undefined or null code
    if (!code) {
      console.warn(`No code provided for function ${oldName}`);
      return '';
    }
    
    // Simple regex replacement for function name
    // This is a basic implementation - a more robust solution would use AST transformation
    const patterns = [
      new RegExp(`function\\s+${oldName}\\s*\\(`, 'g'),
      new RegExp(`const\\s+${oldName}\\s*=\\s*function`, 'g'),
      new RegExp(`let\\s+${oldName}\\s*=\\s*function`, 'g'),
      new RegExp(`var\\s+${oldName}\\s*=\\s*function`, 'g'),
      new RegExp(`const\\s+${oldName}\\s*=\\s*\\(`, 'g'),
      new RegExp(`let\\s+${oldName}\\s*=\\s*\\(`, 'g'),
      new RegExp(`var\\s+${oldName}\\s*=\\s*\\(`, 'g')
    ];
    
    let updatedCode = code;
    
    patterns.forEach(pattern => {
      updatedCode = updatedCode.replace(pattern, (match) => {
        return match.replace(oldName, newName);
      });
    });
    
    return updatedCode;
  }

  generateFunctionMetadata(result) {
    return {
      originalName: result.originalName,
      newName: result.suggestedName,
      startLine: result.startLine,
      endLine: result.endLine,
      purpose: result.purpose,
      category: result.category,
      patterns: result.patterns,
      confidence: result.confidence,
      confidenceLevel: result.confidenceLevel,
      method: result.method,
      complexity: result.complexity,
      features: result.features,
      alternativeNames: result.alternativeNames,
      timestamp: new Date().toISOString(),
      renamedBy: result.method === 'ai' ? `ai-${result.aiService}` : 'local-analyzer'
    };
  }

  async createDirectoryStructure() {
    const directories = [
      'app/accessors',
      'app/validators',
      'app/handlers',
      'app/processors',
      'app/factories',
      'app/utils',
      'app/hooks',
      'app/errors',
      'app/http',
      'app/logger',
      'core/middleware',
      'core/network',
      'core/database',
      'core/storage',
      'core/auth',
      'unknown'
    ];

    for (const dir of directories) {
      await fs.mkdir(path.join(this.config.outputDir, dir), { recursive: true });
    }
  }

  async generateMetadata() {
    await fs.mkdir(this.config.metadataDir, { recursive: true });

    // Function index
    const indexPath = path.join(this.config.metadataDir, 'function-index.json');
    await fs.writeFile(indexPath, JSON.stringify(this.mappings, null, 2));

    // Analysis summary
    const summaryPath = path.join(this.config.metadataDir, 'analysis-summary.json');
    const summary = {
      timestamp: new Date().toISOString(),
      stats: this.stats,
      confidenceDistribution: this.getConfidenceDistribution(),
      categoryDistribution: this.getCategoryDistribution(),
      methodDistribution: this.getMethodDistribution(),
      aiServiceDistribution: this.getAIServiceDistribution()
    };
    await fs.writeFile(summaryPath, JSON.stringify(summary, null, 2));

    // Detailed results
    const resultsPath = path.join(this.config.metadataDir, 'detailed-results.json');
    await fs.writeFile(resultsPath, JSON.stringify(this.results, null, 2));
  }

  async createBuildScript() {
    const buildScriptPath = path.join(this.config.outputDir, '..', 'build-refactored.js');
    
    const buildScript = `#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Load function mappings
const mappings = require('./metadata/function-index.json');

// Build the refactored CLI
console.log('Building refactored CLI...');

let output = '#!/usr/bin/env node\\n\\n';
output += '// Auto-generated from refactored functions\\n\\n';

// Add requires for all functions
Object.entries(mappings).forEach(([originalName, info]) => {
  const requirePath = './' + info.path.replace(/\\.js$/, '');
  output += \`const { \${info.newName} } = require('\${requirePath}');\\n\`;
});

output += '\\n// Main CLI logic would go here\\n';

// Write the built file
fs.writeFileSync(path.join(__dirname, 'cli-refactored.js'), output);
console.log('Build complete: cli-refactored.js');
`;

    await fs.writeFile(buildScriptPath, buildScript);
    await fs.chmod(buildScriptPath, '755');
  }

  async generateReport() {
    const reportPath = path.join(this.config.outputDir, '..', 'refactoring-report.md');
    
    let report = `# CLI.js Refactoring Report

Generated: ${new Date().toISOString()}

## Summary

- **Total Functions**: ${this.stats.totalFunctions}
- **Processed**: ${this.stats.processed}
- **Renamed**: ${this.stats.renamed}
- **Errors**: ${this.stats.errors}
- **Skipped**: ${this.stats.skipped}

## AI Services Configuration

- **Primary Service**: ${this.config.aiConfig.primaryService}
- **Available Services**:
  - Gemini (gemini-2.5-pro-preview-06-05): ${this.config.aiConfig.geminiApiKey ? 'Configured' : 'Not configured'}
  - Azure GPT-4.1: ${this.config.aiConfig.azureOpenAI ? 'Configured' : 'Not configured'}
  - Azure O4-Mini: ${this.config.aiConfig.azureOpenAI ? 'Configured' : 'Not configured'}

## Confidence Distribution

`;

    const confidenceDist = this.getConfidenceDistribution();
    Object.entries(confidenceDist).forEach(([level, count]) => {
      const percentage = ((count / this.stats.processed) * 100).toFixed(1);
      report += `- **${level}**: ${count} (${percentage}%)\n`;
    });

    report += `\n## Category Distribution\n\n`;
    
    const categoryDist = this.getCategoryDistribution();
    Object.entries(categoryDist).forEach(([category, count]) => {
      const percentage = ((count / this.stats.processed) * 100).toFixed(1);
      report += `- **${category}**: ${count} (${percentage}%)\n`;
    });

    report += `\n## Method Distribution\n\n`;
    
    const methodDist = this.getMethodDistribution();
    Object.entries(methodDist).forEach(([method, count]) => {
      const percentage = ((count / this.stats.processed) * 100).toFixed(1);
      report += `- **${method}**: ${count} (${percentage}%)\n`;
    });

    const aiServiceDist = this.getAIServiceDistribution();
    if (Object.keys(aiServiceDist).length > 0) {
      report += `\n## AI Service Usage\n\n`;
      Object.entries(aiServiceDist).forEach(([service, count]) => {
        const percentage = ((count / this.stats.processed) * 100).toFixed(1);
        report += `- **${service}**: ${count} (${percentage}%)\n`;
      });
    }

    report += `\n## Sample Renamings\n\n`;
    report += `| Original | New Name | Confidence | Method | Service |\n`;
    report += `|----------|----------|------------|--------|----------|\n`;
    
    // Show top 20 renamings
    this.results
      .filter(r => !r.error && r.suggestedName !== r.originalName)
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 20)
      .forEach(result => {
        const service = result.aiService || 'local';
        report += `| ${result.originalName} | ${result.suggestedName} | ${result.confidence}% | ${result.method} | ${service} |\n`;
      });

    if (this.stats.errors > 0) {
      report += `\n## Errors\n\n`;
      this.results
        .filter(r => r.error)
        .forEach(result => {
          report += `- **${result.originalName}**: ${result.error}\n`;
        });
    }

    await fs.writeFile(reportPath, report);
    console.log(`Report saved to: ${reportPath}`);
  }

  getConfidenceDistribution() {
    const dist = { high: 0, medium: 0, low: 0 };
    this.results.forEach(result => {
      if (result.confidence >= 80) dist.high++;
      else if (result.confidence >= 50) dist.medium++;
      else dist.low++;
    });
    return dist;
  }

  getCategoryDistribution() {
    const dist = {};
    this.results.forEach(result => {
      const category = result.category || 'unknown';
      dist[category] = (dist[category] || 0) + 1;
    });
    return dist;
  }

  getMethodDistribution() {
    const dist = {};
    this.results.forEach(result => {
      const method = result.method || 'unknown';
      dist[method] = (dist[method] || 0) + 1;
    });
    return dist;
  }

  getAIServiceDistribution() {
    const dist = {};
    this.results.forEach(result => {
      if (result.aiService) {
        dist[result.aiService] = (dist[result.aiService] || 0) + 1;
      }
    });
    return dist;
  }

  printSummary() {
    console.log('\n=== Summary ===');
    console.log(`Total Functions: ${this.stats.totalFunctions}`);
    console.log(`Successfully Renamed: ${this.stats.renamed}`);
    console.log(`Errors: ${this.stats.errors}`);
    console.log(`Success Rate: ${((this.stats.renamed / this.stats.totalFunctions) * 100).toFixed(1)}%`);
    
    const avgConfidence = this.results
      .filter(r => !r.error)
      .reduce((sum, r) => sum + r.confidence, 0) / (this.stats.processed - this.stats.errors);
    
    console.log(`Average Confidence: ${avgConfidence.toFixed(1)}%`);
    console.log(`\nAI Services Used: ${this.config.useAI ? 'Yes' : 'No'}`);
    
    if (this.config.useAI) {
      const aiServiceDist = this.getAIServiceDistribution();
      if (Object.keys(aiServiceDist).length > 0) {
        console.log('AI Service Breakdown:');
        Object.entries(aiServiceDist).forEach(([service, count]) => {
          console.log(`  - ${service}: ${count} functions`);
        });
      }
    }
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  const config = {
    inputFile: args[0] || path.join(__dirname, '..', 'cli.js'),
    outputDir: args[1] || path.join(__dirname, '..', 'src'),
    useAI: !args.includes('--no-ai'),
    dryRun: args.includes('--dry-run'),
    aiConfig: {
      geminiApiKey: process.env.GEMINI_API_KEY,
      azureOpenAI: {
        apiKey: process.env.AZURE_OPENAI_KEY
      },
      openaiApiKey: process.env.OPENAI_API_KEY,
      primaryService: 'azure-gpt4',
      fallbackOrder: ['azure-gpt4', 'azure-o4mini', 'gemini']
    }
  };

  const refactorer = new CLIRefactorer(config);
  refactorer.run();
}

module.exports = CLIRefactorer;