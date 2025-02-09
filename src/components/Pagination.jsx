const Pagination = ({ count, limit, skip, setSkip, type }) => {
  return (
    <div className="pagination">
      <div
        className={skip > 0 ? "button" : "button disabled"}
        onClick={() => {
          if (skip > 0) {
            setSkip(0);
          }
        }}
      >
        {"<<"}
      </div>
      <div
        className={skip > 0 ? "button" : "button disabled"}
        onClick={() => {
          if (skip === 0) {
            return;
          }
          if (skip - limit < 0) {
            setSkip(0);
          }
          if (skip - limit >= 0) {
            setSkip((prev) => prev - limit);
          }
        }}
      >
        {"<"}
      </div>
      <div>
        <div>
          {skip + 1}-{skip + limit <= count ? skip + limit : count} out of{" "}
          {count}
        </div>
        {/* <div>{type}s found</div> */}
      </div>
      <div
        className={skip + limit < count ? "button" : "button disabled"}
        onClick={() => {
          if (skip + limit < count) {
            setSkip((prev) => prev + limit);
            // setIsLoading(true);
          }
        }}
      >
        {">"}
      </div>

      <div
        className={skip + limit < count ? "button" : "button disabled"}
        onClick={() => {
          if (skip + limit < count) {
            console.log(Math.floor(count / limit));
            setSkip(Math.floor(count / limit) * limit);
            // setIsLoading(true);
          }
        }}
      >
        {">>"}
      </div>
    </div>
  );
};

export default Pagination;
