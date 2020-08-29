const StoreBuilder = require('../src/builder');

// Creating store builder (initialState can be passed. Default: {})
const storeBuilder = new StoreBuilder();

// Creating Store instance
// Reducers default state: {}
const myStore = storeBuilder
  .createReducer('drawer', { isOpened: false })
  .createReducer('posts', { items: [] })
  .createAction('drawer', 'open', (drawerState) => { drawerState.isOpened = true })
  .createAction('drawer', 'close', (drawerState) => { drawerState.isOpened = false })
  .createAction('posts', 'setItems', (postsState, { payload }) => { postsState.items = payload })
  .build();

console.log('Created store state: ', myStore.value);

// Dispatching action
myStore.dispatch({ type: 'drawer/open' });
console.log('Store state after dispatch OPEN: ', myStore.value);

myStore.dispatch({ type: 'drawer/close' });
console.log('Store state after dispatch CLOSE: ', myStore.value);

/*
  NOTE:
  This is not fully reducers as it named reducers.
  Reducers is basically a function that takes initial state and afer taking actions
  calls action handler and returns new (or previous state).
  This implementation only uses names.

  Here createReducer(key, initialState) is just method for creating slot in this.state object
  Reducers role was moved to actions.

  There is a little bottleneck of such implementation:
  Diffent "reducers" can't handle other "reducers" actions.
  So 'drawer' reducer will handle only 'drawer/{actionName}' actions

  There is also no any error handlers.

  Just exmaple implementation of builder pattern.
*/