const archive = process.env.REACT_APP_GIT_USER_REPO
const Template = ({ currentPage,
                    contents, 
                    nextPage,
                    nextSearch, 
                    currentDirectory,
                    nextDirectory
                  }) => {
  const editOnGithubHandler = () => {
    window.open(
    `https://www.github.com/${archive}/edit/master/${currentPage}`, "_blank");
  }
  return (
    <>
      <div id="left">     
        <p style={{ textAlign: "left"}}>Contents</p>
        <input type="text" placeholder="search" onChange={nextSearch} style={{top: -11.5, position: 'sticky', background: 'white', borderTop: '10px solid white', width: '100%'}}></input>
        {currentDirectory.filter(dir => dir !== "").map((dir, i) => {
          return (
            <a href={"/#"} id="link" key={i} onClick={(e)=> nextDirectory(e)}>
              {"/" + dir}
            </a>
          )
        })}
        <hr></hr>
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
        <div className="chevron" style={{
                background: '#ddd',
                position: 'fixed',
                top: '15px',
                marginLeft: '50px',
                height: '20px',
                transform: 'skewY(-40deg)',
              }}></div>
        <p id="page-title" style={{textDecoration: "underline", borderBottom: "1px solid #f6f8fa"}}>{currentPage}</p>
        <p style={{ background: "#ffffff", textAlign: 'right', position: 'fixed', right: '15px', top: '0', margin: '10px', cursor: 'pointer'}} onClick={editOnGithubHandler}><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="gitty-cat" style={{width: '23px', height: 'auto', position: 'fixed', right: '120px', top: 1}} />Edit on GitHub</p>
        <div id="main" />
        </div>
      </>
  );
};

export default Template
