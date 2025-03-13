# frozen_string_literal: true

module ParallelizationEnabler
  def self.included(base)
    base.class_eval do
      parallelize(workers: :number_of_processors)
    end
  end
end
