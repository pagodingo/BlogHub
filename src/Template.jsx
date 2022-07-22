const Template = ({ currentPage, contents, nextPage}) => {
  return (
    <>
      <div id="left">
        <p style={{ textAlign: "left" }}>Contents</p>
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
        <p id="page-title">{currentPage}</p>
        <div id="main" />
      </div>
    </>
  );
};

export default Template
