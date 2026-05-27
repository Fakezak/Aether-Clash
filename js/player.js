class Player {
  constructor(name, position, isPlayer1) {
    this.name = name;
    this.position = position;
    this.health = 100;
    this.isPlayer1 = isPlayer1;
    this.model = null;
  }

  async load(modelPath) {
    const loader = new THREE.GLTFLoader();
    const gltf = await new Promise(resolve => loader.load(modelPath, resolve));
    this.model = gltf.scene;
    this.model.position.copy(this.position);
    this.model.scale.set(1.5, 1.5, 1.5);
    return this.model;
  }

  takeDamage(amount) {
    this.health = Math.max(0, this.health - amount);
    updateHealthUI(this.isPlayer1 ? 1 : 2, this.health);
  }
}
