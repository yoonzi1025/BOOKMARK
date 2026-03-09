import MyLibraryBookCard from "./MyLibraryBookCard";
import "./MyLibrarySection.css";

const MyLibrarySection = ({ filterBooks, onClickBookCard, selectedBook }) => {
  return (
    <div>
      <MyLibraryBookCard
        filterBooks={filterBooks}
        onClickBookCard={onClickBookCard}
        selectedBook={selectedBook}
      />
    </div>
  );
};

export default MyLibrarySection;
