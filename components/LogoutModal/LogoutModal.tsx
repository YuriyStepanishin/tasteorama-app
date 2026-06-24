'use client';

import css from './LogoutModal.module.css';

type LogoutModalProps = {
  onClose: () => void;
  onConfirm: () => void;
};

export default function LogoutModal({ onClose, onConfirm }: LogoutModalProps) {
  // return (
  //     <div>
  //         <div>
  //             <h2>Are you sure?</h2>
  //             <p>We will miss you!</p>
  //             <button type="button" onClick={onConfirm}>
  //                 Log out
  //             </button>
  //             <button
  //                 type="button"
  //                 onClick={onClose}
  //             >
  //                 Cancel
  //             </button>
  //         </div>
  //     </div>
  // );
  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={css.closeModalBtn} onClick={onClose}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.250001 0.25L7 7M7 7L0.25 13.75M7 7L13.75 13.75M7 7L13.75 0.250001"
              stroke="black"
              //   strokewidth="0.5"
              //   strokelinecap="round"
              //   strokelinejoin="round"
            />
          </svg>
        </button>

        <h2 className={css.title}>Are you sure?</h2>

        <p className={css.text}>We will miss you!</p>

        <div className={css.actions}>
          <button type="button" className={css.cancelBtn} onClick={onClose}>
            Cancel
          </button>

          <button type="button" className={css.logoutBtn} onClick={onConfirm}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
