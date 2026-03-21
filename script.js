const vibeData = {
  compliments: [
    "Your perspective is exactly what's needed.", "You're a master of your craft.",
    "That idea you had? It's brilliant.", "You bring out the best in everyone around you.",
    "Your focus is absolutely unmatched.", "You handle challenges with incredible grace.",
    "You're making a bigger impact than you realize.", "You are a problem-solving machine."
  ],
  jokes: [
    "Why did the web developer walk out of a restaurant? Because of the table layout.",
    "How do you comfort a JavaScript bug? You console it.",
    "Why was the cell phone wearing glasses? It lost its contacts.",
    "What do you call a programmer from Finland? Nerdic.",
    "I’d tell you a joke about UDP, but you might not get it."
  ]
};

let currentMode = 'compliments';
let lastIndex = -1;

const output = document.getElementById('main-output');
const genBtn = document.getElementById('generate-btn');
const tabs = {
  compliments: document.getElementById('mode-compliment'),
  jokes: document.getElementById('mode-joke')
};

function createSparkles(e) {
  const rect = genBtn.getBoundingClientRect();
  for (let i = 0; i < 12; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    const size = Math.random() * 8 + 4;
    sparkle.style.width = sparkle.style.height = `${size}px`;
    sparkle.style.left = `${rect.left + rect.width / 2}px`;
    sparkle.style.top = `${rect.top + rect.height / 2}px`;
    document.body.appendChild(sparkle);

    const destX = (Math.random() - 0.5) * 350;
    const destY = (Math.random() - 0.5) * 350;

    sparkle.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${destX}px, ${destY}px) scale(0)`, opacity: 0 }
    ], { duration: 700, easing: 'ease-out' }).onfinish = () => sparkle.remove();
  }
}

function updateContent() {
  const list = vibeData[currentMode];
  let newIndex;

  // Prevent back-to-back repeats
  do {
    newIndex = Math.floor(Math.random() * list.length);
  } while (newIndex === lastIndex);

  lastIndex = newIndex;

  output.style.opacity = 0;
  setTimeout(() => {
    output.innerText = list[newIndex];
    output.style.opacity = 1;
    createSparkles();
  }, 200);
}

// Event Listeners
Object.keys(tabs).forEach(mode => {
  tabs[mode].addEventListener('click', () => {
    currentMode = mode;
    tabs.compliments.classList.toggle('active', mode === 'compliments');
    tabs.jokes.classList.toggle('active', mode === 'jokes');
    output.innerText = mode === 'compliments' ? "Ready for a boost? ✨" : "Need a laugh? 😂";
  });
});

genBtn.addEventListener('click', updateContent);