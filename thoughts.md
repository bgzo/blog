---
layout: default
title: Thoughts
---

## Thoughts

{% assign thoughts_posts = site.articles | where_exp: "item", "item.path contains '_articles/thoughts/'" | sort: "created" | reverse %}
{% assign current_year = "" %}
{% for post in thoughts_posts %}
  {% assign post_year = post.created | date: "%Y" %}
  {% if post_year != current_year %}
    {% unless forloop.first %}</ul></div>{% endunless %}
    {% assign current_year = post_year %}
<div class="posts-year-group" data-year="{{ current_year }}"><ul class="posts">
  {% endif %}
  <li class="post">
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <time class="publish-date" datetime="{{ post.created | date: '%F' }}">
      {{ post.created | date: "%Y/%m/%d" }}
    </time>
  </li>
{% endfor %}
{% if thoughts_posts.size > 0 %}</ul></div>{% endif %}
