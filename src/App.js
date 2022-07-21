import './styles/App.css';
import './styles/markdown-styling.css'
import React from 'react';
import axios from 'axios';

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
      let contents = []
      response.data.map(item => {
        if (item.name.endsWith('.md')){
          contents.push(item.name)
        }
      })
      this.setState ({ contents: contents })
    })
      const request = axios.get(`https://raw.githubusercontent.com/${archive}/master/${index}`)
      request.then((response) => {
        let markdown = response.data
        let html = md.render(markdown)
        document.getElementById("main").innerHTML = html
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, "")
        })

      let images = document.getElementsByTagName("img");
      let array = [].slice.call(images);

      array.forEach((image) => {
        let slug = image.src.split('/').filter(e => e !== '')
        let png = slug[slug.length - 1]
            image.src = `https://raw.githubusercontent.com/${archive}/master/images${png}`
      });
        
  }

  handleChange(e){
    const nextPage = e.target.innerHTML
    const request = axios.get(`https://raw.githubusercontent.com/${archive}/master/${nextPage}`)
    request.then((response) => {
      let markdown = response.data
      let html = md.render(markdown);

      document.getElementById("right").scrollTop = 0
      document.getElementById("main").innerHTML = html
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, "")

      // Supporting Embedded Images
      let images = document.getElementsByTagName("img");
      let array = [].slice.call(images);

      array.forEach((image) => {
        let slug = image.src.split('/').filter(e => e !== '')
        let png = slug[slug.length - 1]
            image.src = `https://raw.githubusercontent.com/${archive}/master/images/${png}`
      });

    })
    this.setState({page: nextPage})
  }

  render(){
    let contents = this.state.contents
    return (
      <>
        <div id="left">
          <p style={{textAlign: 'left'}}>Contents</p>
          
          {contents.map((c) => {
            return (
              <div id="contents">
                <a href={'#'} id="link" onClick={e => this.handleChange(e)}>
                  {c}
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
export default App;
