require 'active_support/concern'

module PopularityQueryable
  extend ActiveSupport::Concern
  included do
    def popular
      @popular = find_popular
        .popular(time_frame)
        .paginate(page: page, per_page: per_page)
    end
  end
  def find_popular
    klass = params[:controller].singularize.classify.constantize
    return klass
  end

  def time_frame
    t = case params["timeframe"]
    when "hourly"
      1.hour.ago..Time.now
    when "daily"
      1.day.ago..Time.now
    when "monthly"
      1.month.ago..Time.now
    when "yearly"
      1.year.ago..Time.now
    when "all"
      -Float::INIFITY..Float::INFINITY
    else
      3.days.ago..Time.now
    end
    logger.debug("time frame is: #{t}")
    t
  end
end
