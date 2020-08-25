/**
 * Store instance will be built using this class, after calling `.build()` method of StoreBuilder instance
 */
class Store {
  state = {}
  reducers = {}

  constructor(storeInstance) {
    this.state = storeInstance.state;
    this.reducers = storeInstance.reducers;
  }

  /**
   * Getter that returns this.state
   */
  get value() {
    return this.state
  }

  /**
   * Dispatch an action
   * @param {string} action.type - "key/actionName" field. Example: "drawer/open"
   * @param {*} action.payload - payload, that will be passed to actionHandler
   */
  dispatch = (action) => {
    const { type } = action;
    const [key, name] = type.split('/');
    const actionHandler = this.reducers[key][name];

    if (actionHandler) {
      const localStateCopy = JSON.parse(JSON.stringify(this.state[key]));
      actionHandler(localStateCopy, action);
      this.state[key] = localStateCopy;
    }
  }
}

/**
 * StoreBuilder class allows to create new Stores after defining reducers and actions.
 */
class StoreBuilder {
  state = {}
  reducers = []

  constructor(initialState = {}) {
    this.state = initialState;
  }

  /**
   * Creates new reducer with exact key and initialState for future store
   * @param {string} key - reducer's key
   * @param {object} initialState - initial state of this reducer
   */
  createReducer = (key, initialState = {}) => {
    this.state[key] = initialState;
    this.reducers[key] = {};
    return this;
  }

  /**
   * Assignes an actionHandler for exact reducer
   * @param {string} key - reducer's key
   * @param {string} name - action name
   * @param {Function} handler - function, that will be called on this action
   */
  createAction = (key, name, handler) => {
    this.reducers[key][name] = handler;
    return this;
  }

  /**
   * Final command, after this will be returned new instance of ready-to-use Store
   * @returns {Store}
   */
  build = () => {
    return new Store(this);
  }
}

module.exports = StoreBuilder;
