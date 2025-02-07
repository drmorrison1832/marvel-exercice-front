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
  if (isLoading) {
    return <div className="is-loading">Loading...</div>;
  }

  return (
    <>
      <section className="gallery">
        {items.map((item, index) => {
          return (
            <article className={`article ${type}-article`} key={item._id}>
              <Link to={`/${type}/${item._id}`}>
                <div className="item-title">{item.title ?? item.name}</div>

                <div className={`${type}-thumbnail-container`}>
                  <img
                    src={item.thumbnail.path + "." + item.thumbnail.extension}
                    alt=""
                  />
                </div>
              </Link>
              {/* <div className="item-description">
                {item.description || "No description."}
              </div> */}
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
