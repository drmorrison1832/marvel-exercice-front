const Pagination = ({
  count,
  page,
  setPage,
  limit,
  skip,
  setSkip,
  type,
  setIsLoading,
}) => {
  return (
    <div className="pagination">
      <div
        className="button"
        onClick={() => {
          if (skip > 0) {
            setSkip(0);
            setPage(1);
            setIsLoading(true);
          }
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
            setIsLoading(true);
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
          // console.log("page", page);
          // console.log("limit", limit);
          // console.log("count", count);
          // console.log((page + 1) * limit <= count);

          // if ((page + 1) * limit <= count) {
          setSkip((prev) => prev + limit);
          setPage((prev) => prev + 1);
          setIsLoading(true);
          // } else {
          //   if (page * limit < count) {
          //     setPage((prev) => prev + 1);
          //     setSkip(count - page * limit);
          //   }
          // }

          // }
        }}
      >
        {">"}
      </div>
      <div
        className="button"
        onClick={() => {
          if (page * limit < count) {
            setPage(Math.ceil(count / limit));
            setSkip(count - limit);
            setIsLoading(true);
          }
        }}
      >
        {">>"}
      </div>
    </div>
  );
};

export default Pagination;
