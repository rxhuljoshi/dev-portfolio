// Canvas animation - creates colorful trailing lines following mouse/touch
// @ts-nocheck

function Oscillator(config) {
    this.init(config || {});
}

Oscillator.prototype = {
    init: function (config) {
        this.phase = config.phase || 0;
        this.offset = config.offset || 0;
        this.frequency = config.frequency || 0.001;
        this.amplitude = config.amplitude || 1;
    },
    update: function () {
        this.phase += this.frequency;
        return this.offset + Math.sin(this.phase) * this.amplitude;
    },
    value: function () {
        return this.offset + Math.sin(this.phase) * this.amplitude;
    },
};

function Line(config) {
    this.init(config || {});
}

Line.prototype = {
    init: function (config) {
        this.spring = config.spring + 0.1 * Math.random() - 0.05;
        this.friction = settings.friction + 0.01 * Math.random() - 0.005;
        this.nodes = [];
        for (let i = 0; i < settings.size; i++) {
            const node = new Node();
            node.x = pos.x;
            node.y = pos.y;
            this.nodes.push(node);
        }
    },
    update: function () {
        let spring = this.spring;
        let node = this.nodes[0];
        node.vx += (pos.x - node.x) * spring;
        node.vy += (pos.y - node.y) * spring;

        for (let i = 0; i < this.nodes.length; i++) {
            node = this.nodes[i];
            if (i > 0) {
                const prev = this.nodes[i - 1];
                node.vx += (prev.x - node.x) * spring;
                node.vy += (prev.y - node.y) * spring;
                node.vx += prev.vx * settings.dampening;
                node.vy += prev.vy * settings.dampening;
            }
            node.vx *= this.friction;
            node.vy *= this.friction;
            node.x += node.vx;
            node.y += node.vy;
            spring *= settings.tension;
        }
    },
    draw: function () {
        let x = this.nodes[0].x;
        let y = this.nodes[0].y;

        ctx.beginPath();
        ctx.moveTo(x, y);

        for (let i = 1; i < this.nodes.length - 2; i++) {
            const curr = this.nodes[i];
            const next = this.nodes[i + 1];
            x = 0.5 * (curr.x + next.x);
            y = 0.5 * (curr.y + next.y);
            ctx.quadraticCurveTo(curr.x, curr.y, x, y);
        }

        const secondLast = this.nodes[this.nodes.length - 2];
        const last = this.nodes[this.nodes.length - 1];
        ctx.quadraticCurveTo(secondLast.x, secondLast.y, last.x, last.y);
        ctx.stroke();
        ctx.closePath();
    },
};

function onMousemove(e) {
    function initLines() {
        lines = [];
        for (let i = 0; i < settings.trails; i++) {
            lines.push(new Line({ spring: 0.45 + (i / settings.trails) * 0.025 }));
        }
    }

    function handleMove(e) {
        if (e.touches) {
            pos.x = e.touches[0].pageX;
            pos.y = e.touches[0].pageY;
        } else {
            pos.x = e.clientX;
            pos.y = e.clientY;
        }
        e.preventDefault();
    }

    function handleTouchStart(e) {
        if (e.touches.length === 1) {
            pos.x = e.touches[0].pageX;
            pos.y = e.touches[0].pageY;
        }
    }

    document.removeEventListener("mousemove", onMousemove);
    document.removeEventListener("touchstart", onMousemove);
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("touchmove", handleMove);
    document.addEventListener("touchstart", handleTouchStart);
    handleMove(e);
    initLines();
    render();
}

function render() {
    if (ctx.running) {
        ctx.globalCompositeOperation = "source-over";
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.globalCompositeOperation = "lighter";
        ctx.strokeStyle = "hsla(" + Math.round(oscillator.update()) + ",100%,50%,0.025)";
        ctx.lineWidth = 10;

        for (let i = 0; i < settings.trails; i++) {
            lines[i].update();
            lines[i].draw();
        }

        ctx.frame++;
        window.requestAnimationFrame(render);
    }
}

function resizeCanvas() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}

let ctx;
let oscillator;
const pos = { x: 0, y: 0 };
let lines = [];
const settings = {
    debug: true,
    friction: 0.5,
    trails: 80,
    size: 50,
    dampening: 0.025,
    tension: 0.99,
};

function Node() {
    this.x = 0;
    this.y = 0;
    this.vy = 0;
    this.vx = 0;
}

export const renderCanvas = function () {
    ctx = document.getElementById("canvas")?.getContext("2d");
    if (!ctx) return;

    ctx.running = true;
    ctx.frame = 1;
    oscillator = new Oscillator({
        phase: Math.random() * 2 * Math.PI,
        amplitude: 85,
        frequency: 0.0015,
        offset: 285,
    });

    document.addEventListener("mousemove", onMousemove);
    document.addEventListener("touchstart", onMousemove);
    document.body.addEventListener("orientationchange", resizeCanvas);
    window.addEventListener("resize", resizeCanvas);

    window.addEventListener("focus", () => {
        if (!ctx.running) {
            ctx.running = true;
            render();
        }
    });

    window.addEventListener("blur", () => {
        ctx.running = true;
    });

    resizeCanvas();
};
