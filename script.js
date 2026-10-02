/* =========================
   PARTICLES
========================= */

const canvas = document.getElementById("particles");

const ctx = canvas.getContext("2d");


let particles = [];

let mouse = {
    x: null,
    y: null
};


function resizeCanvas() {

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

}


resizeCanvas();


window.addEventListener("resize", resizeCanvas);


window.addEventListener("mousemove", (event) => {

    mouse.x = event.clientX;

    mouse.y = event.clientY;

});


window.addEventListener("mouseleave", () => {

    mouse.x = null;

    mouse.y = null;

});


class Particle {

    constructor() {

        this.x = Math.random() * canvas.width;

        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 1.3 + .3;

        this.speedX = (Math.random() - .5) * .25;

        this.speedY = (Math.random() - .5) * .25;

        this.alpha = Math.random() * .45 + .1;

    }


    update() {

        this.x += this.speedX;

        this.y += this.speedY;


        if (this.x < 0) {
            this.x = canvas.width;
        }

        if (this.x > canvas.width) {
            this.x = 0;
        }


        if (this.y < 0) {
            this.y = canvas.height;
        }

        if (this.y > canvas.height) {
            this.y = 0;
        }


        /* Mouse interaction */

        if (mouse.x !== null) {

            const dx = this.x - mouse.x;

            const dy = this.y - mouse.y;

            const distance = Math.sqrt(
                dx * dx + dy * dy
            );


            if (distance < 120) {

                const force = (120 - distance) / 120;

                this.x += dx * force * .015;

                this.y += dy * force * .015;

            }

        }

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            `rgba(255,173,117,${this.alpha})`;


        ctx.fill();

    }

}


/* Create particles */

for (let i = 0; i < 110; i++) {

    particles.push(new Particle());

}


/* Animation */

function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach((particle) => {

        particle.update();

        particle.draw();

    });


    requestAnimationFrame(animate);

}


animate();


/* =========================
   TERMINAL TEXT
========================= */

const typingElement =
    document.querySelector(".typing");


const terminalTexts = [

    "initializing experiments...",

    "loading projects...",

    "checking systems...",

    "welcome, kw1kx."

];


let textIndex = 0;

let charIndex = 0;

let deleting = false;


function typeTerminal() {

    const currentText =
        terminalTexts[textIndex];


    if (!deleting) {

        typingElement.textContent =
            currentText.substring(
                0,
                charIndex
            );

        charIndex++;


        if (charIndex > currentText.length) {

            deleting = true;

            setTimeout(
                typeTerminal,
                1800
            );

            return;

        }

    } else {

        typingElement.textContent =
            currentText.substring(
                0,
                charIndex
            );

        charIndex--;


        if (charIndex < 0) {

            deleting = false;

            charIndex = 0;

            textIndex++;

            if (
                textIndex >=
                terminalTexts.length
            ) {

                textIndex = 0;

            }

        }

    }


    setTimeout(
        typeTerminal,
        deleting ? 35 : 55
    );

}


setTimeout(
    typeTerminal,
    1000
);