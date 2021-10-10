import { ASSIGN_BY_DATE } from './types';
import { refineToNumericYYMMDD } from '../utils/handle-dates';

class ProjectState {
  constructor() {
    this._subscribers = [];
    this._assignedTasks = [];
    this._backlogTasks = [];
    this._usersIds = {};
    this._calendarLength = 7;
    this._currentDate = new Date();
    this._currentDateNumeric = refineToNumericYYMMDD(new Date());
    this._startDay = this._updateAndSetDates();
  }

  _removeTaskFromBacklog(taskId) {
    this._backlogTasks = this._backlogTasks.filter((task) => task.id !== taskId);
  }

  _callSubscribers() {
    this._subscribers.forEach((listener) => listener());
  }

  _updateAndSetDates() {
    const startDate = new Date(this._currentDate.setHours(0, 0, 0, 0));

    return startDate.setDate(
      startDate.getDate() - startDate.getDay() + (startDate.getDay() === 0 ? -6 : 1)
    );
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

  get currentDateNumeric() {
    return this._currentDateNumeric;
  }

  addTaskToAssignedTasks(task) {
    this._assignedTasks.push(task);
  }

  assignTask({ type, taskId, executorId, startDate }) {
    const taskToBeAssigned = this._backlogTasks.find((task) => taskId === task.id);
    taskToBeAssigned.executor = +executorId;

    // запрос из календаря
    if (type === ASSIGN_BY_DATE) {
      if (this._currentDate > Date.parse(startDate)) {
        return;
      }

      if (taskToBeAssigned.planEndDate === taskToBeAssigned.planStartDate) {
        taskToBeAssigned.planEndDate = startDate;
      } else {
        const dateDifference =
          Date.parse(taskToBeAssigned.planEndDate) - Date.parse(taskToBeAssigned.planStartDate);
        const newEndDate = Date.parse(startDate) + dateDifference;
        taskToBeAssigned.planEndDate = refineToNumericYYMMDD(newEndDate);
      }
      taskToBeAssigned.planStartDate = startDate;
    }
    this.addTaskToAssignedTasks(taskToBeAssigned);
    this._removeTaskFromBacklog(taskId);
    this._callSubscribers();
  }

  addTaskToBacklog(task) {
    this._backlogTasks.push(task);
  }

  mapUsersIds(users) {
    const ids = users.reduce((obj, { id }, i) => ({ ...obj, [i]: id }), {});
    this._usersIds = { ...ids };
  }

  addSubscriber(listenerFn) {
    this._subscribers.push(listenerFn);
  }
}

const State = new ProjectState();

export default State;
