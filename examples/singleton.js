const Singleton = require('../src/singleton');
const StoreBuilder = require('../src/builder');

const singleton = new Singleton(() => new StoreBuilder());
const currentInstance = singleton.getInstance();