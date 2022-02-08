import React, { useEffect,useRef } from 'react'

const ParticleText = props => {

    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];

        let mouse = {
            x: null,
            y: null,
            radius: 150,
        }

        window.addEventListener('mousemove', function (event) {
            const rect = canvas.getBoundingClientRect();
            mouse.y = (event.y - rect.top) * (canvas.height / rect.height);
            mouse.x = (event.x - rect.left) * (canvas.width / rect.width);
        });

        context.fillStyle = 'white';
        context.font = '30px Verdana';
        context.fillText('404', 0, 30);
        const textCoordinates = context.getImageData(0, 0, 100, 100);

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = 3;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 50) + 5;
            }

            draw() {
                context.beginPath()
                context.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
                context.closePath();
                context.fill();
            }

            update() {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;

                let maxDistance = mouse.radius;

                let force = (maxDistance - distance) / maxDistance;

                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;

                if (distance < mouse.radius) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 10;
                    } if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 10;
                    }
                }
            }
        }

        function init() {
            particles = [];
            for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
                for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
                    if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
                        const rect = canvas.getBoundingClientRect();
                        let posX = (x) + (canvas.width) / 32;
                        let posY = y + 10;
                        let particle = new Particle(posX * 10, posY * 10)
                        particle.x = Math.random() * canvas.width;
                        particle.y = Math.random() * canvas.height;
                        particles.push(particle);
                    }
                }
            }
        }

        function animate() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            // connect();
            requestAnimationFrame(animate);
        }

        function connect() {
            let maxDistance = 2;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance <= maxDistance) {
                        context.strokeStyle = 'white';
                        context.lineWidth = 2;
                        context.beginPath();
                        context.moveTo(particles[a].x, particles[a].y);
                        context.lineTo(particles[b].x, particles[b].y);
                        context.stroke();
                    }
                }
            }
        }

        init();
        animate();
    }, [])

    return <canvas ref={canvasRef} {...props} />
}

export default ParticleText