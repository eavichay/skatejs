import { withProps } from '../../esnext/with-props.js';
import { withRender } from '../../esnext/with-render.js';
import { withUnique } from '../../esnext/with-unique.js';
import { render } from './lit-html.js';

export const withComponent = (Base) => {
  return class extends withRender(withUnique(withProps(Base))) {
    rendererCallback(shadowRoot, renderCallback) {
      render(renderCallback(this), shadowRoot);
    }
  };
}

export let Component = withComponent(HTMLElement);
