
class StylesFrom extends HTMLElement {
  connectedCallback(){
    let sel = this.getAttribute('selector');
    let link = document.querySelector(sel);
    debugger;
  }
}

customElements.define('styles-from', StylesFrom);
