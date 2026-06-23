// import styles from './Pagination.module.css';
// import Image from 'next/image';

// interface PaginationProps {
//   page: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
//   if (totalPages <= 1) return null;

//   const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

//   return (
//     <div className={styles.pagination}>
//       <button className={styles.arrow} disabled={page === 1} onClick={() => onPageChange(page - 1)}>
//         <Image src="/icons/iconLeft-short.svg" alt="Previous page" width={24} height={24} />
//       </button>

//       {pages.map((pageNumber) => (
//         <button
//           key={pageNumber}
//           className={`${styles.pageButton} ${page === pageNumber ? styles.active : ''}`}
//           onClick={() => onPageChange(pageNumber)}
//         >
//           {pageNumber}
//         </button>
//       ))}

//       <button
//         className={styles.arrow}
//         disabled={page === totalPages}
//         onClick={() => onPageChange(page + 1)}
//       >
//         <Image src="/icons/iconRight-short.svg" alt="Next page" width={24} height={24} />
//       </button>
//     </div>
//   );
// };

// export default Pagination;
import ReactPaginate from 'react-paginate';
import Image from 'next/image';
import styles from './Pagination.module.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={page - 1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      containerClassName={styles.pagination}
      pageLinkClassName={styles.pageButton}
      activeLinkClassName={styles.active}
      previousLinkClassName={styles.arrow}
      nextLinkClassName={styles.arrow}
      previousLabel={
        <Image src="/icons/iconLeft-short.svg" alt="Previous page" width={24} height={24} />
      }
      nextLabel={<Image src="/icons/iconRight-short.svg" alt="Next page" width={24} height={24} />}
      disabledLinkClassName={styles.disabled}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
    />
  );
};

export default Pagination;
