# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150828224546) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bookshelf_stories", force: :cascade do |t|
    t.integer  "bookshelf_id"
    t.integer  "story_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "bookshelf_stories", ["bookshelf_id"], name: "index_bookshelf_stories_on_bookshelf_id", using: :btree
  add_index "bookshelf_stories", ["story_id"], name: "index_bookshelf_stories_on_story_id", using: :btree

  create_table "bookshelves", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "bookshelves", ["user_id"], name: "index_bookshelves_on_user_id", using: :btree

  create_table "chapters", force: :cascade do |t|
    t.text     "body"
    t.integer  "chap_num"
    t.integer  "story_id"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.string   "name"
    t.boolean  "published",  default: false, null: false
    t.string   "slug"
    t.integer  "word_count"
  end

  add_index "chapters", ["slug", "story_id"], name: "index_chapters_on_slug_and_story_id", unique: true, using: :btree
  add_index "chapters", ["story_id"], name: "index_chapters_on_story_id", using: :btree

  create_table "characters", force: :cascade do |t|
    t.integer  "franchise_id"
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.string   "slug"
  end

  add_index "characters", ["franchise_id"], name: "index_characters_on_franchise_id", using: :btree
  add_index "characters", ["slug"], name: "index_characters_on_slug", unique: true, using: :btree

  create_table "comments", force: :cascade do |t|
    t.integer  "commentable_id"
    t.string   "commentable_type"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.integer  "user_id"
    t.text     "body"
  end

  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "favorite_stories", force: :cascade do |t|
    t.integer  "story_id"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "favorite_stories", ["story_id"], name: "index_favorite_stories_on_story_id", using: :btree
  add_index "favorite_stories", ["user_id"], name: "index_favorite_stories_on_user_id", using: :btree

  create_table "franchise_creation_requests", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "name"
    t.text     "description"
    t.text     "reason"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "franchise_creation_requests", ["user_id"], name: "index_franchise_creation_requests_on_user_id", using: :btree

  create_table "franchise_users", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "franchise_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "franchise_users", ["franchise_id"], name: "index_franchise_users_on_franchise_id", using: :btree
  add_index "franchise_users", ["user_id"], name: "index_franchise_users_on_user_id", using: :btree

  create_table "franchises", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "slug"
  end

  add_index "franchises", ["slug"], name: "index_franchises_on_slug", unique: true, using: :btree

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string   "slug",                      null: false
    t.integer  "sluggable_id",              null: false
    t.string   "sluggable_type", limit: 50
    t.string   "scope"
    t.datetime "created_at"
  end

  add_index "friendly_id_slugs", ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true, using: :btree
  add_index "friendly_id_slugs", ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type", using: :btree
  add_index "friendly_id_slugs", ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id", using: :btree
  add_index "friendly_id_slugs", ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type", using: :btree

  create_table "notifications", force: :cascade do |t|
    t.integer  "subject_id"
    t.string   "subject_type"
    t.integer  "user_id"
    t.integer  "event",                                  null: false
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.integer  "secondary_subject_id"
    t.string   "secondary_subject_type"
    t.boolean  "read",                   default: false, null: false
  end

  add_index "notifications", ["secondary_subject_id", "secondary_subject_type"], name: "secondary_subject_index", using: :btree
  add_index "notifications", ["subject_type", "subject_id"], name: "index_notifications_on_subject_type_and_subject_id", using: :btree
  add_index "notifications", ["user_id"], name: "index_notifications_on_user_id", using: :btree

  create_table "read_chapters", force: :cascade do |t|
    t.integer "user_id"
    t.integer "chapter_id"
  end

  add_index "read_chapters", ["chapter_id"], name: "index_read_chapters_on_chapter_id", using: :btree
  add_index "read_chapters", ["user_id"], name: "index_read_chapters_on_user_id", using: :btree

  create_table "reviews", force: :cascade do |t|
    t.integer  "story_id"
    t.integer  "user_id"
    t.text     "body"
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "reviews", ["story_id"], name: "index_reviews_on_story_id", using: :btree
  add_index "reviews", ["user_id"], name: "index_reviews_on_user_id", using: :btree

  create_table "ship_characters", force: :cascade do |t|
    t.integer  "ship_id"
    t.integer  "character_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "ship_characters", ["character_id"], name: "index_ship_characters_on_character_id", using: :btree
  add_index "ship_characters", ["ship_id"], name: "index_ship_characters_on_ship_id", using: :btree

  create_table "ships", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stories", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.string   "blurb"
    t.integer  "user_id"
    t.boolean  "published",      default: false, null: false
    t.integer  "license",        default: 0,     null: false
    t.integer  "language",       default: 0,     null: false
    t.integer  "content_rating", default: 0,     null: false
    t.boolean  "sex",            default: false, null: false
    t.boolean  "violence",       default: false, null: false
  end

  add_index "stories", ["user_id"], name: "index_stories_on_user_id", using: :btree

  create_table "story_characters", force: :cascade do |t|
    t.integer  "story_id"
    t.integer  "character_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "story_characters", ["character_id"], name: "index_story_characters_on_character_id", using: :btree
  add_index "story_characters", ["story_id"], name: "index_story_characters_on_story_id", using: :btree

  create_table "story_franchises", force: :cascade do |t|
    t.integer  "story_id"
    t.integer  "franchise_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "story_franchises", ["franchise_id"], name: "index_story_franchises_on_franchise_id", using: :btree
  add_index "story_franchises", ["story_id"], name: "index_story_franchises_on_story_id", using: :btree

  create_table "story_ships", force: :cascade do |t|
    t.integer  "story_id"
    t.integer  "ship_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "story_ships", ["ship_id"], name: "index_story_ships_on_ship_id", using: :btree
  add_index "story_ships", ["story_id"], name: "index_story_ships_on_story_id", using: :btree

  create_table "subscriptions", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "story_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "subscriptions", ["story_id"], name: "index_subscriptions_on_story_id", using: :btree
  add_index "subscriptions", ["user_id"], name: "index_subscriptions_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.integer  "level",                  default: 0,  null: false
    t.string   "slug"
    t.jsonb    "content_pref"
    t.integer  "read_words",             default: 0,  null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["slug"], name: "index_users_on_slug", unique: true, using: :btree

  add_foreign_key "bookshelf_stories", "bookshelves", on_delete: :cascade
  add_foreign_key "bookshelf_stories", "stories", on_delete: :cascade
  add_foreign_key "bookshelves", "users", on_delete: :cascade
  add_foreign_key "chapters", "stories", on_delete: :cascade
  add_foreign_key "characters", "franchises"
  add_foreign_key "comments", "users", on_delete: :cascade
  add_foreign_key "favorite_stories", "stories", on_delete: :cascade
  add_foreign_key "favorite_stories", "users", on_delete: :cascade
  add_foreign_key "franchise_creation_requests", "users", on_delete: :cascade
  add_foreign_key "franchise_users", "franchises"
  add_foreign_key "franchise_users", "users"
  add_foreign_key "notifications", "users", on_delete: :cascade
  add_foreign_key "read_chapters", "chapters", on_delete: :cascade
  add_foreign_key "read_chapters", "users", on_delete: :cascade
  add_foreign_key "reviews", "stories", on_delete: :cascade
  add_foreign_key "reviews", "users", on_delete: :cascade
  add_foreign_key "ship_characters", "characters", on_delete: :cascade
  add_foreign_key "ship_characters", "ships", on_delete: :cascade
  add_foreign_key "stories", "users"
  add_foreign_key "story_characters", "characters"
  add_foreign_key "story_characters", "stories", on_delete: :cascade
  add_foreign_key "story_franchises", "franchises"
  add_foreign_key "story_franchises", "stories", on_delete: :cascade
  add_foreign_key "story_ships", "ships", on_delete: :cascade
  add_foreign_key "story_ships", "stories", on_delete: :cascade
end
