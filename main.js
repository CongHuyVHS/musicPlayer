const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'assets', '.img/music01.ico'),
        frame:false, 
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
    });
    mainWindow.loadFile('index.html');
});

ipcMain.on('minimize-window', () =>{
    if (mainWindow) mainWindow.minimize();
});

ipcMain.on('close-window', () =>{
    if (mainWindow) mainWindow.close();
});


