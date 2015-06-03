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

ActiveRecord::Schema.define(version: 20150603030221) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "chapters", force: :cascade do |t|
    t.text     "body"
    t.integer  "chap_num"
    t.integer  "story_id"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.string   "name"
    t.boolean  "published",  default: false, null: false
  end

  add_index "chapters", ["story_id"], name: "index_chapters_on_story_id", using: :btree

  create_table "characters", force: :cascade do |t|
    t.integer  "franchise_id"
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "characters", ["franchise_id"], name: "index_characters_on_franchise_id", using: :btree

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

  create_table "stories", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.string   "blurb"
    t.integer  "user_id"
    t.boolean  "published",   default: false, null: false
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
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["slug"], name: "index_users_on_slug", unique: true, using: :btree

  add_foreign_key "chapters", "stories"
  add_foreign_key "characters", "franchises"
  add_foreign_key "franchise_users", "franchises"
  add_foreign_key "franchise_users", "users"
  add_foreign_key "stories", "users"
  add_foreign_key "story_characters", "characters"
  add_foreign_key "story_characters", "stories"
  add_foreign_key "story_franchises", "franchises"
  add_foreign_key "story_franchises", "stories"
end
