import React, { ChangeEvent, useState } from 'react';
import { Comment as CommentType } from '../../../types/CommonTypes';
import axios from '../../../apis/reviveme';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';

import './CommentForm.css';

interface CommentReplyFormProps {
  parentComment: CommentType;
  refetchComments: () => void;
  setShowReplyEditor: (show: boolean) => void;
}

const CommentReplyForm: React.FC<CommentReplyFormProps> = ({
  parentComment,
  refetchComments,
  setShowReplyEditor,
}) => {
  const { id } = useParams<{ id: string }>(); // Thread id

  const [replyContent, setReplyContent] = useState('');

  const handleReplyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setReplyContent(value);
  };

  const handleReplySubmit = () => {
    console.log('Replying to comment', parentComment.id);
    axios
      .post(`/api/v1/threads/${id}/comments`, {
        author_id: 1, // TODO: change hardcoded value once we get user API running
        content: replyContent,
        parent_id: parentComment.id,
      })
      .then(() => {
        refetchComments();
        setShowReplyEditor(false);
        setReplyContent('');
      })
      .catch((err: AxiosError) => {
        console.log('Error posting comment', err);
      });
  };

  const handleReplyCancel = () => {
    setShowReplyEditor(false);
  };

  return (
    <form className='comment-form' onSubmit={handleReplySubmit}>
      <textarea
        placeholder='Reply to this comment'
        onChange={handleReplyChange}
        className='form-control my-2 form-text-input'
      />
      <div className='form-footer'>
        <button
          className='btn btn-sm btn-secondary form-button'
          onClick={handleReplyCancel}
        >
          Cancel
        </button>
        <button type='submit' className='btn btn-sm btn-primary form-button'>
          Reply
        </button>
      </div>
    </form>
  );
};

export default CommentReplyForm;
