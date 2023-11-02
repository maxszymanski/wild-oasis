import { useState } from 'react'
import Heading from '../ui/Heading'
import Row from '../ui/Row'
import Button from '../ui/Button'
import { getCabins } from '../services/apiCabins'
import CabinTable from '../features/cabins/CabinTable'
import CreateCabinForm from '../features/cabins/CreateCabinForm'

function Cabins() {
    const [showForm, setShowForm] = useState(false)
    // useEffect(function () {
    //     getCabins().then((data) => console.log(data))
    // }, [])

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <p>TFilter/Sort</p>
            </Row>
            <Row>
                <CabinTable />
                <Button onClick={() => setShowForm((show) => !show)}>
                    Add new cabin
                </Button>
                {showForm && <CreateCabinForm />}
            </Row>
        </>
    )
}

export default Cabins
