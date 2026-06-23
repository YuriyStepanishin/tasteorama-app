import css from './EmptySearch.module.css';
type emptySearchProps = {
  onReset: () => void;
};

export default function EmptySearch({ onReset }: emptySearchProps) {
  return (
    <div className={css.wrapper}>
      <div className={css.emptyBox}>
        <h3>
          We're sorry! We were not able <br /> to find a match.
        </h3>
        <button onClick={onReset}>Reset serach and filters</button>
      </div>
    </div>
  );
}
