class Singleton {
  instance = null
  instanceCreator = () => {}

  constructor(instanceCreator) {
    this.instanceCreator = instanceCreator;
  }

  createInstance = () => {
    this.instance = this.instanceCreator();
  }

  getInstance = () => {
    if (!this.instance) {
      this.createInstance();
    }

    return this.instance;
  }
}

module.exports = Singleton;
