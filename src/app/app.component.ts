import { Component } from '@angular/core';
declare const require: any;
const { ipcRenderer } = window.require('electron');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'progetto-test-scrittura-su-json';
  inputValue = '';

  saveInput() {
    const filePath = 'src/assets/data.json';
    ipcRenderer.send('save-data', filePath, { content: this.inputValue });
    this.inputValue = '';
  }
}