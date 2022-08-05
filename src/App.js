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
      searchField: "",
      path: "",
      directory: ["/root"]
    }
  }

 // 1. Load Table of Contents
  // 2. Load Title Page

  componentDidMount(){
    axios.get(`https://api.github.com/repos/${archive}/contents/${this.state.path}`).then(response => { // 1.
    console.log('here')
      this.setState ({
          contents: toolKit.Markdown.returnMarkdownFiles(response.data) 
      })
    })


    axios.get(`https://raw.githubusercontent.com/${archive}/master/${titlePage}`).then((response) => {
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
    if (e.target.innerHTML.includes("📚")) 
    {
      this.nextDir(e.target.innerHTML.replace("📚","").replace(" ",""))
      console.log("c")
      return
    }

    let nextPage = e.target.innerHTML
    let request = axios.get(`https://raw.githubusercontent.com/${archive}/master/${this.state.path}${nextPage}`)
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

  nextDir = (nextDir) => {

    if (this.state.path === ""){
      console.log(nextDir)
      axios.get(`https://api.github.com/repos/${archive}/contents/${nextDir}`).then(response => {
        this.setState ({
            contents: toolKit.Markdown.returnMarkdownFiles(response.data),
            path: this.state.path + nextDir + "/",
        })
        this.state.directory.push(nextDir)
      })
      console.log(this.state.path)
    }

  }




  render(){
    let contents = this.state.contents
    let keywords = this.state.searchField.split(" ")
    let filteredContents = contents.filter(content => {
      for (var i = 0; i < keywords.length; ++i){
        if (content.toLowerCase().includes(keywords[i])){
          return true
        }
      }
      return false
    })

    return (
      <>
      <Template 
      currentPage={this.state.currentPage} 
      directory={this.state.directory}
      contents={filteredContents} 
      nextPage={this.nextPage}
      searchChange={this.searchChange}
      />
      </>
    )
  }
}
export default App
