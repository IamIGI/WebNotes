const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;
const path = require('path');

let mainWindow;

app.setName('WebNotesIGI');
app.setAppUserModelId('WebNotesIGI');

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    //Title bar settings
    titleBarStyle: 'hidden',

    //Window size settings
    width: 800,
    height: 600,

    //Others
    icon: path.join(__dirname, 'assets', 'icon.ico'), // Set the icon here
    webPreferences: {
      preload: path.join(__dirname, '/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL('http://localhost:5173');
  mainWindow.on('closed', () => (mainWindow = null));
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('e_close', () => app.quit());
ipcMain.on('e_hide', () => mainWindow && mainWindow.minimize());
ipcMain.on('e_toggle_fullscreen', () => mainWindow && mainWindow.setFullScreen(!mainWindow.isFullScreen()));
