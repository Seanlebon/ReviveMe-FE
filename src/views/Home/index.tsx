import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from '../../apis/reviveme';
import { Thread } from '../../types/CommonTypes';
import ThreadCard from '../../components/ThreadCard/ThreadCard';
import useAxios from '../../hooks/useAxios';
import { Dropdown } from 'react-bootstrap';
import SortDropdown from '../../components/SortDropdown/SortDropdown';

const Home: React.FC = () => {
  const [threads, error, loading] = useAxios({
    axiosInstance: axios,
    method: 'GET',
    url: '/api/v1/threads',
  });

  const [sort, setSort] = React.useState<string | null>('newest');

  return (
    <div>
      {/* TODO: create a loading animation instead */}
      {/* TODO: direct to an error page */}
      {loading && <p>Loading Threads...</p>}
      {!loading && error && <p>There was an error loading threads: {error}</p>}
      {!loading && !error && threads && (
        <div className='container'>
          <h2>Home Page</h2>

          <div
            className='card'
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              alignContent: 'center',
              border: 'none',
              cursor: 'default',
            }}
          >
            <SortDropdown sort={sort} setSort={setSort} />
          </div>
          {threads.map((thread: Thread) => (
            <div key={thread.id}>
              <ThreadCard thread={thread} />
            </div>
          ))}
          <div>
            <Link to='/login'>Go to Login</Link>
          </div>
          <div>
            <Link to='/post'>Create a Post</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
