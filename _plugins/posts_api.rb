require 'json'
require 'fileutils'
require 'cgi'

# Generates /api/posts/N.json — paginated post index files (archives excluded).
# Each file is ~13KB regardless of total article count, solving linear growth.

module PostsApiGenerator
  def self.truncate_text(value, limit)
    text = value.to_s.strip
    return '' if text.empty?

    text.length > limit ? "#{text[0, limit - 3]}..." : text
  end

  def self.plain_text_to_html(text)
    paragraphs = text.split(/\n{2,}/).map(&:strip).reject(&:empty?)
    return '' if paragraphs.empty?

    paragraphs
      .map { |paragraph| "<p>#{CGI.escapeHTML(paragraph).gsub("\n", '<br>')}</p>" }
      .join
  end

  def self.rendered_html_to_excerpt(html)
    text = html
      .gsub(%r{<br\s*/?>}i, "\n")
      .gsub(%r{</(p|div|h[1-6]|blockquote|pre|ul|ol|li)>}i, "\n")
      .gsub(%r{<(td|th)[^>]*>}i, '')
      .gsub(%r{</(td|th)>}i, ' ')
      .gsub(%r{</tr>}i, "\n")
      .gsub(%r{<[^>]+>}, '')

    CGI.unescapeHTML(text)
      .gsub(/[ \t\f\v]+/, ' ')
      .gsub(/ *\n */, "\n")
      .gsub(/\n{3,}/, "\n\n")
      .strip
  end

  def self.render_description_html(markdown_converter, value)
    text = value.to_s.strip
    return '' if text.empty?

    rendered = markdown_converter.convert(text).strip
    excerpt_text = rendered_html_to_excerpt(rendered)
    plain_text_to_html(excerpt_text)
  end

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

  markdown_converter = site.find_converter_instance(Jekyll::Converters::Markdown)

  pages = posts.each_slice(per_page).to_a
  total_pages = pages.length

  dir = File.join(site.dest, 'api', 'posts')
  FileUtils.mkdir_p(dir)

  pages.each_with_index do |batch, i|
    page_num  = i + 1
    next_page = page_num < total_pages ? page_num + 1 : nil

    data = {
      'posts' => batch.map do |doc|
        full_desc = doc.data['description'].to_s.strip
        desc = PostsApiGenerator.truncate_text(full_desc, 500)
        {
          'title'    => doc.data['title'].to_s,
          'url'      => doc.url,
          'date'     => PostsApiGenerator.format_date(doc.data['published'], '%Y/%m/%d'),
          'datetime' => PostsApiGenerator.format_date(doc.data['published'], '%F'),
          'desc'     => desc,
          'desc_html'=> PostsApiGenerator.render_description_html(markdown_converter, full_desc)
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
