export type Mixed = {};
export type Maybe<T> = T | null | undefined;
export type Constructor<T = Mixed> = new (...args: any[]) => T;
export type HTMLElementClass = typeof HTMLElement;

export type ComponentProps<T, E = HTMLElementClass> = {
  [P in keyof T]: PropOptions
};

// NOTE:
// - all classes are just ambient definitions (opaque types like), so consumer cannot use them directly
// - inferring generics work only on instances, not on implementation type. So this will not give you type safety, you still have to manually annotate those props in your code

/**
 * Implement this interface for any @skatejs/renderer-*
 */
export interface Renderer<O> {
  // render?(props?: Mixed): O;

  // called after render
  // rendered?(): void;

  renderer(
    renderRoot: Node | Element | ShadowRoot,
    render: (props?: Mixed) => O
  ): void;
}

export interface WithComponent<P = Mixed, S = Mixed, C = Mixed>
  extends CustomElement,
    WithUnique,
    WithChildren,
    WithLifecycle,
    WithRenderer,
    WithUpdate<P, S>,
    WithContext<C> {}

export declare class WithComponent<
  P = Mixed,
  S = Mixed,
  C = Mixed
> extends HTMLElement {
  static readonly observedAttributes: string[];
}

// Custom Elements v1
export class CustomElement extends HTMLElement {
  static readonly observedAttributes: string[];
  connectedCallback(): void;
  disconnectedCallback(): void;
  attributeChangedCallback(
    name: string,
    oldValue: null | string,
    newValue: null | string
  ): void;
  adoptedCallback?(): void;
}

export declare class WithChildren extends HTMLElement {
  childrenUpdated(): void;
}
export declare class WithLifecycle extends HTMLElement {
  connecting(): void;
  connected(): void;
  disconnecting(): void;
  disconnected(): void;
}

export declare class WithContext<C = Mixed> extends HTMLElement {
  context: C;
}

export declare class WithRenderer<O = Mixed | null> extends HTMLElement
  implements Partial<Renderer<O>> {
  // getter for turning of ShadowDOM
  readonly renderRoot?: this | Mixed;

  render(props?: Mixed): O;

  // called after render
  rendered(): void;

  renderer?(renderRoot: Element, render: () => O): void;

  updated(props?: Mixed, state?: Mixed): void;
}

export declare class WithUpdate<P = Mixed, S = Mixed> extends HTMLElement {
  // Special hack for own components type checking.
  // It works in combination with ElementAttributesProperty. It placed in jsx.d.ts.
  // more detail, see: https://www.typescriptlang.org/docs/handbook/jsx.html
  //               and https://github.com/skatejs/skatejs/pull/952#issuecomment-264500153
  readonly props: Readonly<P>;
  state: S;

  // Called when props have been set regardless of if they've changed. much like React's componentWillReceiveProps().
  updating(props?: P, state?: S): void;

  // Called to check whether or not the component should call updated(), much like React's shouldComponentUpdate().
  shouldUpdate(props?: P, state?: S): boolean;

  // Called if shouldUpdate returned true, much like React's componentWillUpdate()
  updated(props?: Mixed, state?: Mixed): void;
}

export declare class WithUnique extends HTMLElement {
  static is: string;
}

export interface PropOptions {
  attribute?: PropOptionsAttribute;
  coerce?: <T>(value: any) => Maybe<T>;
  default?: any | ((elem: HTMLElement, data: { name: string }) => any);
  deserialize?: <T>(value: string | null) => Maybe<T>;
  initial?: any | ((elem: HTMLElement, data: { name: string }) => any);
  serialize?: <T>(value: Maybe<T>) => string | null;
}

export type PropOptionsAttribute =
  | PropOptionsAttributeIdentifier
  | PropOptionsAttributeIdentifierMap;
export type PropOptionsAttributeIdentifier = boolean | string;
export type PropOptionsAttributeIdentifierMap = {
  source?: PropOptionsAttributeIdentifier;
  target?: PropOptionsAttributeIdentifier;
};

export interface EventOptions extends CustomEventInit {
  composed?: boolean;
}
export interface ComposedCustomEvent extends CustomEvent {
  composed?: boolean;
  composedPath?: () => Array<Node>;
}
