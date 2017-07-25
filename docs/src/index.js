import { Component, h } from './skate.js';
import Header from './header.js';

customElements.define('kick-push', class extends Component {
  renderCallback() {
    return h('main', {}, [
      h('skate-header')
    ])
  }
});
