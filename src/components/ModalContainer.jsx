import Comic from "../pages/Comic";

const ModalContainer = ({ setShowModalsContainer, setModalToShow }) => {
  return (
    <div
      className="modals-container"
      onClick={() => {
        setShowModalsContainer(false);
        setModalToShow("");
      }}
    >
      {setModalToShow === "ComicItem" && <ComicItem />}
    </div>
  );
};

export default ModalContainer;
