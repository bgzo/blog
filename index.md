---
layout: default
title: Home
---

<div class="preface">
They tried to bury us, but they didn't realise we were seeds. 
</div>

<ul class="posts home-stream" id="post-stream"></ul>

<div class="stream-pagination" id="stream-pagination" style="display:none">
  <button class="stream-load-btn" id="stream-load-btn" type="button"></button>
</div>

<script>
(function () {
  var BATCH = 10;
  var allPosts = null;
  var shown = 0;
  var stream = document.getElementById('post-stream');
  var pagination = document.getElementById('stream-pagination');
  var btn = document.getElementById('stream-load-btn');

  function renderPost(post) {
    var li = document.createElement('li');
    li.className = 'post stream-entering';

    var a = document.createElement('a');
    a.href = post.url;
    a.textContent = post.title;
    li.appendChild(a);

    if (post.desc) {
      var p = document.createElement('p');
      p.className = 'post-excerpt';
      p.textContent = post.desc;
      li.appendChild(p);
    }

    var time = document.createElement('time');
    time.className = 'publish-date';
    time.setAttribute('datetime', post.datetime);
    time.textContent = post.date;
    li.appendChild(time);

    stream.appendChild(li);
  }

  function showBatch() {
    if (!allPosts) return;
    var end = Math.min(shown + BATCH, allPosts.length);
    for (var i = shown; i < end; i++) {
      renderPost(allPosts[i]);
    }
    shown = end;
    var remaining = allPosts.length - shown;
    if (remaining > 0) {
      pagination.style.display = '';
      btn.textContent = '// load ' + Math.min(BATCH, remaining) + ' more  (' + remaining + ' remaining)';
    } else {
      pagination.style.display = 'none';
    }
  }

  fetch('{{ "/posts.json" | relative_url }}')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      allPosts = data;
      showBatch();
    });

  btn.addEventListener('click', showBatch);
})();
</script>
