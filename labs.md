---
layout: default
title: Labs
---

## Labs

<ul class="posts">
  {% assign labs_posts = site.articles | where_exp: "item", "item.path contains '_articles/labs/'" | sort: "created" | reverse %}
  {% for post in labs_posts %}
    <li class="post">
      <a href="{{ post.url }}">{{ post.title }}</a>
      <time class="publish-date" datetime="{{ post.created | date: '%F' }}">
        {{ post.created | date: "%Y/%m/%d" }}
      </time>
    </li>
  {% endfor %}
</ul>



