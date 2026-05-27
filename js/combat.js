function updateHealthUI(playerNum, health) {
  const element = document.getElementById(`p${playerNum}-hp`);
  if (element) element.textContent = Math.round(health);
}
