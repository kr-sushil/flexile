# frozen_string_literal: true

require "administrate/base_dashboard"

class CompanyRoleDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    id: Field::Number,
    actively_hiring: Field::Boolean,
    capitalized_expense: Field::Number,
    company: Field::BelongsTo,
    rate: Field::HasOne,
    trial_enabled: Field::Boolean,
    company_workers: Field::HasMany,
    deleted_at: Field::DateTime,
    job_description: Field::Text,
    name: Field::String,
    slug: Field::String,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = %i[
    id
    name
    actively_hiring
    capitalized_expense
    company
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = %i[
    id
    actively_hiring
    capitalized_expense
    company
    rate
    trial_enabled
    company_workers
    deleted_at
    job_description
    name
    slug
    created_at
    updated_at
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = %i[
    actively_hiring
    capitalized_expense
    company
    rate
    trial_enabled
    company_workers
    deleted_at
    job_description
    name
    slug
  ].freeze

  # COLLECTION_FILTERS
  # a hash that defines filters that can be used while searching via the search
  # field of the dashboard.
  #
  # For example to add an option to search for open resources by typing "open:"
  # in the search field:
  #
  #   COLLECTION_FILTERS = {
  #     open: ->(resources) { resources.where(open: true) }
  #   }.freeze
  COLLECTION_FILTERS = {}.freeze

  # Overwrite this method to customize how company roles are displayed
  # across all pages of the admin dashboard.
  #
  # def display_resource(company_role)
  #   "CompanyRole ##{company_role.id}"
  # end
end
