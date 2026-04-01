const {contextBridge, ipcRenderer} = require('electron');

console.log('preload script loaded'); 

conexttBridge.exposeInMainWorld('electronAPI', {
    minimizeWindow: () => ipcRenderer.send('minimize-window'),
    closeWindow: () => ipcRenderer.send('close-window'),
});