object @email
attributes :id, :subject, :message, :short_url, :created_at
child(:legislator) { attributes :id, :name }