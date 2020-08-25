const Factory = require('../src/factory');

// Creating factory instance
const factory = new Factory();

// Creating STORE entity
const store = factory.create(Factory.ENTITIES_TYPES.STORE, {
  initialState: {},
});

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

// Attach REDUCER and ACTION to STORE
store.attachReducer('drawer', drawerReducer);
store.attachAction('drawer', 'open', drawerOpenAction);

// Dispatch new action
store.dispatch({ type: 'drawer/open' });