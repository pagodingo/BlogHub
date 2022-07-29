const Template = ({ currentPage, contents, nextPage, searchChange}) => {
  return (
    <>
      <div id="left">
        
        <p style={{ textAlign: "left" }}>Contents</p>
        <input type="text" placeholder="..." onChange={searchChange} style={{top: -10, position: 'sticky', background: 'white', borderTop: '10px solid white', width: '100%'}}></input>
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
        <p id="page-title" style={{textDecoration: "underline"}}>{currentPage}</p>
        <div id="main" />
      </div>
    </>
  );
};

export default Template
