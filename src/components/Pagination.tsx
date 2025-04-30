type Props = {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
  };
  
  export function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }: Props) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    if (totalPages <= 1) return null;
  
    return (
      <div className="flex gap-2">
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 border rounded ${
                currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>
    );
  }
  