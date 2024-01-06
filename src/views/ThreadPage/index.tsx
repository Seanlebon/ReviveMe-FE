import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DeleteThreadButton from '../../components/DeleteThreadButton/DeleteThreadButton';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import EditThreadForm from './EditThreadForm';
import './index.css';
import CommentList from './Comment/CommentList';
import CreateCommentForm from './Comment/CreateCommentForm';
import useAxios from '../../hooks/useAxios';
import axios from '../../apis/reviveme';
import VoteView from '../../components/VoteView/VoteView';
import {
  getCreatedAtDate,
  getCreatedAtTime,
  getTimeSinceCreated,
} from '../../utils/DateTimeUtils';

const ThreadPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState<string>('');
  const [thread, error, loading, axiosFetch] = useAxiosFunction();

  const [comments, commentError, commentLoading, refetchComments] = useAxios({
    axiosInstance: axios,
    method: 'GET',
    url: `/api/v1/threads/${id}/comments`,
  });

  useEffect(() => {
    axiosFetch(
      {
        method: 'GET',
        url: `/api/v1/threads/${id}`,
      },
      [
        (threadResponse) => {
          setTempContent(threadResponse.content);
        },
      ],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const setIsEditingTrue = () => {
    setIsEditing(true);
  };

  return (
    <div>
      {loading && <p>Loading Thread...</p>}
      {!loading && error && (
        <p>There was an error loading the thread page: {error}</p>
      )}
      {!loading && !error && thread && (
        <div className='container'>
          <h2>{thread.deleted ? '[deleted]' : thread.title}</h2>
          <p className='thread-date'>
            Posted on{' '}
            {getCreatedAtDate(thread) + ' ' + getCreatedAtTime(thread)}
            {' (' + getTimeSinceCreated(thread) + ' ago)'}
          </p>

          {isEditing ? (
            <EditThreadForm
              setIsEditing={setIsEditing}
              setTempContent={setTempContent}
              tempContent={tempContent}
              thread={thread}
            />
          ) : (
            <p>{thread.deleted ? '[deleted]' : tempContent}</p>
          )}

          {!thread.deleted && (
            <div className='row'>
              <div className='col'>
                <DeleteThreadButton />
              </div>
              <div className='col'>
                <button
                  className='btn btn-primary btn-sm'
                  onClick={setIsEditingTrue}
                >
                  Edit
                </button>
              </div>
              <div className='col'>
                <VoteView
                  item_id={thread.id}
                  item_type={'thread'}
                  initiallyUpvoted={thread.upvoted}
                  initiallyDownvoted={thread.downvoted}
                  initialScore={thread.score}
                />
              </div>
              <div />
            </div>
          )}

          <hr style={{ paddingBottom: '2%' }} />
          <p style={{ textAlign: 'left' }}>Comments:</p>
          <CreateCommentForm refetchComments={refetchComments} />
          {commentLoading && <p>Loading Comments...</p>}
          {!commentLoading && commentError && (
            <p>There was an error loading comments: {commentError}</p>
          )}
          {comments && (
            <CommentList
              comments={comments}
              refetchComments={refetchComments}
            />
          )}
          <Link to='/'>Go to Home Page</Link>
        </div>
      )}
    </div>
  );
};

export default ThreadPage;
