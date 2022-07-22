import './styles/App.css';
import './styles/markdown-styling.css'
import React from 'react';
import axios from 'axios';
import pkImages from './pocket-knives/pkImages';
import pkMarkdown from './pocket-knives/pkMarkdown';

const archive = process.env.REACT_APP_GIT_USER_REPO
const index = process.env.REACT_APP_GIT_ARCHIVE_INDEX

const md = require('markdown-it')();

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      contents: [],
      page: index
    }
  }

  componentDidMount(){
    axios.get(`https://api.github.com/repos/${archive}/contents/`)
    .then(response => {
      this.setState ({ contents: pkMarkdown.sourceMarkdownFiles(response.data) })
    })
      const request = axios.get(`https://raw.githubusercontent.com/${archive}/master/${index}`)
      request.then((response) => {
        let html = md.render(response.data)
        document.getElementById("main").innerHTML = pkMarkdown.cleanBeforeRender(html)
        pkImages.sourceEmbeddedImages(archive)   
      })
  }

  handleChange(e){
    const nextPage = e.target.innerHTML
    const request = axios.get(`https://raw.githubusercontent.com/${archive}/master/${nextPage}`)
    request.then((response) => {
      let html = md.render(response.data);
      document.getElementById("right").scrollTop = 0
      document.getElementById("main").innerHTML = pkMarkdown.cleanBeforeRender(html)
      pkImages.sourceEmbeddedImages(archive)
    })

    this.setState({page: nextPage})
  }

  render(){
    return (
      <>
        <div id="left">
          <p style={{textAlign: 'left'}}>Contents</p>
          
          {this.state.contents.map((content) => {
            return (
              <div id="contents">
                <a href={'/#'} id="link" onClick={e => this.handleChange(e)}>
                  {content}
                </a>
              </div>
            )})}
        </div>

        <div id="right">
          <p id="page-title">{this.state.page}</p>
          <div id="main"/>
        </div>
      </>
    )
  }
}
export default App
