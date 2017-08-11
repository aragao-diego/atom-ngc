'use babel';

import NgcView from './ngc-view';
import { CompositeDisposable } from 'atom';
const provider = require('./provider.js');

export default {

  ngcView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.ngcView = new NgcView(state.ngcViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ngcView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ngc:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ngcView.destroy();
  },

  serialize() {
    return {
      ngcViewState: this.ngcView.serialize()
    };
  },

  toggle() {
    console.log('Ngc was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

  // getProvider() {
  //   return provider;
  // }

};
