// @flow

export const withChildren = (Base: Class<any> = HTMLElement): Class<any> =>
  class extends Base {
    childrenUpdated: Function | void;

    connectedCallback() {
      if (super.connectedCallback) {
        super.connectedCallback();
      }
      if (this.childrenUpdated) {
        const fn = this.childrenUpdated.bind(this);
        const mo = new MutationObserver(fn);
        mo.observe(this, { childList: true });
        fn();
      }
    }
  };
