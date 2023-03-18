const archive = process.env.REACT_APP_GIT_USER_REPO
const Template = ({ currentPage,
                    contents, 
                    nextPage,
                    nextSearch, 
                    currentDirectory,
                    getVisitedDirectory,
                  }) => {
                    
  const editOnGithubHandler = () => {
    window.open(
    `https://www.github.com/${archive}/edit/master/${[...currentDirectory.map(a =>{ if (a !=='root') return a})].join('/')}/${currentPage}`, "_blank");
  }

  return (
    <>
      <div id="left">     
      <br></br>
        <p style={{ textAlign: "left"}}>Contents</p>
        <div id="path">{currentDirectory.filter(dir => dir !== "").map((dir, i) => {
          return (
            <a href={"/#"} id="link" key={i} onClick={ () => getVisitedDirectory(dir)}>
              {"/" + dir}
            </a>
          )
        })}</div>
        <input type="text" placeholder="search" onChange={nextSearch} style={{top: -11.5, position: 'sticky', background: 'white', borderTop: '10px solid white', width: '100%'}}></input>
        {contents.map((content, i) => {
          return (
            <div id="contents" key={i}>
              <a href={"/#"} id="link" onClick={(e) => nextPage(e)}>
              {content}
              </a>
            </div>
          )
        })}
      </div>

      <div id="right">

        <p id="page-title" style={{textDecoration: "underline", borderBottom: "1px solid #f6f8fa"}}>{currentPage}</p>
        <p style={{ background: "#ffffff", textAlign: 'right', position: 'fixed', right: '15px', top: '0', margin: '10px', cursor: 'pointer'}} onClick={editOnGithubHandler}><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="gitty-cat" style={{width: '23px', height: 'auto', position: 'fixed', right: '120px', top: 1}} />Edit on GitHub</p>
        <div id="main" />
        </div>
      </>
  );
};

export default Template
