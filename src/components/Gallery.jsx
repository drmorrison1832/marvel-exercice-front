import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
import SaveIcon from "./SaveIcon";

const Gallery = ({
  type,
  items,
  isLoading,
  currentUser,
  setCurrentUser,
  currentUserSavedItems,
  setCurrentUserSavedItems,
}) => {
  console.log("Rendering Gallery...");

  if (isLoading) {
    return <div className="is-loading">Loading...</div>;
  }

  if (!items || items.length === 0) {
    return (
      <>
        <section className="gallery">No results</section>
      </>
    );
  }

  return (
    <>
      <section className="gallery">
        {items.map((item, index) => {
          return (
            <article className={`article ${type}-article`} key={item._id}>
              <Link to={`/${type}/${item._id}`}>
                <div className={`${type}-thumbnail-container`}>
                  {item.thumbnail.path.includes("image_not_available") && (
                    <div className="item-title-image-not-available">
                      {item.title ?? item.name}
                    </div>
                  )}
                  <img
                    src={item.thumbnail.path + "." + item.thumbnail.extension}
                    alt=""
                  />
                </div>
              </Link>

              <SaveIcon
                type={type}
                itemID={item._id}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                currentUserSavedItems={currentUserSavedItems}
                setCurrentUserSavedItems={setCurrentUserSavedItems}
              />
            </article>
          );
        })}
      </section>
    </>
  );
};

export default Gallery;
