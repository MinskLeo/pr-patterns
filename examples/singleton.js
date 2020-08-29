const Singleton = require('../src/singleton');
const StoreBuilder = require('../src/builder');

const singleton = new Singleton(() => {
  console.log('[LOG] Instance creation called!');
  return new StoreBuilder();
});
const currentInstance = singleton.getInstance();
console.log('Current instance: ', currentInstance);

const currentInstance2 = singleton.getInstance();
console.log('Current instance 2: ', currentInstance2);