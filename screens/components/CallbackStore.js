let callbackMap = {};

export const setActivityCallback = (slot, callback) => {
  callbackMap[slot] = callback;
};

export const triggerActivityCallback = (slot, activity) => {
  if (callbackMap[slot]) {
    callbackMap[slot](activity);
    delete callbackMap[slot]; // remove after calling
  }
};