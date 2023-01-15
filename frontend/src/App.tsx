import { Link } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from 'react-query'
import './input.css'
import { Main } from './Main';

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
  
      <Main />
    </div>
    </QueryClientProvider>
  );
}

export default App;
