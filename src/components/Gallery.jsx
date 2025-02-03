import { Link } from "react-router-dom";

const Gallery = ({ type, items, count }) => {
  return (
    <>
      <section className="gallery">
        {items.map((item, index) => {
          return (
            <Link to={`/${type}/${item._id}`} key={item._id}>
              <article className="article test1">
                <div className="thumbnail">
                  <img
                    src={item.thumbnail.path + "." + item.thumbnail.extension}
                    alt=""
                  />
                </div>
                <div className="title">{item.title ?? item.name}</div>
                <div className="description">
                  {item.description || "No description."}
                </div>
                <div>{index + 1}</div>
              </article>
            </Link>
          );
        })}
      </section>
    </>
  );
};

export default Gallery;
