json.extract! bookshelf, :id, :name, :description
json.stories_count bookshelf.stories.count
json.url bookshelf_url(bookshelf)

