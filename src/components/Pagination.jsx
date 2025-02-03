const Pagination = ({ count, page, setPage, limit, skip, setSkip, type }) => {
  return (
    <div className="pagination">
      <div
        className="button"
        onClick={() => {
          setSkip(0);
          setPage(1);
        }}
      >
        {"<<"}
      </div>
      <div
        className="button"
        onClick={() => {
          if (skip - limit >= 0) {
            setSkip((prev) => prev - limit);
            setPage((prev) => prev - 1);
          } else {
            setSkip(0);
            setPage(1);
          }
        }}
      >
        {"<"}
      </div>
      <div>
        <div>
          {(page - 1) * limit + 1}-{Math.min(page * limit, count)} out of{" "}
          {count}
        </div>
        <div>{type}s found</div>
      </div>
      <div
        className="button"
        onClick={() => {
          if ((page + 1) * limit <= count) {
            setSkip((prev) => prev + limit);
            setPage((prev) => prev + 1);
          }
        }}
      >
        {">"}
      </div>
      <div
        className="button"
        onClick={() => {
          setPage(Math.ceil(count / limit));
          setSkip(count - limit);
        }}
      >
        {">>"}
      </div>
    </div>
  );
};

export default Pagination;
