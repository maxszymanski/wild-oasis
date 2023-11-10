import styled from 'styled-components'
import Spinner from '../../ui/Spinner'
import CabinRow from './CabinRow'
import { useCabins } from './useCabins'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import { useSearchParams } from 'react-router-dom'
import Empty from '../../ui/Empty'

function CabinTable() {
    const { isLoading, cabins } = useCabins()
    const [searchParams] = useSearchParams()
    if (isLoading) return <Spinner />

    if (!cabins?.length) return <Empty resourceName="bookings" />
    //sciągamy dane z searchParamsUrl//
    const filterValue = searchParams.get('discount') || 'all'

    // tworzymy zmienna w której filtrujemy cabiny w zależności od URL SeachParams
    let filteredCabins
    if (filterValue === 'all') filteredCabins = cabins
    if (filterValue === 'no-discount')
        filteredCabins = cabins.filter((cabin) => cabin.discount === 0)
    if (filterValue === 'with-discount')
        filteredCabins = cabins.filter((cabin) => cabin.discount > 0)

    //Sort
    const sortBy = searchParams.get('sortBy') || 'name-asc'
    const [field, direction] = sortBy.split('-') // dzielimy nasz search param aby sprawdzić czy sortujemy od góry czy od dołu
    const modifier = direction === 'asc' ? 1 : -1 // sprawdzamy czy ma sortować od góry czy od dołu
    function compare(a, b) {
        if (a['name'] < b['name']) {
            return -1 * modifier
        }
        if (a['name'] > b['name']) {
            return 1 * modifier
        }
        return 0
    }

    const sortedCabins =
        field === 'name'
            ? filteredCabins.sort(compare)
            : filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier)
    // const sortedCabins = filteredCabins.sort(
    //     (a, b) => (a[field] - b[field]) * modifier
    // )
    return (
        <Menus>
            <Table $columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
                <Table.Header>
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>
                <Table.Body
                    data={sortedCabins}
                    render={(cabin) => (
                        <CabinRow cabin={cabin} key={cabin.id} />
                    )}
                />
            </Table>
        </Menus>
    )
}

export default CabinTable
