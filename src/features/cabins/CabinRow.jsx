import styled from 'styled-components'
import { formatCurrency } from '../../utils/helpers'
import { useState } from 'react'
import CreateCabinForm from './CreateCabinForm'
import { useDeleteCabin } from './useDeleteCabin'
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2'
import { useCreateCabin } from './useCreateCabin'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: 'Sono';
`

const Price = styled.div`
    font-family: 'Sono';
    font-weight: 600;
`

const Discount = styled.div`
    font-family: 'Sono';
    font-weight: 500;
    color: var(--color-green-700);
`
function CabinRow({ cabin }) {
    const { isDeleting, deleteCabin } = useDeleteCabin()
    const { isCreating, createCabine } = useCreateCabin()

    const {
        id,
        name,
        maxCapacity,
        regularPrice,
        discount,
        image,
        description,
    } = cabin

    function handleDuplicate() {
        createCabine({
            name: `Copy of ${name}`,
            maxCapacity,
            regularPrice,
            discount,
            image,
            description,
        })
    }

    return (
        <TableRow role="row">
            <Img src={image} alt={description} />
            <Cabin>{name}</Cabin>
            <p>Fits up to {maxCapacity}</p>
            <Price>{formatCurrency(regularPrice)}</Price>
            {discount ? (
                <Discount>{formatCurrency(discount)}</Discount>
            ) : (
                <span>&mdash;</span>
            )}
            <div>
                <button disabled={isCreating} onClick={handleDuplicate}>
                    <HiSquare2Stack />
                </button>
                <Modal>
                    <Modal.Open opens="edit">
                        <button>
                            <HiPencil />
                        </button>
                    </Modal.Open>
                    <Modal.Window name="edit">
                        <CreateCabinForm cabinToEdit={cabin} />
                    </Modal.Window>
                    <Modal.Open opens="delete">
                        <button>
                            <HiTrash />
                        </button>
                    </Modal.Open>
                    <Modal.Window name="delete">
                        <ConfirmDelete
                            resourceName="cabin"
                            disabled={isDeleting}
                            onConfirm={() => deleteCabin(id)}
                        />
                    </Modal.Window>
                </Modal>
            </div>
        </TableRow>
    )
}

export default CabinRow
