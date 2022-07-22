### Web Archives powered by GitHub.
<a href="https://master--sparkly-mandazi-9d0d40.netlify.app/" target="_blank">Live Demo</a>
<a href="https://master--sparkly-mandazi-9d0d40.netlify.app/"><img src="./dochub-demo.png" target="_blank"/></a>

#### 1. Create or determine a <u>source repository.</u>

> Ex: [PagoDingo/notes-pega](https://github.com/pagodingo/notes-pega)

#### 2. Clone <u>this</u> repository, reference your source, and select your desired homepage.

```js
# environment

REACT_APP_GIT_USER_REPO={User}/{Repo}
REACT_APP_GIT_ARCHIVE_INDEX={index}

Ex: PagoDingo/notes-pega, pega-2-1.md
```

#### 3. Publish this project to any host provider of your choosing, and make changes to your content 💻 on-the-fly. 

#### Then, once you're finished, push it up into your digital archive.

#### Updates happen immediately if you choose to use either of the recommendations listed below:
---
Host Recommendations
- <a href="https://netlify.com" target="_blank">Netlify</a>
- <a href="https://pages.github.com" target="_blank">GitHub Pages</a>
---
Being able to access <u>multiple repositories</u> is next on my agenda. But before that can happen, there are a few kinks that need to be worked out first:

1. Embedded images are supported, external images are not.

It's a really easy problem to fix, it's a by-product of poor design. In the way that HTML is rendered from Markdown, it's a bit complicated to *cleanly* implement this. It's the first bug I want to fix, and once I've figured out a clean way of doing it, it'll be updated.

2. No support of nested folders.

Only files present in the `/root` of your repository get rendered, and anything that <u>isn't markdown</u> is also ignored. This also doesn't feel like a hard problem to fix, but, I know it will take careful consideration to get right, and there's not a reason to rush to do it just yet.