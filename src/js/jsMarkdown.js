function Markdown() {};

Markdown.prototype.returnMarkdownFiles = (source) => {
  let files = []
  source.forEach(item => {
    if (item.name.endsWith('.md')){
      files.push(`${item.name}`)
    } else if (item.type === "dir") {
      if (item.name !== "images"){
        files.push(`📚 ${item.name}`)
      }
  }})
  return files
}

Markdown.prototype.cleanBeforeRender = (html) => {
  return html
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">")
  .replace(/&quot;/g, "")
}

export default Markdown