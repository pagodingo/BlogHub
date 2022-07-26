const pkMarkdown = {
    cleanBeforeRender: function(html){
       return html
       .replace(/&lt;/g, "<")
       .replace(/&gt;/g, ">")
       .replace(/&quot;/g, "")
    },
    returnMarkdownFiles: function(source){
        let files = []
        source.forEach(item => {
          if (item.name.endsWith('.md')){
            files.push(item.name)
          }})
        return files
    }
}

export default pkMarkdown