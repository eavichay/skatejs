
customElements.define('styles-from', class extends HTMLElement {
  connectedCallback(){
    let sel = this.getAttribute('selector');
    let link = document.querySelector(sel);
    let rules = Array.from(link.sheet.rules);
    let style = document.createElement('style');

    style.textContent = rules.map(rule => {
      return rule.cssText;
    }).join('\n');

    this.appendChild(style);
  }
});

customElements.define('skate-styles', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<styles-from selector="#sk-styles"></styles-from>';
  }
});
