import axios from 'axios';

const URL = 'https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights';

const headers = {
  'x-rapidapi-key': 'e5d3ecf09dmsh7cde719fcdcdaa0p184b48jsnc0e6da6350e4',
  'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
};

export const getFlightsData = async ({
  fromId,
  toId,
  departDate,
  returnDate,
  adults,
  children,
  stops
}) => {
  const options = {
    params: {
      fromId: `${fromId}.AIRPORT`,
      toId: `${toId}.AIRPORT`,
      departDate,
      returnDate,
      pageNo: '1',
      adults,
      children,
      sort: 'BEST',
      stops: 'none',
      cabinClass: 'ECONOMY',
      currency_code: 'USD'
    },
    headers
  };

  try {
    const { data: { data } } = await axios.get(URL, options);
    return data;

  } catch (error) {
    console.log(error);
  }
};