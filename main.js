const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  win.loadFile('dist/progetto-test-scrittura-su-json/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('save-data', (event, filePath, data) => {
  appendToFile(filePath, data);
});

function appendToFile(filePath, data) {
  const absolutePath = path.join(__dirname, filePath);
  fs.readFile(absolutePath, 'utf-8', (err, fileData) => {
    if (err) {
      console.error(err);
      return;
    }
    try {
      const jsonData = JSON.parse(fileData);
      jsonData.data.push(data);
      fs.writeFile(absolutePath, JSON.stringify(jsonData, null, 2), 'utf-8', (writeErr) => {
        if (writeErr) {
          console.error(writeErr);
        }
      });
    } catch (parseErr) {
      console.error(parseErr);
    }
  });
}