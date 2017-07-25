import { Component, h } from './skate.js';
import './styles-from.js';

class Header extends Component {
  renderCallback() {
    return h('header', null, [
      h('styles-from', {selector: '#sk-styles'}),
      'This is the header'
    ]);
  }
}

customElements.define('skate-header', Header);

export default Header;
