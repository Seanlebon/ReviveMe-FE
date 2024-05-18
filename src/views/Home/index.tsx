import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from '../../apis/reviveme';
import { Thread } from '../../types/CommonTypes';
import ThreadCard from '../../components/ThreadCard/ThreadCard';
import useAxios from '../../hooks/useAxios';
import ThreadCardPlaceholder from '../../components/ThreadCard/ThreadCardPlaceholder';

const Home: React.FC = () => {
  const [threads, error, loading] = useAxios({
    axiosInstance: axios,
    method: 'GET',
    url: '/api/v1/threads',
  });

  return (
    <div>
      {/* TODO: create a loading animation instead */}
      {/* TODO: direct to an error page */}
      {!loading && error && <p>There was an error loading threads: {error}</p>}
      {!error && (
        <div className='container'>
          <h2>Home Page</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ThreadList loading={loading} threads={threads} />
          </div>
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

// Renders a placeholder until the threads are loaded
const ThreadList: React.FC<{ loading: boolean; threads: Thread[] }> = ({
  loading,
  threads,
}: {
  loading: boolean;
  threads: Thread[];
}) => {
  if (loading) {
    return (
      <>
        {Array.from({ length: 5 }).map((_, index) => (
          <ThreadCardPlaceholder key={index} />
        ))}
      </>
    );
  }

  return (
    <>
      {threads.map((thread: Thread) => (
        <div key={thread.id}>
          <ThreadCard thread={thread} />
        </div>
      ))}
    </>
  );
};

export default Home;
