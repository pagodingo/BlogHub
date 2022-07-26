const pkMarkdown = {
    cleanBeforeRender: cleanBeforeRender,
    returnMarkdownFiles: returnMarkdownFiles
}

function returnMarkdownFiles(source){
  let files = []
  source.forEach(item => {
    if (item.name.endsWith('.md')){
      files.push(item.name)
    }})
  return files
}

function cleanBeforeRender(html){
  return html
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">")
  .replace(/&quot;/g, "")
}

export default pkMarkdown