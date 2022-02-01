// const { app, BrowserWindow } = require('electron');
import electron from 'electron';
const { app, BrowserWindow} = electron;


try {
    require('electron-reloader')(module);
} catch (_) {}

const createWindow = () => {
    const window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });

    // window.loadFile('build/index.html');
    window.loadFile('dist/index.html');
};

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
