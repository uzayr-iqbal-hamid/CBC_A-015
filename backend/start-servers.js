const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Define the startup configuration
const config = {
  fastapi: {
    command: 'python',
    args: ['-m', 'uvicorn', 'main:app', '--reload', '--host', '0.0.0.0', '--port', '8000'],
    name: 'FastAPI'
  },
  express: {
    command: 'node',
    args: ['express-server.js'],
    name: 'Express'
  }
};

// Function to start a server
function startServer(serverConfig) {
  console.log(`Starting ${serverConfig.name} server...`);
  
  const server = spawn(serverConfig.command, serverConfig.args, {
    cwd: process.cwd(),
    stdio: 'pipe',
    shell: process.platform === 'win32' // Use shell on Windows
  });
  
  // Prefix output with server name
  const prefixOutput = (data, serverName, isError = false) => {
    const stream = isError ? process.stderr : process.stdout;
    const lines = data.toString().trim().split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        stream.write(`[${serverName}] ${line}\n`);
      }
    });
  };
  
  server.stdout.on('data', data => prefixOutput(data, serverConfig.name));
  server.stderr.on('data', data => prefixOutput(data, serverConfig.name, true));
  
  server.on('close', code => {
    console.log(`${serverConfig.name} server exited with code ${code}`);
    // Restart the server if it crashes
    if (code !== 0 && code !== null) {
      console.log(`Restarting ${serverConfig.name} server in 5 seconds...`);
      setTimeout(() => startServer(serverConfig), 5000);
    }
  });
  
  return server;
}

// Check if express-server.js exists, if not print warning
if (!fs.existsSync(path.join(process.cwd(), 'express-server.js'))) {
  console.warn('Warning: express-server.js not found. Express server will not start.');
  console.warn('You can create it with: npm install express cors body-parser');
}

// Check if required npm packages are installed
try {
  require.resolve('express');
  require.resolve('cors');
  require.resolve('body-parser');
} catch (e) {
  console.warn('Warning: Required npm packages are not installed. Please run:');
  console.warn('npm install express cors body-parser');
}

// Start the servers
const fastapiServer = startServer(config.fastapi);
const expressServer = startServer(config.express);

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down servers...');
  fastapiServer.kill();
  expressServer.kill();
  process.exit(0);
});

console.log('Both servers are running. Press Ctrl+C to stop.'); 