/*



  ____  _             _    _       _      
 |  _ \| |           | |  | |     | |     
 | |_) | | ___   __ _| |__| |_   _| |__   
 |  _ <| |/ _ \ / _` |  __  | | | | '_ \  
 | |_) | | (_) | (_| | |  | | |_| | |_) | 
 |____/|_|\___/ \__, |_|  |_|\__,_|_.__(_)
                 __/ |                    
                |___/ 


  Free to use an experiment with.
                                              */


// Libraries & Dependencies

    import React from "react"; // Framework
    import axios from "axios"; // HTTP Library
    const md = require("markdown-it")(); // To convert Markdown to HTML: https://github.com/markdown-it/markdown-it

// 'Facade' Pattern used for core logic.

    import js from "./js/export";

// Sort of the "base styling" this project comes with.
// Feel free to use what's necessary.

    import "./css/Template.css";
    import "./css/markdown-styling.css";
    import Template from "./Template";


// Your Environment Variables:

    const archive = process.env.REACT_APP_GIT_USER_REPO;
    const titlePage = process.env.REACT_APP_GIT_ARCHIVE_TITLEPAGE;



// And...

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
    let path = "";
    let currentDirectory = this.state.currentDirectory;
    if (currentDirectory.length === 1) {
      path = "";
    } else {
      for (var i = 1; i < currentDirectory.length; ++i) {
        path += currentDirectory[i] + "/";
      }
    }
    let request = axios.get(
      `https://raw.githubusercontent.com/${archive}/master/${path}${page}`
    );
    request.then((response) => {
      let html = md.render(response.data);
      document.getElementById("right").scrollTop = 0; // Set window @ top of new page
      document.getElementById("main").innerHTML = js.Markdown.cleanBeforeRender(html);
                                                  js.Images.loadEmbeddedImages(archive);
    });
  };

  getContents = () => {
    let path = "";
    let currentDirectory = this.state.currentDirectory;
    if (currentDirectory.length === 1) {
      path = "";
    } else {
      for (var i = 1; i < currentDirectory.length; ++i) {
        // jesus c* was it really that easy?
        path += currentDirectory[i] + "/";
      }
    }

    let request = axios.get(
      `https://api.github.com/repos/${archive}/contents/${path}`
    );
    request.then((response) => {
      this.setState({
        contents: js.Markdown.returnMarkdownFiles(response.data),
      });
    });
  };

  getVisitedDirectory = (directory) => {
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
    let chain = path.split("/")
    chain.pop()
    chain.unshift("root")
    let request = axios.get(
      `https://api.github.com/repos/${archive}/contents/${path}`
    );
    request.then((response) => {
      this.setState({
        contents: js.Markdown.returnMarkdownFiles(response.data),
        currentDirectory: chain
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
