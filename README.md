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
Being able to access <u>multiple repositories</u> is next on the agenda. But before that can happen, there are a few **kinks that need to be worked out**:

**1. Embedded images are supported, external images are not.**

If you create a folder `/images` in your source repository's root, you can embed images just as you normally would:

```html
<img src="./images/my-image.png"><img/>
```

But, the way this works, takes not being able to support external images.

It's a really easy problem to fix. It's only a design flaw.

Due to how the HTML is produced from Markdown, it's sort of complicated to fix it in a way that makes sense. It's fixable, but to fix it the only way I know how would just be a bandaid.

**2. Folders not yet supported.**

Only files present in the `/root` of your source repository get rendered, and anything that <u>isn't markdown</u> is also ignored. This doesn't feel like a hard problem to fix either, but, I know it will take a lot of careful thought to get it right, and there's no rush to do it just yet - if it was really necessary, there is a number of ways to provide the ability of grouping files.
