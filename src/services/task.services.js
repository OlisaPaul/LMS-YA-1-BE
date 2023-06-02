const { Task } = require("../model/task.model");
const bcrypt = require("bcrypt");

class TaskService {
  //Create new task
  async createTask(task) {
    return await task.save();
  }

  async getTaskById(taskId) {
    return await Task.findOne({
      _id: taskId,
      isDeleted: undefined,
    }).populate("courseId");
  }

  async getTaskByCourseId(courseId) {
    return await Task.findOne({ courseId, isDeleted: undefined });
  }

  async getAllTasks() {
    return await Task.find({ isDeleted: undefined })
      .sort({ _id: -1 })
      .populate("courseId");
  }

  async updateTaskById(id, task) {
    return await Task.findByIdAndUpdate(
      id,
      {
        $set: task,
      },
      { new: true }
    );
  }

  async deleteTask(id) {
    return await Task.findByIdAndRemove(id);
  }

  async softDeleteTask(id) {
    const task = await Task.findById(id);

    task.isDeleted = true;

    return await task.save();
  }
}

module.exports = new TaskService();
