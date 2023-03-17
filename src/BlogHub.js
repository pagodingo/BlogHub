import React from "react";
import axios from "axios";
import "./css/Template.css";
import js from "./js/export";
import Template from "./Template";
import "./css/markdown-styling.css";
const md = require("markdown-it")();
const archive = process.env.REACT_APP_GIT_USER_REPO;
const titlePage = process.env.REACT_APP_GIT_ARCHIVE_TITLEPAGE;

/*



  ____  _             _    _       _      
 |  _ \| |           | |  | |     | |     
 | |_) | | ___   __ _| |__| |_   _| |__   
 |  _ <| |/ _ \ / _` |  __  | | | | '_ \  
 | |_) | | (_) | (_| | |  | | |_| | |_) | 
 |____/|_|\___/ \__, |_|  |_|\__,_|_.__(_)
                 __/ |                    
                |___/ 


  Free to use and experiment.



  Libraries & Dependencies

      React from react // Frontend Framework
      axios from axios // HTTP Library
      md = markdown-it() // Converting Markdown to HTML: https://github.com/markdown-it/markdown-it

  'Facade' Pattern used for core logic.

      js from ./js/export


  The base styling this project comes with.
  Feel free to use whatever you find useful.

      ./css/Template.css
      ./css/markdown-styling.css
      Template from ./Template


  Your Environment Variables:

      archive = process.env.REACT_APP_GIT_USER_REPO
      titlePage = process.env.REACT_APP_GIT_ARCHIVE_TITLEPAGE */


class BlogHub extends React.Component {
  /*--------------------------

        Constructor        
           
--------------------------*/
  constructor() {
    super();
    this.state = {
      contents: [],
      currentPage: titlePage,
      currentDirectory: ["root"],
      nextSearch: "",
    };
  }
  /*--------------------------

       Before Render      
           
--------------------------*/
  componentDidMount() {

    this.getPage(titlePage);
    this.getContents();

  }
  /*--------------------------

          Getters    
           
--------------------------*/
  getPage = (page) => {
    // Build Path ...

    let path = "";
    let currentDirectory = this.state.currentDirectory;
    if (currentDirectory.length === 1) {
      path = "";
    } else {
      for (var i = 1; i < currentDirectory.length; ++i) {
        path += currentDirectory[i] + "/";
      }
    }

    // Request & Set Current Page

    let requestPage = axios.get(`https://raw.githubusercontent.com/${archive}/master/${path}${page}`);
        requestPage.then((page) => {
          let html = md.render(page.data);
          console.log(js.Markdown.cleanBeforeRender(html))
          document.getElementById("right").scrollTop = 0; // Set window @ top of new page
          document.getElementById("main").innerHTML = js.Markdown.cleanBeforeRender(html);
                                                      js.Images.loadEmbeddedImages(archive);
        });

  };

  getContents = () => {

    // Build Path ... (yes, I know. I wrote this twice)

    let path = "";
    let currentDirectory = this.state.currentDirectory;
    if (currentDirectory.length === 1) {
      path = "";
    } else {
      for (var i = 1; i < currentDirectory.length; ++i) {
        path += currentDirectory[i] + "/";
      }
    }

    // Request & Set Current Directory Contents

    let requestContents = axios.get(`https://api.github.com/repos/${archive}/contents/${path}`);
        requestContents.then((contents) => {
          this.setState({
            contents: js.Markdown.returnMarkdownFiles(contents.data),
        })});
  };

  getVisitedDirectory = (directory) => {

    // Okay three times. Don't judge.

    let path = "";
    let currentDirectory = this.state.currentDirectory;

    if (directory === "root") {
      path = "";

    } else {
      for (var i = 1; i < currentDirectory.length; ++i) {
        path += currentDirectory[i] + "/";
        if (currentDirectory[i] === directory) {
          break
        }
      }
    }

    // Revist & Set Directory Contents

    let revistDirectory = axios.get(`https://api.github.com/repos/${archive}/contents/${path}`);
        revistDirectory.then((contents) => {

          // When you revisit directories ... you have to readjust (purge some of) your directory path.
          
          let adjustPath = path.split("/") // Split the path we're revisiting.
              adjustPath.pop() // Pop extra white space (consequence of split("/"))
              adjustPath.unshift("root") // Insert "root" at the front of our path.

          this.setState({
            contents: js.Markdown.returnMarkdownFiles(contents.data),
            currentDirectory: adjustPath // readjusts the currentDirectory to where we are now.
          });
        });
  };
  /*--------------------------

         Controllers        
           
--------------------------*/
  nextPage = (e) => {
    // nextPage handles every time you click a link.
    let nextPage = e.target.innerHTML
    .replace(" ","")
    .replace("📝","").replace("🏠", "") // because I like being cute and writing code with emojis 😂🤣🗿

    // if the file is actually a directory (has book-stack emoji), call 'nextDirectory'.
    if (nextPage.includes("📚")) {
      this.nextDirectory(e);
      return;
    }

    // or if it's just a page ... 
    this.setState({ currentPage: nextPage }, () => {
      this.getPage(nextPage);
    });
  };

  nextDirectory = (e) => {
    // So, you clicked on a folder ...

    // The current directory is referenced a few times.
    // So we'll first localize it, that way we don't have to keep typing 'this.state.currentDirectory'
    let currentDirectory = this.state.currentDirectory;

    // Grab the requested folder name.
    let folder = e.target.innerHTML
    
      // trim characters that are not a part of the actual folder name.
      .replace("📚", "")
      .replace(" ", "")
      .replace("/", "")
      .replace("root", "");

      // Add New Folder, Set Current Directory, Get New Contents.
      currentDirectory.push(folder) && 
      this.setState({currentDirectory: currentDirectory}, () => this.getContents());
  };

  nextSearch = (e) => { // This can probably do without comments.
    let input = e.target.value;
    this.setState({ nextSearch: input });
  };
  /*--------------------------

           Render        
           
--------------------------*/
  render() {
    //search logic
    const keywords = this.state.nextSearch.split(" ");
    const filteredContents = this.state.contents.filter((c) => {
      for (var i = 0; i < keywords.length; ++i) {
        if (c.toLowerCase().includes(keywords[i])) {
          return true;
        }
      }
      return false;
    });

    return (
      <>
        <Template
          currentPage={this.state.currentPage}
          currentDirectory={this.state.currentDirectory}
          contents={filteredContents}
          nextPage={this.nextPage}
          nextSearch={this.nextSearch}
          getVisitedDirectory={this.getVisitedDirectory}
        />
      </>
    );
  }
}
export default BlogHub;