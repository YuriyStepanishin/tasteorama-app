import css from './EmptySearch.module.css';
type emptySearchProps = {
  onReset: () => void;
};

export default function EmptySearch({ onReset }: emptySearchProps) {
  return (
    <div className={css.emptyBox}>
      <h3>We're sorry!</h3>
      <p>
        We were not able
        <br />
        to find a match.
      </p>
      <button onClick={onReset}>Reset serach and filters</button>
    </div>
  );
}
