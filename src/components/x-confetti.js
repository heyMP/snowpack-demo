import { html, LitElement, css } from "../../web_modules/lit-element.js";
import confetti from "../../web_modules/canvas-confetti.js";

class XConfetti extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      canvas {
        width: 100%;
        position: absolute;
        height: 100%;
      }
    `
  }
  firstUpdated() {
    var myConfetti = confetti.create(this.shadowRoot.querySelector("#canvas"), {
      resize: true,
      useWorker: true
    });
    myConfetti({
      particleCount: 1000,
      spread: 1600,
      startVelocity: 40,
      spread: 155,
      angle: 90
    });
  }
  render() {
    return html`
      <canvas id="canvas"></canvas>
    `;
  }
}

customElements.define("x-confetti", XConfetti);