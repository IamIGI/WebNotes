const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  closeApp: () => ipcRenderer.send('e_close'),
  hideWindow: () => ipcRenderer.send('e_hide'),
  toggleFullScreen: () => ipcRenderer.send('e_toggle_fullscreen'),
});
