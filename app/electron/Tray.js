import { Tray, Menu } from 'electron';
import robotjs from 'robotjs'

import unhandled from 'electron-unhandled'
unhandled();

import project from './config/project';
import window from './window'

class AppTray extends Tray {
  constructor(iconPath, window) {
    super(iconPath);
    this.window = window;

    this.toggle = this.toggle.bind(this)
    this.on('click', this.onClick.bind(this));
    this.on('right-click', this.onRightClick.bind(this));
    this.setToolTip('Majorkey 👌'); // method in parent class
  }

  onClick(evt, bounds) {
    this.window.show();
  }

  toggle() {
    if (this.window.isVisible()) {
      this.window.hide();
    } else {
      this.window.show();
    }
  }

  onRightClick() {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Toggle',
        click: () => this.toggle(),
      },
      {
        label: 'Exit',
        click: () => app.quit(),
      },
    ]);
    this.popUpContextMenu(menuConfig); // originall Tray method
  }
}

export default AppTray
