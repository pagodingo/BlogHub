const Template = ({ currentPage, contents, nextPage, searchChange}) => {
  return (
    <>
      <div id="left">
        
        <p style={{ textAlign: "left" }}>Contents <input type="text" placeholder="filter" onChange={searchChange}></input></p>
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
