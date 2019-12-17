import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCommentsAction, setCommentAction, getPostsAction, deletePostAction, deleteCommentAction, updatePostAction } from '../../redux/actions';
import { Comment } from '../../components';

const PostPage = ({
  match: { params: { id } },
  comments,
  setCommentAction,
  getPostsAction,
  getCommentsAction,
  posts,
  deletePostAction,
  updatePostAction,
  deleteCommentAction
}) => {
  const [name, onChangeName] = useState('');
  const [content, onChangeContent] = useState('');
  const [url, onChangeUrl] = useState('https://proosbb.com/demo/image/person.png');
  const [deletedPost, toggleDeletedPost] = useState(false);
  const [isChangeContent, toggleContent] = useState(false);
  const [contentPost, onChangeContentPost] = useState('');

  useEffect(() => {
    getCommentsAction();
    getPostsAction();
    toggleDeletedPost(false);
  }, []);

  const commentsPost = comments.filter(item => String(item.postId) === String(id));
  const post = posts.find(item => String(item.id) === String(id));

  const onSubmitComment = (e) => {
    e.preventDefault();

    setCommentAction({
      postId: id,
      name,
      content,
      url,
    });

    onChangeContent('');
  }

  const onUpdatePost = (e) => {
    e.preventDefault();

    updatePostAction({
      id,
      content: contentPost,
    });

    toggleContent(false);
  }

  const onDeletePost = () => {
    deletePostAction(id);
    toggleDeletedPost(true);
  }

  if (deletedPost) {
    return <Redirect to="/posts" />
  }

  return (
    <div className="page">
      <div className="container">
        <div className="mb-10 d-flex justify-content-between align-items-center">
          <Link to="/posts">Назад</Link>
          {
            post && <button onClick={onDeletePost} className="ui red button">Удалить пост</button>
          }
        </div>
        {
          post ? (
            <>
              <img className="full-image" src={post.url} alt="post" />
              <h1 className="text-center">{post.title}</h1>
              {
                isChangeContent ? (
                  <>
                    <form onSubmit={onUpdatePost} className="ui form">
                      <textarea onChange={(e) => onChangeContentPost(e.target.value)} placeholder="Новое описание" rows="3" />
                      <div className="mb-10 mt-10">
                        <button type="submit" className="ui button primary">Обновить</button>
                        <button onClick={() => toggleContent(false)} type="button" className="ui button red">Отменить</button>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    <div style={{ justifyContent: 'flex-end' }} className="d-flex mb-10 mt-10">
                      <button onClick={() => toggleContent(true)} className="btn ui button">Редактировать</button>
                    </div>
                    <p className="mb-10 mt-10 description">{post.description}</p>
                  </>
                )
              }
              <hr />
              <div className="mt-10 mb-10">
                <form onSubmit={onSubmitComment} className="ui form">
                  <h3>Создать комментарий</h3>
                  <div className="field">
                    <label>Имя</label>
                    <input onChange={(e) => onChangeName(e.target.value)} required placeholder="Имя" />
                  </div>
                  <div className="field">
                    <label>Ссылка на фото</label>
                    <input onChange={(e) => onChangeUrl(e.target.value)} placeholder="url" />
                  </div>
                  <div className="field">
                    <label>Комментарий</label>
                    <textarea value={content} onChange={(e) => onChangeContent(e.target.value)} required placeholder="Комментарий" rows="3" />
                  </div>
                  <button type="submit" className="ui button">Отправить</button>
                </form>
              </div>
              <hr />
              <div className="ui comments">
                <h3 className="ui dividing header">Комментарии</h3>
                <div className="comments-container">
                  {
                    commentsPost.map((item, i) => (
                      <Comment deleteCommentAction={deleteCommentAction} key={item.id || i} {...item} />
                    ))
                  }
                </div>
              </div>
            </>
          ) : <p>Не найдено</p>
        }
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
  comments: state.comments.comments,
});

const mapDispatchToProps = {
  setCommentAction,
  getCommentsAction,
  getPostsAction,
  deletePostAction,
  deleteCommentAction,
  updatePostAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
