import './App.css';
import './markdown-styling.css'
import React from 'react';
import axios from 'axios';
const md = require('markdown-it')();

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      docs: [],
      currentDoc: "New Doc"
    }
  }

  componentDidMount(){
    axios.get('https://api.github.com/repos/pagodingo/notes-pega/contents/')
    .then(res => {
      const docs = res.data
      this.setState({docs: docs})
    })

    const request = axios.get(process.env.REACT_APP_GITHUB_REPOSITORY + 'pega-2-1.md')
    request.then(response => {
      let html = md.render(response.data)
      let cleanHTML = html.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '')
      document.getElementById("main").innerHTML = cleanHTML
      this.setState({currentDoc: "/README.md"})
  })
}

getDoc(title){
  const request = axios.get(
    process.env.REACT_APP_GITHUB_REPOSITORY + title
  );
  request.then((response) => {
    let html = md.render(response.data);
    let cleanHTML = html
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, "");
    document.getElementById("main").innerHTML = cleanHTML
    document.getElementById("main").scrollTop = 0
    this.setState({currentDoc: title})
    let m = document.getElementsByTagName("img");
    let images = [].slice.call(m);

    images.forEach((img) => {
      let slug = img.src.split('/').filter(e => e !== '')
      console.log(slug)
      let imgName = slug[slug.length - 1]
          img.src = process.env.REACT_APP_GITHUB_REPOSITORY + "images/" + imgName
    });
  });
}


  render(){
    return (
      <div>
        <div id="left">
          <p style={{textAlign: 'center'}}>Contents</p>
          {this.state.docs.map((doc) => {
             if(doc.name.endsWith('.md')){
              return (
                <div id="contents">
                  <a href={'#'} id="link" onClick={e => this.getDoc(e.target.innerHTML)}>
                    {doc.name}
                  </a>
                </div>
              )
             } 
          })}
        </div>

        <div id="right">
          <p style={{textAlign: 'center', top: 0, position: 'sticky',background: '#ffffff', marginTop: '0px'}}>/{this.state.currentDoc}</p>
          <div id="main"/>
        </div>

      </div>
    )
  }
}

export default App;
