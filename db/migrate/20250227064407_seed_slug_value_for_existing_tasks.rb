# frozen_string_literal: true

class SeedSlugValueForExistingTasks < ActiveRecord::Migration[7.1]
  def up
    Task.find_each(batch_size: 50) do |task|
      task.send(:set_slug)
      task.save!(validate: false)
    end
  end

  def down
    Task.find_each(batch_size: 50) do |task|
      task.slug = nil
      task.save!(validate: false)
    end
  end
end
