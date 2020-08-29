const Factory = require('../src/factory');

// Creating factory instance
const factory = new Factory();

// Creating STORE entity
const store = factory.create(Factory.ENTITIES_TYPES.STORE, {
  initialState: {},
});
console.log('Created store state: ', store.value);

// Creating REDUCER entity
const drawerReducer = factory.create(Factory.ENTITIES_TYPES.REDUCER, {
  key: 'drawer',
  initialState: {
    isOpened: false,
  },
});

// Creating ACTION entity
const drawerOpenAction = factory.create(Factory.ENTITIES_TYPES.ACTION, {
  actionHandler: (drawerState) => {
    drawerState.isOpened = true;
  },
});
const drawerCloseAction = factory.create(Factory.ENTITIES_TYPES.ACTION, {
  actionHandler: (drawerState) => {
    drawerState.isOpened = false;
  },
});

// Attach REDUCER and ACTION to STORE
store.attachReducer('drawer', drawerReducer);
store.attachAction('drawer', 'open', drawerOpenAction);
store.attachAction('drawer', 'close', drawerCloseAction);

// Dispatch new action
store.dispatch({ type: 'drawer/open' });
console.log('Store state after dispatch OPEN: ', store.value);

store.dispatch({ type: 'drawer/close' });
console.log('Store state after dispatch CLOSE: ', store.value);