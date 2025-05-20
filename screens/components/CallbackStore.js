const activityCallbacks = {};

export function setActivityCallback(slot, callback) {
  const slotKey = typeof slot === 'string' ? slot : slot?.slot;
  console.log('[CallbackStore] Setting new callback for slot:', slotKey);
  activityCallbacks[slotKey] = callback;
}

export function triggerActivityCallback(slot, activity) {
  const slotKey = typeof slot === 'string' ? slot : slot?.slot;
  if (activityCallbacks[slotKey]) {
    activityCallbacks[slotKey](activity);
    delete activityCallbacks[slotKey]; // clear after use
  } else {
    console.warn('no callback registered for slot', slotKey);
  }
};