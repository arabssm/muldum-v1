import { PaginationWrapper, PageButton } from './style';
import { PaginationProps } from './type';

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const displayPages = Math.max(totalPages, 1);

    return (
        <PaginationWrapper>
            <PageButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                ＜
            </PageButton>
            {Array.from({ length: displayPages }, (_, i) => (
                <PageButton
                    key={i}
                    onClick={() => onPageChange(i + 1)}
                    active={currentPage === i + 1}
                >
                    {i + 1}
                </PageButton>
            ))}
            <PageButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0}>
                ＞
            </PageButton>
        </PaginationWrapper>
    );
}