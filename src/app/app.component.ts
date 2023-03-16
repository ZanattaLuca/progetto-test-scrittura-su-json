import { Component } from '@angular/core';

interface MyWindow extends Window {
  require: (module: string) => any;
}

const myWindow = window as MyWindow;

const { ipcRenderer } = myWindow.require('electron');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  inputValue = '';

  constructor() {
    // Leggi il contenuto del file data.json quando l'app viene avviata
    ipcRenderer.send('read-file');
    ipcRenderer.on('file-data', (_: any, data: any) => {
      if (data) {
        this.inputValue = data;
      }
    });
  }

  saveInput() {
    // Sovrascrivi il contenuto del file data.json con il nuovo valore dell'input
    ipcRenderer.send('write-to-file', this.inputValue);
  }
}