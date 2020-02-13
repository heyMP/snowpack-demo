import { html, LitElement, css } from "../../web_modules/lit-element.js";
import "./x-counter.js"
import "./x-complete.js"

class XHome extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        justify-items: center;
        align-items: center;
        flex-direction: column;
        height: 100%;
        min-height: 100vh;
      }
      x-complete {
        flex: 1 1 auto;
        width: 100%;
      }
    `
  }
  render() {
    return html`
      Count to 10
      <x-counter></x-counter>
      <x-complete></x-complete>
    `;
  }
}

customElements.define("x-home", XHome);