document.addEventListener('DOMContentLoaded', () => {
	const jokeSection = document.getElementById('jokeSection');
	const jokeForm = document.getElementById('jokeForm');

	const possibleEmoji = ["😀", "😂", "😆", "😊"];
	let width = window.innerWidth;
	let height = window.innerHeight;
	const particles = [];

	function emojiCursor() {
		function init() {
			bindEvents();
			loop();
		}

		function bindEvents() {
			document.addEventListener('mousemove', onMouseMove);
			document.addEventListener('touchmove', onTouchMove);
			document.addEventListener('touchstart', onTouchMove);

			window.addEventListener('resize', onWindowResize);
		}

		function onWindowResize(e) {
			width = window.innerWidth;
			height = window.innerHeight;
		}

		function onTouchMove(e) {
			if( e.touches.length > 0 ) {
				for(let i = 0; i < e.touches.length; i++ ) {
					addParticle( e.touches[i].clientX, e.touches[i].clientY, possibleEmoji[Math.floor(Math.random()*possibleEmoji.length)]);
				}
			}
		}

		function onMouseMove(e) {
			addParticle(e.clientX, e.clientY, "😂"); // Always add laughing emoji
		}

		function addParticle(x, y, character) {
			const particle = new Particle();
			particle.init(x, y, character);
			particles.push(particle);
		}

		function updateParticles() {
			let i;
			for(i = 0; i < particles.length; i++ ) {
				particles[i].update();
			}

			for(i = particles.length -1; i >= 0; i-- ) {
				if( particles[i].lifeSpan < 0 ) {
					particles[i].die();
					particles.splice(i, 1);
				}
			}
		}

		function loop() {
			requestAnimationFrame(loop);
			updateParticles();
		}

		function applyProperties(target, properties) {
			for(const key in properties ) {
				target.style[key] = properties[key];
			}
		}

		function Particle() {
			this.lifeSpan = 120;

			this.initialStyles = {
				"position": "absolute",
				"display": "block",
				"pointerEvents": "none",
				"z-index": "10000000",
				"fontSize": "16px",
				"will-change": "transform"
			};

			this.init = function(x, y, character) {
				this.velocity = {
					x:  (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
					y: 1
				};

				this.position = {x: x - 10, y: y - 20};

				this.element = document.createElement('span');
				this.element.innerHTML = character;
				applyProperties(this.element, this.initialStyles);
				this.update();

				document.body.appendChild(this.element);
			};

			this.update = function() {
				this.position.x += this.velocity.x;
				this.position.y += this.velocity.y;
				this.lifeSpan--;

				this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + (this.lifeSpan / 120) + ")";
			}

			this.die = function() {
				this.element.parentNode.removeChild(this.element);
			}
		}

		init();
	}

	(async () => {
		await emojiCursor(); // Call the emojiCursor function to initialize the effect
	})();
});




