const storage = {
  set(key, item) {
    
    window.localStorage.setItem(key, JSON.stringify(item))

    return true
  },
  get(key) {
    const item = window.localStorage.getItem(key)
    if (!item) {
      return null;
    }

    return JSON.parse(item)
  }
}

export default storage;
