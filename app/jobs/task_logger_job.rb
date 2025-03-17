# frozen_string_literal: true

class TaskLoggerJob
  include Sidekiq::Job

  def perform(task_id)
    task = Task.find(task_id)
    task_owner = User.find(task.task_owner_id)

    if task.task_owner_id == task.assigned_user_id
      message = "A task titled '#{task.title}' was created and self-assigned to #{task_owner.name}."
    else
      assigned_user = User.find(task.assigned_user_id)
      message = "A task titled '#{task.title}' was created by #{task_owner.name} and is assigned to #{assigned_user.name}."
    end

    log = Log.create!(task_id: task.id, message:)
    puts log
  end
end
