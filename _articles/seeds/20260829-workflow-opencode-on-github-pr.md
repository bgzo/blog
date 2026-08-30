---
title: OpenCode 集成 GitHub PR 的现状
aliases: OpenCode 集成 GitHub PR 的现状
created: 2026-08-29 17:04:24
modified: 2026-08-30 21:18:34
tags: ['github', 'opencode', 'public', 'pullrequest', 'writing/seed']
comments: True
draft: False
published: 2026-08-30 21:20:43
description: 当前 OpenCode 不支持 inline comment，最近才把 OIDC 的问题 修好了，其实使用体验上肯定不如付费工具，比如： 1. https//www.coderabbit.ai/pricing 2. https//www.qodo.ai/pricing 官方配置 官方给了最基础的用法，如下： 这个默认的配置有几个问题： 1. 随便来一个人，评论携带 /oc 都会触发 action；...
---

当前 OpenCode 不支持 inline comment，最近才把 [OIDC 的问题](https://github.com/anomalyco/opencode/issues/39441#event-29940690414) 修好了，其实使用体验上肯定不如付费工具，比如：

1. https://www.coderabbit.ai/pricing
2. https://www.qodo.ai/pricing

## 官方配置

官方给了最基础的用法，如下：

```yaml
name: opencode

on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]

jobs:
  opencode:
    if: |
      contains(github.event.comment.body, '/oc') ||
      contains(github.event.comment.body, '/opencode')
    runs-on: ubuntu-latest
    permissions:
      id-token: write
    steps:
       - name: Checkout repository
         uses: actions/checkout@v6
         with:
           fetch-depth: 1
           persist-credentials: false

       - name: Run OpenCode
        uses: anomalyco/opencode/github@latest
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        with:
          model: anthropic/claude-sonnet-4-20250514
          # share: true
          # github_token: xxxx
```

这个默认的配置有几个问题：

1. 随便来一个人，评论携带 `/oc` 都会触发 action；
2. 缺少权限管控，如果有需要用户确认的操作，那么 action 就会挂起；
3. PR 提出后，需要手动添加一条评论才能触发审核；
4. PR Review 不收敛；

当然，官方已经提供了 [PR 的用例](https://opencode.ai/docs/github/#pull-request-%E7%A4%BA%E4%BE%8B)，稍加改造，直接转用这个模板即可：

```yaml
name: opencode-review

on:
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]

jobs:
  review:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
      pull-requests: read
      issues: read
    steps:
      - uses: actions/checkout@v6
        with:
          persist-credentials: false
      - uses: anomalyco/opencode/github@latest
        env:
          OPENCODE_API_KEY: ${{ secrets.OPENCODE_API_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          model: opencode-go/glm-5.3-flash
          use_github_token: false
```

这样，我们就可以解决问题 3。

## 权限管控

如果仓库只有自己在使用 PR review，那么我们直接可以指定创建人=自己即可，硬编码也没有关系

```yaml
if: github.event.pull_request.user.login == 'bgzo'
```

如果项目够大，一定有贡献者也需要这个东西，但是 github action 没有拿贡献者的比较好的方式，可以尝试使用 API 数据获得过去贡献过的仓库人的用户名，相当于给这一部分人开白名单：

```yaml
  - name: Check commenter permission
	env:
	  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
	  COMMENT_USER: ${{ github.event.comment.user.login }}
	  REPO: ${{ github.repository }}
	run: |
	  http_code=$(curl -s -o /tmp/perm.json -w "%{http_code}" \
		-H "Authorization: Bearer $GITHUB_TOKEN" \
		-H "Accept: application/vnd.github+json" \
		"https://api.github.com/repos/$REPO/collaborators/$COMMENT_USER/permission")
	  if [ "$http_code" != "200" ]; then
		echo "::error::User $COMMENT_USER is not a collaborator or permission check failed ($http_code)"
		exit 1
	  fi
	  perm=$(python3 -c "import json;print(json.load(open('/tmp/perm.json')).get('permission',''))")
	  echo "Permission of $COMMENT_USER: $perm"
	  case "$perm" in
		admin|write)
		  echo "Access granted"
		  ;;
		*)
		  echo "::error::User $COMMENT_USER has insufficient permission: $perm"
		  exit 1
		  ;;
	  esac
```

这样问题 1 也解决了。

## Action 挂起

问题不是空穴来风，有一次睡午觉前触发了一次审查，但是睡起来后，发现 action 还在跑，看了下日志卡在 ask 那里迟迟过不去：

```shell
2026-08-23T07:56:52.6222151Z [91m[1m| [0m[90m Shell    [0m{"command":"git worktree add /tmp/pr-1-checkout pr-1 2>&1 | tail -3","workdir":"/home/runner/work/export-all-to-obsidian/export-all-to-obsidian"}
2026-08-23T07:56:52.6223088Z
2026-08-23T07:56:52.6371387Z [07:56:52.636] INFO (#8283): tracking {
2026-08-23T07:56:52.6371794Z   hash: "ffc4c6cbaeebadd555975de9344661f09ca2f699",
2026-08-23T07:56:52.6372251Z   cwd: "/home/runner/work/export-all-to-obsidian/export-all-to-obsidian",
2026-08-23T07:56:52.6372987Z   git: "/home/runner/.local/share/opencode/snapshot/d5797669ba38b8b1434dd18e8b060582768548f9/e29a7a6e1097625d2321fd2b6f4916ad47a97142",
2026-08-23T07:56:52.6373612Z }
2026-08-23T07:56:52.6546424Z [07:56:52.654] INFO (#8283): loop {
2026-08-23T07:56:52.6546833Z   "session.id": "ses_fd2612067ffeyjD7OlyAsUszoZ",
2026-08-23T07:56:52.6547149Z   step: 13,
2026-08-23T07:56:52.6547343Z }
2026-08-23T07:56:52.6746819Z [07:56:52.674] INFO (#8283): tracking {
2026-08-23T07:56:52.6747409Z   hash: "ffc4c6cbaeebadd555975de9344661f09ca2f699",
2026-08-23T07:56:52.6748178Z   cwd: "/home/runner/work/export-all-to-obsidian/export-all-to-obsidian",
2026-08-23T07:56:52.6749269Z   git: "/home/runner/.local/share/opencode/snapshot/d5797669ba38b8b1434dd18e8b060582768548f9/e29a7a6e1097625d2321fd2b6f4916ad47a97142",
2026-08-23T07:56:52.6749947Z }
2026-08-23T07:56:52.6775740Z [07:56:52.677] INFO (#8283): process {
2026-08-23T07:56:52.6776399Z   "session.id": "ses_fd2612067ffeyjD7OlyAsUszoZ",
2026-08-23T07:56:52.6777105Z   messageID: "msg_02d9f5830001PwXHnn57XY9lEu",
2026-08-23T07:56:52.6777718Z }
2026-08-23T07:56:52.6779912Z [07:56:52.677] INFO (#8283): stream {
2026-08-23T07:56:52.6780396Z   providerID: "opencode-go",
2026-08-23T07:56:52.6780851Z   modelID: "glm-5.2",
2026-08-23T07:56:52.6781295Z   "session.id": "ses_fd2612067ffeyjD7OlyAsUszoZ",
2026-08-23T07:56:52.6781794Z   small: "false",
2026-08-23T07:56:52.6782146Z   agent: "build",
2026-08-23T07:56:52.6782486Z   mode: "primary",
2026-08-23T07:56:52.6782831Z }
2026-08-23T07:56:52.6789180Z [07:56:52.678] INFO (#8283): llm runtime selected {
2026-08-23T07:56:52.6789862Z   "llm.runtime": "ai-sdk",
2026-08-23T07:56:52.6790285Z   "llm.provider": "opencode-go",
2026-08-23T07:56:52.6790720Z   "llm.model": "glm-5.2",
2026-08-23T07:56:52.6790961Z }
2026-08-23T07:56:55.0494718Z [07:56:55.049] INFO (#9661): evaluated {
2026-08-23T07:56:55.0495263Z   permission: "external_directory",
2026-08-23T07:56:55.0495754Z   pattern: "/tmp/pr-1-checkout/*",
2026-08-23T07:56:55.0496196Z   action: {
2026-08-23T07:56:55.0496603Z     permission: "external_directory",
2026-08-23T07:56:55.0497167Z     pattern: "*",
2026-08-23T07:56:55.0497593Z     action: "ask",
2026-08-23T07:56:55.0498277Z   },
2026-08-23T07:56:55.0498656Z }
2026-08-23T07:56:55.0499061Z [07:56:55.049] INFO (#9661): asking {
2026-08-23T07:56:55.0499628Z   id: "per_02d9f6189001LyZ4ibXoNgKmXo",
2026-08-23T07:56:55.0500070Z   permission: "external_directory",
2026-08-23T07:56:55.0500431Z   patterns: [ "/tmp/pr-1-checkout/*" ],
2026-08-23T07:56:55.0500752Z }
```

我怎么可能向正在后台运行的 CI 进行确认操作呢？所以需要对权限进行放行，因为只做代码审核，上面也已经收束了 content 的 write 的权限，因此，这里可以简单一点：

```yaml
  - name: Configure opencode CI permissions (deny rm)
	run: |
	  mkdir -p "$HOME/.config/opencode"
	  cat > "$HOME/.config/opencode/opencode.json" <<'EOF'
	  {
		"permission": {
		  "bash": {
			"rm *": "deny",
			"rmdir *": "deny",
			"shred *": "deny",
			"truncate *": "deny"
		  }
		}
	  }
	  EOF
```

到这里问题 2 也解决了。

## 审核结果收敛

我在做一个 Feature 的时候，连住提了三个 PR ，但是最终效果都不理想，因为每一个 PR 审核久了，上下文就膨胀了，结果就是：根本看不出来新的问题，如果单开一个新的 PR，那么新的问题还是会冒出来：

- https://github.com/bgzolab/export-all-to-obsidian/pull/3
- https://github.com/bgzolab/export-all-to-obsidian/pull/4
- https://github.com/bgzolab/export-all-to-obsidian/pull/5
- https://github.com/bgzolab/export-all-to-obsidian/pull/6

synchronize 不会解决上下文膨胀的问题

> Leave the following comment on a GitHub issue. `opencode` will read the entire thread, including all comments, and reply with a clear explanation.
> https://github.com/anomalyco/opencode/blob/dev/github/README.md

比如下面两个 session，其实还是有包含 Thread 所有上下文的：

1. http://opncd.ai/share/EW1h4wpN
2. http://opncd.ai/share/HZMNr0v1

```html
<pull_request>
Number: 6
URL: https://github.com/bgzolab/export-all-to-obsidian/pull/6
Title: refactor(cookie): use cookies.txt instead of independent cookie
Body: follow up #3 #4 #5
Author: bgzo
Created At: 2026-08-30T08:34:19Z
Base Branch: main
Head Branch: feature/enhance-env-import
State: OPEN
Additions: 1203
Deletions: 261
Total Commits: 71
Changed Files: 29 files
<pull_request_comments>
xxx
</pull_request_comments>
```

没有什么好的办法，现在 OC 对 GitHub 的集成还在早期阶段，很多东西，比如 inline 也迟迟得不到支持。我的一个疑点就是，如果有 inline comment 之后，之后的 review 是不是就可以抛弃之前的 context，因为如果真的不包含任何 pull request comments 也不好，每一次重新 review 都是不一样的问题，这样一点也不集中，也不是一个好的实现方式。

现在用过最好的还是 GitHub Copilot，但是它太贵了，还有一些是 [手搓的](https://github.com/Barmore-Genc/opencode-pr-reviewer) workflow，可以参考，但不太建议。只能说目前 OpenCode 对这方面的支持还是不太好，只能凑合用。

## 你可能会遇到的其他问题

另一个非常诡异的问题，就是每一个 Comment 最后都会追加一个样板

```shell
<a href="https://opencode.ai/s/ZIge321L"><img width="200" alt="New%20session%20-%202026-08-30T03%3A39%3A04.772Z" src="https://social-cards.sst.dev/opencode-share/TmV3IHNlc3Npb24gLSAyMDI2LTA4LTMwVDAzOjM5OjA0Ljc3Mlo=.png?model=opencode-go/glm-5.2&version=1.18.25&id=ZIge321L" /></a>
[opencode session](https://opencode.ai/s/ZIge321L)&nbsp;&nbsp;|&nbsp;&nbsp;[github run](/bgzolab/export-all-to-obsidian/actions/runs/33290736536)
```

然后，这个 session 链接其实是坏的，正确的前缀 URL 应该是 http://opncd.ai/share/xxx ，比如你看这两个链接：

- 错误 https://opencode.ai/s/ZIge321L
- 正确 http://opncd.ai/share/ZIge321L

已经有 ISSUE 和 PR 跟踪它了，只是一直没有进展：

- https://github.com/anomalyco/opencode/issues/26417
- https://github.com/anomalyco/opencode/pull/26437

## 最后说说为什么 Vibe Coding 需要 PR

留痕是最大原因，LLM 编程最不缺的就是无限试错的成本，但输出的一切内容就像空中楼阁，没有第三方的评审，考量，而 PR Review 是一个绝对无可替代环节，把一段时间的成果压缩，提炼，合并进主分支。这个过程应该被高度重视。

我们当然可以本地做这些事情，跑一个循环代理，一直轮训去迭代 Code，但是迭代的过程会丢掉，未来不好追溯，更不好维护，如果放到 Git History 里面，也不太合适。最终还是需要 GitHub 这样的基础设施存放这些「中间」内容，也许真的是 Slop，GitHub 有一天会作出清算。

所以 GitHub 最近一年总是宕机，我们也不能怪罪他，因为我一直是免费用户，希望清算的那一天晚一点到来。