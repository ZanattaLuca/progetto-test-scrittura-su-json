const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs-extra');

const dataFilePath = path.join(__dirname, 'data.json');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile('dist/progetto-test-scrittura-su-json/index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('write-to-file', (event, data) => {
  fs.writeFileSync(dataFilePath, data);
});

ipcMain.on('read-file', (event) => {
  let data = '';
  if (fs.existsSync(dataFilePath)) {
    data = fs.readFileSync(dataFilePath, 'utf8');
  }
  event.reply('file-data', data);
});