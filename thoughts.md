---
layout: default
title: Thoughts
---

## Thoughts

<ul class="posts">
  {% assign thoughts_posts = site.articles | where_exp: "item", "item.path contains '_articles/thoughts/'" | sort: "created" | reverse %}
  {% for post in thoughts_posts %}
    <li class="post">
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      <time class="publish-date" datetime="{{ post.created | date: '%F' }}">
        {{ post.created | date: "%Y/%m/%d" }}
      </time>
    </li>
  {% endfor %}
</ul>
