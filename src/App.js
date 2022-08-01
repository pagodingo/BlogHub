import './styles/Template.css';
import './styles/markdown-styling.css'
import React from 'react';
import axios from 'axios';
import toolKit from './pocket-knives/export'
import Template from './Template'
const archive = process.env.REACT_APP_GIT_USER_REPO
const titlePage = process.env.REACT_APP_GIT_ARCHIVE_TITLEPAGE
const md = require('markdown-it')();

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      contents: [],
      currentPage: titlePage,
      searchField: ""
    }
  }

 // 1. Load Table of Contents
  // 2. Load Title Page

  componentDidMount(){
    axios.get(`https://api.github.com/repos/${archive}/contents/`).then(response => { // 1.
      this.setState ({
         contents: toolKit.Markdown.returnMarkdownFiles(response.data) 
      })
    })
    axios.get(`https://raw.githubusercontent.com/${archive}/master/${titlePage}`)// 2.
         .then((response) => {
         let html = md.render(response.data)
         document.getElementById("main").innerHTML = toolKit.Markdown.cleanBeforeRender(html)
                                                     toolKit.Images.loadEmbeddedImages(archive)   
    })
  }

// Rendering New Pages

  searchChange = (event) => {
    this.setState({ searchField: event.target.value })
  }

  nextPage =  (e) => {
    let nextPage = e.target.innerHTML
    let request = axios.get(`https://raw.githubusercontent.com/${archive}/master/${nextPage}`)
    request.then((response) => {
      let html = md.render(response.data);
      // Set window @ top of Next Page
      document.getElementById("right").scrollTop = 0
      //
      document.getElementById("main").innerHTML = toolKit.Markdown.cleanBeforeRender(html)
                                                  toolKit.Images.loadEmbeddedImages(archive)
    })

    this.setState({currentPage: nextPage})
  }

  render(){
   /* axios.get(`https://api.github.com/repos/${archive}/contents/`).then(response => { 
      console.log(response.data[11])
      })*/
    let contents = this.state.contents
    let keywords = this.state.searchField.split(" ")
    let filteredContents = contents.filter(content => {
      for (var i = 0; i < keywords.length; ++i){
        if (content.toLowerCase().includes(keywords[i])){
          return true
        }
      }
      console.log(keywords)
    })

    return (
      <>
      <Template 
      currentPage={this.state.currentPage} 
      contents={filteredContents} 
      nextPage={this.nextPage}
      searchChange={this.searchChange}
      />
      </>
    )
  }
}
export default App
