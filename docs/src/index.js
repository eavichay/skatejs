import { Component } from './component.js';
import Header from './header.js';
import { html } from './lit-html.js';
import './styles.js';
import './code-example.js';

const example = `
import { Component } from 'skatejs';

customElements.define('hello-world', class extends Component {
  renderCallback() {
    return <div>Hello world!</div>;
  }
});
`;

customElements.define('kick-push', class extends Component {
  renderCallback() {
    return html`
      <main>
        <skate-styles></skate-styles>
        <styles-from selector="#hljs-styles"></styles-from>

        <skate-header></skate-header>
        <section class="main-example">
          <code-example code=${example}></code-example>
        </section>
      </main>
    `;
  }
});
