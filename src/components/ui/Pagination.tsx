import ReactPaginate from "react-paginate";
interface PaginationProps {
  pageCount: number;
  handlePageChange: (selectedItem: { selected: number }) => void;
}

export const Pagination = ({
  pageCount,
  handlePageChange,
}: PaginationProps) => {
  return (
    <ReactPaginate
      previousLabel={<span className="text-lg font-bold">&lt;</span>}
      nextLabel={<span className="text-lg font-bold">&gt;</span>}
      breakLabel={"..."}
      pageCount={pageCount}
      onPageChange={handlePageChange}
      containerClassName="flex justify-center items-center space-x-2 py-4"
      pageClassName="page-item"
      pageLinkClassName="page-link px-4 py-2 rounded-lg border-2 border-gray-300 hover:bg-blue-500 hover:text-white transition-colors"
      previousClassName="page-item"
      previousLinkClassName="page-link px-4 py-2 rounded-lg border-2 border-gray-300 hover:bg-blue-500 hover:text-white transition-colors"
      nextClassName="page-item"
      nextLinkClassName="page-link px-4 py-2 rounded-lg border-2 border-gray-300 hover:bg-blue-500 hover:text-white transition-colors"
      activeClassName="bg-blue-500 text-white"
      disabledClassName="opacity-50 cursor-not-allowed"
    />
  );
};
