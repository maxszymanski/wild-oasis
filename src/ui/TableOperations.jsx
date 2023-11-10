import styled from 'styled-components'

const TableOperation = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
`
function TableOperations({ children }) {
    return <TableOperation>{children}</TableOperation>
}

export default TableOperations
