const electron = require('electron');
const { app, BrowserWindow } = electron; // Extracting from `electron` object

let mainWindow;

app.whenReady().then(() => {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	});

	mainWindow.loadURL('http://localhost:5173');
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
