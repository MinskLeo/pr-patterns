/**
 * Store instance
 */
class Store {
  state = {}
  reducers = {}

  constructor(options) {
    const { initialState = {} } = options;
    this.state = initialState;
  }

  get value() {
    return this.state;
  }

  attachReducer = (key, reducer) => {
    this.reducers[key] = reducer;
  }

  attachAction = (key, name, actionHandler) => {
    const reducer = this.reducers[key];
    // console.log('REDUCER: ', reducer);

    if (reducer) {
      this.reducers[key].attachAction(name, actionHandler);
    }
  }

  dispatch = (action) => {
    const { type, payload } = action;
    const [key, name] = type.split('/');
    const reducer = this.reducers[key];

    if (reducer) {
      const res = reducer.value(this.state[key], { name, payload });
      this.state[key] = res;
    }
  }
}

/**
 * Handles all necessary logics for working with reducer. Handles inside his actions
 */
class Reducer {
  key = null
  actions = {}

  constructor(options = {}) {
    const { key, initialState } = options;
    this.key = key;
    this.initialState = initialState;
  }

  get value() {
    return (state = this.initialState, action) => {
      const { name, payload } = action;
      const actionHandler = this.actions[name];

      if (actionHandler && actionHandler.value) {
        const stateCopy = JSON.parse(JSON.stringify(state));
        actionHandler.value(stateCopy, payload);
        return stateCopy;
      }

      return state;
    }
  }

  attachAction = (name, actionHandler) => {
    this.actions[name] = actionHandler;
  }
}

/**
 * Represents an ActionHandler for Reducer
 */
class Action {
  constructor(options = {}) {
    const { actionHandler } = options;
    this.actionHandler = actionHandler;
  }

  get value() {
    return this.actionHandler;
  }
}

/**
 * Factory gives possibility to create 3 types of entitites: STORE, REDUCER, ACTION
 */
class Factory {
  static ENTITIES_TYPES = {
    STORE: 'STORE',
    REDUCER: 'REDUCER',
    ACTION: 'ACTION',
  }

  static ENTITIES = {
    STORE: Store,
    REDUCER: Reducer,
    ACTION: Action,
  }

  create = (type, options = {}) => {
    const Entity = Factory.ENTITIES[type];

    if (!Entity) {
      throw new Error('Entity type not supported ot undefined');
    }

    const instance = new Entity(options);

    return instance;
  }
}

module.exports = Factory;
