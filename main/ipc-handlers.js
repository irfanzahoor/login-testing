const { ipcMain, BrowserWindow } = require('electron');
const api = require('../services/api');

// Set up IPC handlers
function setupIPCHandlers() {
  ipcMain.handle('login', async (_, credentials) => {
    return await api.login(credentials);
  });

  ipcMain.on('open-dashboard', (_, projects) => {
    const dashboardWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
    });

    dashboardWindow.loadFile(path.join(__dirname, '../renderer/dashboard.html'));

    dashboardWindow.webContents.once('did-finish-load', () => {
      dashboardWindow.webContents.send('projects-data', projects);
    });
  });
}

module.exports = { setupIPCHandlers };
