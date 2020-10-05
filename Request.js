class Request {
  constructor() {
    this.events = {};
  }

  on(eventId, callback) {
    this.events[eventId] = callback;
  }

  emit(eventId, data) {
    if (this.events[eventId]) {
      this.events[eventId](data);
    }
  }
}

export { Request };
