---
layout: default
title: Home
---

## Recently

<ul class="posts">
  {% assign all_posts = site.articles %}
  {% assign all_posts = all_posts | sort: "created" | reverse %}
  {% for post in all_posts limit:6 %}
    <li class="post">
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      <time class="publish-date" datetime="{{ post.created | date: '%F' }}">
        {{ post.created | date: "%Y/%m/%d" }}
      </time>
    </li>
  {% endfor %}
</ul>
