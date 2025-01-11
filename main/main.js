const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const ipcHandlers = require('./ipc-handlers');

let mainWindow;

// Create the main window
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    icon: path.join(__dirname, '../assets/background.jpeg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Load the login page
  mainWindow.loadFile(path.join(__dirname, '../renderer/login.html'));

  // Clean up when closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Initialize app
app.whenReady().then(() => {
  createMainWindow();
  ipcHandlers.setupIPCHandlers();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

// Quit the app when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
