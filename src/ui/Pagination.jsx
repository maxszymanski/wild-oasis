import styled from 'styled-components'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { useBookings } from '../features/bookings/useBookings'

const StyledPagination = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const P = styled.p`
    font-size: 1.4rem;
    margin-left: 0.8rem;

    & span {
        font-weight: 600;
    }
`

const Buttons = styled.div`
    display: flex;
    gap: 0.6rem;
`

const PaginationButton = styled.button`
    background-color: ${(props) =>
        props.$active ? ' var(--color-brand-600)' : 'var(--color-grey-50)'};
    color: ${(props) => (props.$active ? ' var(--color-brand-50)' : 'inherit')};
    border: none;
    border-radius: var(--border-radius-sm);
    font-weight: 500;
    font-size: ${(props) => (props.$small ? '1.1rem' : '1.4rem')};

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.6rem 1.2rem;
    transition: all 0.3s;

    &:has(span:last-child) {
        padding-left: 0.4rem;
    }

    &:has(span:first-child) {
        padding-right: 0.4rem;
    }

    & svg {
        height: 1.8rem;
        width: 1.8rem;
    }

    &:hover:not(:disabled) {
        background-color: var(--color-brand-600);
        color: var(--color-brand-50);
    }
`
const PaginationInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const PaginationButtons = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.2rem;
    padding-left: 1rem;
    margin-top: 0.5rem;
`

function Pagination({ count }) {
    const { pageSize } = useBookings()
    const [searchParams, setSearchParams] = useSearchParams()

    //sprawdzamy która strona jest wybrana
    const currentPage = !searchParams.get('page')
        ? 1
        : Number(searchParams.get('page'))

    //ilość stron
    const pageCount = Math.ceil(count / pageSize)
    const lastPage = currentPage === pageCount

    function nextPage() {
        //jesłi stron ajest ostatnia to nie dawaj dalej inaczej +1
        const next = lastPage ? currentPage : currentPage + 1
        searchParams.set('page', next)
        setSearchParams(searchParams)
    }
    function previousPage() {
        const prev = currentPage === 1 ? currentPage : currentPage - 1
        searchParams.set('page', prev)
        setSearchParams(searchParams)
    }
    function handleChangeValue(e) {
        searchParams.set('pageSize', e.target.value)
        searchParams.set('page', 1)
        setSearchParams(searchParams)
    }

    // if (pageCount <= 1) return null

    return (
        <StyledPagination>
            <PaginationInfo>
                <P>
                    Showing <span>{(currentPage - 1) * pageSize + 1}</span> to{' '}
                    <span>{lastPage ? count : currentPage * pageSize}</span> of{' '}
                    <span>{count}</span>
                    results
                </P>

                <Buttons>
                    <PaginationButton
                        onClick={previousPage}
                        disabled={currentPage === 1}
                    >
                        <HiChevronLeft /> <span>Previous</span>
                    </PaginationButton>
                    <PaginationButton onClick={nextPage} disabled={lastPage}>
                        <span>Next</span> <HiChevronRight />
                    </PaginationButton>
                </Buttons>
            </PaginationInfo>
            <PaginationButtons>
                <PaginationButton
                    $small={true}
                    onClick={handleChangeValue}
                    value={3}
                    $active={pageSize === 3}
                >
                    3
                </PaginationButton>
                <PaginationButton
                    value={5}
                    $small={true}
                    onClick={handleChangeValue}
                    $active={pageSize === 5}
                >
                    5
                </PaginationButton>
                <PaginationButton
                    value={10}
                    $small={true}
                    onClick={handleChangeValue}
                    $active={pageSize === 10}
                >
                    10
                </PaginationButton>
                <PaginationButton
                    value={15}
                    $small={true}
                    onClick={handleChangeValue}
                    $active={pageSize === 15}
                >
                    15
                </PaginationButton>
            </PaginationButtons>
        </StyledPagination>
    )
}

export default Pagination
