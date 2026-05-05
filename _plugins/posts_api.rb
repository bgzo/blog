require 'json'
require 'fileutils'

# Generates /api/posts/N.json — paginated post index files (archives excluded).
# Each file is ~13KB regardless of total article count, solving linear growth.

module PostsApiGenerator
  def self.format_date(val, fmt)
    return '' unless val
    val.respond_to?(:strftime) ? val.strftime(fmt) : val.to_s
  end
end

Jekyll::Hooks.register :site, :post_write do |site|
  # Copy favicon.ico to the root directory
  source_favicon = File.join(site.source, 'assets', 'favicons', 'favicon.ico')
  target_favicon = File.join(site.dest, 'favicon.ico')

  if File.exist?(source_favicon)
    FileUtils.cp(source_favicon, target_favicon)
    Jekyll.logger.info 'Favicon:', 'Copied /assets/favicons/favicon.ico -> /favicon.ico'
  else
    Jekyll.logger.warn 'Favicon:', "Source file not found: #{source_favicon}"
  end

  # Generate paginated posts API
  per_page = 5

  all_docs = site.collections['articles']&.docs
  next unless all_docs

  posts = all_docs
    .reject { |doc| doc.data['archive'] }
    .sort_by { |doc| doc.data['published'].to_s }
    .reverse

  pages = posts.each_slice(per_page).to_a
  total_pages = pages.length

  dir = File.join(site.dest, 'api', 'posts')
  FileUtils.mkdir_p(dir)

  pages.each_with_index do |batch, i|
    page_num  = i + 1
    next_page = page_num < total_pages ? page_num + 1 : nil

    data = {
      'posts' => batch.map do |doc|
        desc = (doc.data['description'] || '').to_s
        desc = desc.length > 200 ? "#{desc[0, 197]}..." : desc
        {
          'title'    => doc.data['title'].to_s,
          'url'      => doc.url,
          'date'     => PostsApiGenerator.format_date(doc.data['published'], '%Y/%m/%d'),
          'datetime' => PostsApiGenerator.format_date(doc.data['published'], '%F'),
          'desc'     => desc
        }
      end,
      'total_pages'  => total_pages,
      'current_page' => page_num,
      'next_page'    => next_page
    }

    File.write(File.join(dir, "#{page_num}.json"), JSON.generate(data))
  end

  Jekyll.logger.info 'Posts API:', "Generated #{total_pages} page(s) → /api/posts/{1..#{total_pages}}.json"
end
