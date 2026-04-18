---
layout: default
title: Home
---

<div class="preface">
They tried to bury us, but they didn't realise we were seeds. 
</div>

<ul class="posts home-stream" id="post-stream"></ul>

<nav class="stream-pagination" id="stream-pagination" style="display:none" aria-label="Post navigation">
  <button class="stream-nav-btn" id="btn-prev" type="button">// &lt; prev</button>
  <span class="stream-page-info" id="page-info"></span>
  <button class="stream-nav-btn" id="btn-next" type="button">next &gt; //</button>
</nav>

<script>
(function () {
  var API_BASE = '{{ "/api/posts/" | relative_url }}';
  var currentPage = 1;
  var totalPages = null;
  var stream = document.getElementById('post-stream');
  var pagination = document.getElementById('stream-pagination');
  var btnPrev = document.getElementById('btn-prev');
  var btnNext = document.getElementById('btn-next');
  var pageInfo = document.getElementById('page-info');

  // Restore page from URL hash, e.g. #p3
  var hashMatch = window.location.hash.match(/^#p(\d+)$/);
  if (hashMatch) currentPage = parseInt(hashMatch[1], 10);

  function renderPost(post) {
    var li = document.createElement('li');
    li.className = 'post stream-entering';
    setTimeout(function () { li.classList.remove('stream-entering'); }, 500);

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

  function loadPage(page) {
    btnPrev.disabled = true;
    btnNext.disabled = true;
    pageInfo.textContent = '// loading...';

    fetch(API_BASE + page + '.json')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        // Replace content
        stream.innerHTML = '';
        data.posts.forEach(renderPost);

        totalPages = data.total_pages;
        currentPage = data.current_page;

        // Update hash without triggering scroll
        history.replaceState(null, '', currentPage === 1 ? '#' : '#p' + currentPage);

        // Update controls
        pagination.style.display = '';
        pageInfo.textContent = '// p.' + currentPage + ' of ' + totalPages;
        btnPrev.disabled = currentPage <= 1;
        btnNext.disabled = currentPage >= totalPages;

        // Scroll stream into view on page change (not on initial load)
        if (page !== 1 || hashMatch) {
          stream.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
  }

  btnPrev.addEventListener('click', function () { loadPage(currentPage - 1); });
  btnNext.addEventListener('click', function () { loadPage(currentPage + 1); });

  loadPage(currentPage);
})();
</script>
