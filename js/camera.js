function updateCamera() {
  if (!player1 || !player2 || !player1.model || !player2.model) return;

  const midX = (player1.model.position.x + player2.model.position.x) / 2;
  const distance = Math.abs(player1.model.position.x - player2.model.position.x);

  camera.position.x = midX;
  camera.position.z = Math.max(12, distance * 1.8 + 8);
  camera.position.y = 7;
  camera.lookAt(midX, 3, 0);
}
