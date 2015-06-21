class StaticStuffController < ApplicationController
  def about
    ##
    # Counts for stories, chapters, franchises, and characters.
    # Counts for stories and chapters only include published content.
    # Franchises and characters include all content, as they default to published.
    @story_count = Story.for_display.count
    @chapter_count = Chapter.published.count
    @franchise_count = Franchise.count
    @character_count = Character.count
  end
end
