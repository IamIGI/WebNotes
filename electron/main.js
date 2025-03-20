const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;
const path = require('path');

let mainWindow;

app.setName('WebNotesIGI');
app.setAppUserModelId('WebNotesIGI');

app.whenReady().then(() => {
  const INIT_WIDTH = 800;
  const INIT_HEIGHT = 600;
  // Create the splash screen window
  splashWindow = new BrowserWindow({
    height: INIT_HEIGHT,
    width: INIT_WIDTH,
    frame: false, // No title bar
    alwaysOnTop: true, // Keeps it on top
    transparent: true, // Enables transparency
    resizable: false,
  });

  splashWindow.loadFile(path.join(__dirname, 'splash.html'));

  // Create the main app window
  mainWindow = new BrowserWindow({
    //Title bar settings
    titleBarStyle: 'hidden',

    //Window size settings
    height: INIT_HEIGHT,
    width: INIT_WIDTH,
    show: false,
    //Others
    icon: path.join(__dirname, 'assets', 'icon.ico'), // Set the icon here
    webPreferences: {
      preload: path.join(__dirname, '/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL('http://localhost:5173');
  // Wait until the main window is ready, then close the splash screen
  mainWindow.once('ready-to-show', () => {
    splashWindow.close(); // Remove splash screen
    mainWindow.show(); // Show the main app window
  });

  mainWindow.on('closed', () => (mainWindow = null));
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('e_close', () => app.quit());
ipcMain.on('e_hide', () => mainWindow && mainWindow.minimize());
ipcMain.on('e_toggle_fullscreen', () => mainWindow && mainWindow.setFullScreen(!mainWindow.isFullScreen()));
