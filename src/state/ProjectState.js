class ProjectState {
  constructor() {
    this._subscribers = [];
    this._assignedTasks = [];
    this._backlogTasks = [];
    this._usersIds = {};
    this._calendarLength = 7;
    this._startDay = undefined;
  }

  get assignedTasks() {
    return this._assignedTasks;
  }

  get backlogTasks() {
    return this._backlogTasks;
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

  addTaskToAssignedTasks(task) {
    this._assignedTasks.push(task);
  }

  assignTask({ type, taskId, executorId }) {
    const taskToBeAssigned = this._backlogTasks.find((task) => taskId === task.id);
    taskToBeAssigned.executor = executorId;

    if (type === 'byExecutor') {
      // запрос из колонки исполнителей
      this.addTaskToAssignedTasks(taskToBeAssigned);
      this._removeTaskFromBacklog(taskId);
      this._callSubscribers();
    } else {
      // запрос из календаря
    }
    console.log(this._assignedTasks);
    console.log(this._backlogTasks);
  }

  addTaskToBacklog(task) {
    this._backlogTasks.push(task);
  }

  _removeTaskFromBacklog(taskId) {
    this._backlogTasks = this._backlogTasks.filter((task) => task.id !== taskId);
  }

  mapUsersIds(users) {
    const ids = users.reduce((obj, { id }, i) => ({ ...obj, [i]: id }), {});
    this._usersIds = { ...ids };
  }

  defineStartDay() {
    const currentDate = new Date();
    this._startDay = currentDate.setDate(currentDate.getDate() + 1 - currentDate.getDay());
  }

  addSubscriber(listenerFn) {
    this._subscribers.push(listenerFn);
  }

  _callSubscribers() {
    this._subscribers.forEach((listener) => listener());
  }
}

const State = new ProjectState();

export default State;
