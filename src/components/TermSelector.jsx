import "./TermSelector.css";

const TermSelector = ({ terms, selectedTerm, setSelectedTerm }) => {
  return (
    <div className="term-selector">
      {terms.map((term) => (
        <button
          key={term}
          onClick={() => setSelectedTerm(term)}
          className={term === selectedTerm ? "selected" : ""}
        >
          {term}
        </button>
      ))}
    </div>
  );
};

export default TermSelector;
