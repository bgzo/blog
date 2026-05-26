---
layout: default
title: Stories
---

<div class="preface">
Those things might be not real, but it it.
</div>

{% assign stories_posts = site.articles | where_exp: "item", "item.path contains '_articles/stories/'" | sort: "created" | reverse %}
{% assign current_year = "" %}
{% for post in stories_posts %}
  {% assign post_year = post.created | date: "%Y" %}
  {% if post_year != current_year %}
    {% unless forloop.first %}</ul></div>{% endunless %}
    {% assign current_year = post_year %}
<div class="posts-year-group" data-year="{{ current_year }}"><ul class="posts">
  {% endif %}
  <li class="post">
    <a class="post-title" href="{{ post.url | relative_url }}">{{ post.title }}</a>
    {% assign post_desc = post.description | to_s | strip %}
    {% if post_desc != "" %}
    <div class="post-excerpt">{{ post_desc | truncate: 500, "..." | escape | newline_to_br }}</div>
    {% endif %}
    <time class="publish-date" datetime="{{ post.created | date: '%F' }}">
      {{ post.created | date: "%Y/%m/%d" }}
    </time>
  </li>
{% endfor %}
{% if labs_posts.size > 0 %}</ul></div>{% endif %}



