import { Link } from 'react-router-dom'
import { Main } from './Main';
import { QueryClient, QueryClientProvider } from 'react-query'
import './input.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/cats'>Cats</Link>
        </li>
        <li>
          <Link to='/dogs'>Dogs</Link>
        </li>
        <li>
          <Link to='/users'>Users</Link>
        </li>
        <li>
          <Link to='/clients'>Clients</Link>
        </li>

      </ul>
      <hr />
      <Main />
    </div>
    </QueryClientProvider>
  );
}

export default App;
