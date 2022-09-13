import React from "react";
import axios from "axios";
import "./css/Template.css";
import js from "./js/export";
import Template from "./Template";
import "./css/markdown-styling.css";
const archive = process.env.REACT_APP_GIT_USER_REPO;
const titlePage = process.env.REACT_APP_GIT_ARCHIVE_TITLEPAGE;
const md = require("markdown-it")();

/*



  ____  _             _    _       _      
 |  _ \| |           | |  | |     | |     
 | |_) | | ___   __ _| |__| |_   _| |__   
 |  _ <| |/ _ \ / _` |  __  | | | | '_ \  
 | |_) | | (_) | (_| | |  | | |_| | |_) | 
 |____/|_|\___/ \__, |_|  |_|\__,_|_.__(_)
                 __/ |                    
                |___/ 


  Free to use and experiment with.
                                              */


// Libraries & Dependencies

    //import React from "react"; // Frontend Framework
    //import axios from "axios"; // HTTP Library
    //const md = require("markdown-it")(); // Converting Markdown to HTML: https://github.com/markdown-it/markdown-it

// 'Facade' Pattern used for core logic.

    //import js from "./js/export";


// Sort of the "base styling" this project comes with.
// Feel free to use whatever you find useful.

    //import "./css/Template.css";
    //import "./css/markdown-styling.css";
    //import Template from "./Template";


// Your Environment Variables:

    //const archive = process.env.REACT_APP_GIT_USER_REPO;
    //const titlePage = process.env.REACT_APP_GIT_ARCHIVE_TITLEPAGE;


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
            currentDirectory: adjustPath // readjusts the currentDirectory.
          });
        });
  };
  /*--------------------------

         Controllers        
           
--------------------------*/
  nextPage = (e) => {
    let nextPage = e.target.innerHTML;

    if (nextPage.includes("📚")) {
      this.nextDirectory(e);
      return;
    }

    this.setState({ currentPage: nextPage }, () => {
      this.getPage(nextPage);
    });
  };

  nextDirectory = (e) => {
    let currentDirectory = this.state.currentDirectory;
    let nextDirectory = e.target.innerHTML

      .replace("📚", "")
      .replace(" ", "")
      .replace("/", "")
      .replace("root", "");

    //Opening VISITED directories....
    if (nextDirectory === "") {
      this.setState({
        currentDirectory: ["root"],
        path: "",
      });
      return;
    }

    //Opening NEW directories...

    if (!currentDirectory.includes(nextDirectory)) {
      currentDirectory.push(nextDirectory);
      this.setState(
        {
          currentDirectory: currentDirectory,
        },
        () => {
          this.getContents();
        }
      );
    }
  };

  nextSearch = (e) => {
    let input = e.target.value;
    this.setState({ nextSearch: input });
  };
  /*--------------------------

           Render        
           
--------------------------*/
  render() {
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
