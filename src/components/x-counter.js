import { html } from '../../web_modules/lit-element.js';
import { MobxLitElement } from '../../web_modules/@adobe/lit-mobx.js'
import { store } from "../store.js"

class XCounter extends MobxLitElement {
  render() {
    return html`
      <button @click=${() => store.decrementCount()} .disabled="${store.complete}">-</button>
      ${store.count}
      <button @click=${() => store.incrementCount()} .disabled="${store.complete}">+</button>
    `;
  }
}

customElements.define('x-counter', XCounter);