import { html, LitElement, css } from "../../web_modules/lit-element.js";
import { MobxLitElement } from "../../web_modules/@adobe/lit-mobx.js";
import { store } from "../store.js";
import "./x-confetti.js";

class XComplete extends MobxLitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        justify-items: center;
        align-items: center;
        flex-direction: column;
        position: relative;
      }
      #text {
        text-align: center;
        flex: 1 1 auto;
        display: flex;
        justify-items: center;
        align-items: center;
        opacity: 0;
        scale: 0;
        transition: all .3s ease-in-out;
      }
      #text.complete {
        opacity: 1;
        scale: 1;
      }
      x-confetti {
        width: 100%;
        height: 100%;
        position: absolute;
      }
    `;
  }
  render() {
    return html`
      ${store.complete
        ? html`
            <x-confetti></x-confetti>
          `
        : html``}
      <div id="text" class="${store.complete ? 'complete' : ''}"><h1>Hey You Did it!</h1></div>
    `;
  }
}

customElements.define("x-complete", XComplete);
