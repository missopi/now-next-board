const activityCallbacks = {};

export function setActivityCallback(slot, callback) {
  console.log('[CallbackStore] Setting new callback for slot:', slot);
  activityCallbacks[slot] = callback;
}

export function triggerActivityCallback(slot, activity) {
  if (activityCallbacks[slot]) {
    activityCallbacks[slot](activity);
    delete activityCallbacks[slot]; // clear after use
  } else {
    console.warn('no callback registered for slot', slot);
  }
};