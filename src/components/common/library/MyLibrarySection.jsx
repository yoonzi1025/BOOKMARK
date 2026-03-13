import MyLibraryBookCard from "./MyLibraryBookCard";

const MyLibrarySection = ({ filterBooks, onClickBookCard }) => {
  return (
    <div>
      <MyLibraryBookCard
        filterBooks={filterBooks}
        onClickBookCard={onClickBookCard}
      />
    </div>
  );
};

export default MyLibrarySection;
