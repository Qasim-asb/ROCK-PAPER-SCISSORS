export const triggerCelebration = () => {
  const gameContainer = document.querySelector("main");

  const flash = document.createElement("div");
  flash.className = "winner-flash";
  gameContainer.append(flash);

  flash.addEventListener("animationend", () => {
    flash.remove();
  });

  const colors = ["#f00", "#0f0", "#00f", "#ff0", "#f0f", "#0ff"];
  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = Math.random() + "rem";
      confetti.style.height = Math.random() + "rem";
      gameContainer.append(confetti);

      confetti.addEventListener("animationend", () => {
        confetti.remove();
      });
    }, i * 20);
  }
};