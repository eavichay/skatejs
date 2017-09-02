import { Component } from './component.js';
import { html } from './lit-html.js';
import './styles.js';

class Header extends Component {
  renderCallback() {
    return html`
      <header>
        <skate-styles></skate-styles>
        <h1 class="primary-title">
          <div class="primary-logo">⛸</div>
          <div>SkateJS</div>
        </h1>
        <h2 class="subtitle">Component mixins for all your renderers</h2>
      </header>
    `;
  }
}

customElements.define('skate-header', Header);

export default Header;
