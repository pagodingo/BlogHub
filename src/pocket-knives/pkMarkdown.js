const pkMarkdown = {
    cleanBeforeRender: function(html){
       return html
       .replace(/&lt;/g, "<")
       .replace(/&gt;/g, ">")
       .replace(/&quot;/g, "")
    },
    sourceMarkdownFiles: function(source){
        let contents = []
        source.forEach(item => {
          if (item.name.endsWith('.md')){
            contents.push(item.name)
          }})
        return contents
    }
}

export default pkMarkdown