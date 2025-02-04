import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
import SaveIcon from "./SaveIcon";

const Gallery = ({ type, items, isLoading }) => {
  // , count
  if (isLoading) {
    return <div className="is-loading">Chargement...</div>;
  }

  return (
    <>
      <section className="gallery">
        {items.map((item, index) => {
          return (
            <article className="article test1" key={item._id}>
              <Link to={`/${type}/${item._id}`}>
                <div className="title">{item.title ?? item.name}</div>

                <div className="thumbnail-container">
                  <div className="thumbnail">
                    <img
                      src={item.thumbnail.path + "." + item.thumbnail.extension}
                      alt=""
                    />
                  </div>
                </div>
              </Link>
              <div className="description">
                {item.description || "No description."}
              </div>
              <SaveIcon type={type} itemID={item._id} />
            </article>
          );
        })}
      </section>
    </>
  );
};

export default Gallery;
