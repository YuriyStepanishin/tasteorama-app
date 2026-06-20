import css from './Header.module.css';

interface BurgerButtonProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function BurgerButton({ isOpen, setIsOpen }: BurgerButtonProps) {
  return (
    <button 
      className={css.burgerBtn} 
      onClick={() => setIsOpen(!isOpen)}
      aria-label="Toggle menu"
      type="button"
    >
      <span className={`${css.burgerLine} ${isOpen ? css.line : ''}`}></span>
      <span className={`${css.burgerLine} ${isOpen ? css.line : ''}`}></span>
      <span className={`${css.burgerLine} ${isOpen ? css.line : ''}`}></span>
    </button>
  );
}



