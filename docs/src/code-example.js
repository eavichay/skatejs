
customElements.define('code-example', class extends HTMLElement {
  connectedCallback() {
    this.style.display = 'inline-block';

    const code = this.getAttribute('code');
    const pre = document.createElement('pre');
    const c = document.createElement('code');
    c.className = 'javascript';
    c.textContent = code.trim();
    pre.appendChild(c);
    this.appendChild(pre);

     hljs.highlightBlock(c);
  }
});
