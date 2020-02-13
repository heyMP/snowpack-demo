import { LitElement, html, css, property, customElement } from './lit-element.js';

/** Simple random number range method. */
var random = (max = 1, min = 0) => min + Math.random() * (max - min);

/** Creates a random angle and modifies it ever so slightly each time. */
function* randomAngles () {
    let angle = random(Math.PI);
    while (true)
        yield angle += random(0.12, 0.05);
}

class Particle {
    constructor(context, x, y, colors, radius = random(20, 5), angles = randomAngles()) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.colors = colors;
        this.radius = radius;
        this.angles = angles;
        this.tilt = 0;
    }
    get strokeStyle() {
        if (this.colors.length == 1)
            return this.colors[0];
        const gradient = this.context.createLinearGradient(this.x + this.tilt + this.radius, this.y, this.x + this.tilt, this.y + this.tilt + this.radius);
        gradient.addColorStop(0, this.colors[0]);
        gradient.addColorStop(1, this.colors[1]);
        return gradient;
    }
    drawAndUpdate(gravity) {
        this.context.beginPath();
        this.context.lineWidth = this.radius * 2;
        this.context.strokeStyle = this.strokeStyle;
        this.context.moveTo(this.x + this.tilt + this.radius, this.y);
        this.context.lineTo(this.x + this.tilt, this.y + this.tilt + this.radius);
        this.context.stroke();
        // Move the particle depending on wind and gravity.
        this.x += 0.1 * (Math.sin(Particle.waveAngle) - 0.5);
        this.y += gravity * this.radius;
        this.tilt = Math.sin(this.angles.next().value) * Particle.maxTilt;
    }
}
/** The general sway for all the current particles. */
Particle.waveAngle = 0;
Particle.maxTilt = 15;

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let default_1 = class default_1 extends LitElement {
    constructor() {
        super(...arguments);
        this.gravity = 1;
        this.count = 0;
        this.gradient = false;
        this.hidden = false;
        this.colors = [];
        this.particles = new Set();
        this.rerenderNeeded = true;
        this.nextRainbowHue = 0;
        this.render = () => html `
    <canvas 
      id="confetti"
      width=${this.clientWidth}
      height=${this.clientHeight}
    ></canvas>
    <slot></slot>
  `;
        // The dom never actually needs to be changed.
        this.shouldUpdate = () => this.rerenderNeeded;
        this.draw = () => {
            this.context.clearRect(0, 0, this.clientWidth, this.clientHeight);
            // Draw & update particles, remove if no longer visible
            for (const particle of this.particles) {
                particle.drawAndUpdate(this.gravity);
                if (!this.isVisible(particle))
                    this.particles.delete(particle);
            }
            // Refill particles
            for (let i = this.particles.size; i < this.count; i++)
                this.particles.add(new Particle(this.context, random(this.clientWidth), -random(this.clientHeight / 3, 50), this.colors.length
                    ? this.getRandomStyle(random(1, 0.5))
                    : [`hsla(${this.nextRainbowHue++ % 360}, 100%, 50%, ${random(1, 0.75)})`]));
            Particle.waveAngle += 0.01;
            if (this.particles.size && !this.hidden)
                requestAnimationFrame(this.draw);
        };
        this.isVisible = (particle) => particle.y - 2 * particle.radius < this.clientHeight
            && particle.x + 2 * particle.radius > 0
            && particle.x - 2 * particle.radius < this.clientWidth;
        this.getRandomStyle = (opacity) => [...Array(+this.gradient + 1)]
            .map(() => this.getRandomColor(opacity));
        this.getRandomColor = (opacity) => {
            const randomColor = this.colors[Math.floor(random(this.colors.length))];
            return `rgba(${parseInt(randomColor.slice(1, 3), 16)}, ${parseInt(randomColor.slice(3, 5), 16)}, ${parseInt(randomColor.slice(5, 7), 16)}, ${opacity})`;
        };
    }
    get canvas() { var _a; return (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('confetti'); }
    firstUpdated() {
        this.context = this.canvas.getContext('2d');
        // update size of canvas
        addEventListener('resize', async () => {
            this.rerenderNeeded = true;
            await this.requestUpdate();
            this.rerenderNeeded = false;
        });
    }
    updated(oldProps) {
        // Start drawing if we are no longer hidden OR had no particles before and the count was unset (or 0).
        if (oldProps.get('hidden') || (oldProps.has('count') && !oldProps.get('count') && !this.particles.size))
            this.draw();
        // Gradient isn't possible with 1 color
        if (oldProps.has('colors') && this.colors.length < 2)
            this.gradient = false;
    }
};
default_1.styles = css `
  :host[hidden] {
    display: none
  }
  :host {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  `;
__decorate([
    property({ type: Number })
], default_1.prototype, "gravity", void 0);
__decorate([
    property({ type: Number })
], default_1.prototype, "count", void 0);
__decorate([
    property({ type: Boolean })
], default_1.prototype, "gradient", void 0);
__decorate([
    property({ type: Boolean })
], default_1.prototype, "hidden", void 0);
__decorate([
    property({ type: Array })
], default_1.prototype, "colors", void 0);
default_1 = __decorate([
    customElement('lit-confetti')
], default_1);
var default_1$1 = default_1;

export default default_1$1;
