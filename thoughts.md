---
layout: default
title: Thoughts
---

<div class="preface">
45公斤水，3公斤碳水化合物，7公斤脂肪，12公斤蛋白质，639块肌肉，97隆克孤独和一些思想将长眠于此。
</div>

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
{% if thoughts_posts.size > 0 %}</ul></div>{% endif %}
