class BoardState {
  constructor() {
    this._assignedTasks = [];
    this._usersIds = {};
    this._calendarLength = 7;
    this._startDay = undefined;
  }

  // синглетон
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new BoardState();
    return this.instance;
  }

  get assignedTasks() {
    return this._assignedTasks;
  }

  get usersIds() {
    return this._usersIds;
  }

  set calendarLength(value) {
    this._calendarLength = value;
  }

  get calendarLength() {
    return this._calendarLength;
  }

  get startDay() {
    return this._startDay;
  }

  set startDay(value) {
    this._startDay = value;
  }

  assignTask(task) {
    this._assignedTasks.push(task);
  }

  mapUsersIds(users) {
    const ids = users.reduce((obj, { id }, i) => ({ ...obj, [i]: id }), {});
    this._usersIds = { ...ids };
  }

  defineStartDay() {
    const currentDate = new Date();
    this._startDay = currentDate.setDate(currentDate.getDate() + 1 - currentDate.getDay());
  }
}

export default BoardState;
