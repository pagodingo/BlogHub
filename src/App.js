import './css/Template.css';
import './css/markdown-styling.css'
import React from 'react';
import axios from 'axios';
import js from './js/export'
import Template from './Template'

const archive = process.env.REACT_APP_GIT_USER_REPO
const titlePage = process.env.REACT_APP_GIT_ARCHIVE_TITLEPAGE
const md = require('markdown-it')(); // https://github.com/markdown-it/markdown-it

class App extends React.Component{
/*--------------------------

        Constructor        
           
--------------------------*/       
  constructor(){
    super()
    this.state = {
      contents: [],
      currentPage: titlePage,
      nextSearch: "",
      currentDirectory: ["root"],
   }} 
/*--------------------------

       Before Render      
           
--------------------------*/     
  componentDidMount(){
    this.getContents("");
    this.getPage("",titlePage);
  } 
/*--------------------------

          Getters    
           
--------------------------*/     
  getPage = (path,page) => {
    let request = axios.get(`https://raw.githubusercontent.com/${archive}/master/${path}${page}`)
        request.then((response) => {
          let html = md.render(response.data);
          document.getElementById("right").scrollTop = 0 // Set window @ top of new page
          document.getElementById("main").innerHTML = js.Markdown.cleanBeforeRender(html)
                                                      js.Images.loadEmbeddedImages(archive)
  })}
           
  getContents = (directory) => {
    let request = axios.get(`https://api.github.com/repos/${archive}/contents/${directory}`)
        request.then(response => {
        this.setState ({
            contents: js.Markdown.returnMarkdownFiles(response.data),
        })

        if (this.state.currentDirectory.includes(directory) === false){
          this.state.currentDirectory.push(directory)
        }
  })}
/*--------------------------

         Controllers        
           
--------------------------*/     
  nextPage = (e) => {
    if (e.target.innerHTML.includes("📚")) {
      this.nextDirectory(e)
      return
    }

    let path = this.state.currentDirectory.filter(dir => dir !== "root").join("");
    let nextPage = e.target.innerHTML

      this.getPage(path,"/"+ nextPage)
      this.setState({currentPage: nextPage})
  }

  nextDirectory = (e) => {
    let directory = e.target.innerHTML
    .replace("📚","")
    .replace(" ","")
    .replace("/","")
    .replace("root","")

    if (directory === ""){
        this.setState({
          currentDirectory: ["root"],
          path: ""
    })}
    this.getContents(directory);
  }

  nextSearch = (e) => {
    let input = e.target.value
    this.setState({ nextSearch: input})
  }
/*--------------------------

           Render        
           
--------------------------*/     
  render(){
    let keywords = this.state.searchField.split(" ")
    let filteredContents = this.state.contents.filter(c => {
      for (var i = 0; i < keywords.length; ++i){
        if (c.toLowerCase().includes(keywords[i])){
          return true
      }}
      return false
  })

  return (
    <>
      <Template
      currentPage={this.state.currentPage}
      currentDirectory={this.state.currentDirectory}
      contents={filteredContents}
      nextPage={this.nextPage} 
      nextSearch={this.nextSearch}
      nextDirectory={this.nextDirectory}
      />
    </>
  )}}
export default App
