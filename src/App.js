import React, { useEffect, useState } from 'react'
import {
  ChakraProvider,
  Box,
  theme,
  Grid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  TableContainer,
  Text,
} from '@chakra-ui/react'

function App() {
  const springHost = 'http://localhost:8080'
  const endpoint = '/api/holidays/'
  const id = 'klm012345'
  const [holidays, setHolidays] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const response = await fetch(springHost + endpoint + id)
      // convert the data to json
      const json = await response.json()

      // set state with the result
      setHolidays(json)
    }

    setLoading(true)
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error)
    setLoading(false)
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Grid>
          {loading && <Text>Loading...</Text>}
          {holidays && (
            <>
              <Heading as='h2'>Holidays sample of {holidays[0].employeeId}</Heading><TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Holiday label</Th>
                      <Th>Start date</Th>
                      <Th>End date</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {holidays.map((holiday) => {
                      return(
                        <Tr key={holiday.holidayId}>
                          <Td>{holiday.holidayLabel}</Td>
                          <Td>{holiday.startOfHoliday}</Td>
                          <Td>{holiday.endOfHoliday}</Td>
                          <Td>{holiday.status}</Td>
                        </Tr>
                      )
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </>
          )}
        </Grid>
      </Box>
    </ChakraProvider>
  )
}

export default App
