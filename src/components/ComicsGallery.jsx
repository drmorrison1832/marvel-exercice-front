import { Link } from "react-router-dom";

const ComicsGallery = ({ comics, count }) => {
  return (
    <section className="gallery">
      <p>{count} results</p>
      {comics.map((comic) => {
        return (
          <Link to={`/comic/${comic._id}`} key={comic._id}>
            <article className="article test1">
              <div className="thumbnail">
                <img
                  src={
                    comic.thumbnail.path +
                    "/portrait_xlarge" +
                    "." +
                    comic.thumbnail.extension
                  }
                  alt=""
                />
              </div>
              <div className="title">{comic.title}</div>
              <div className="description">{comic.description}</div>
            </article>
          </Link>
        );
      })}
    </section>
  );
};

export default ComicsGallery;
