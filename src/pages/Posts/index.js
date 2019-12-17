import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getPostsAction, setPostAction, getCommentsAction } from '../../redux/actions';
import { PostsHeader, PostCard, Modal } from '../../components';
import './style.scss';

const PostsPage = ({ getPostsAction, setPostAction, posts, getCommentsAction, comments }) => {
  const [search, onSearch] = useState('');
  const [isCreate, onToggleCreate] = useState(false);
  const [title, onChangeTitle] = useState('');
  const [shortDescription, onChangeShortDescription] = useState('');
  const [description, onChangeDescription] = useState('');
  const [url, onChangeUrl] = useState('https://im0-tub-ru.yandex.net/i?id=5248eb50b073098e77d6a548385455ca&n=13');

  useEffect(() => {
    getPostsAction();
    getCommentsAction();
  }, []);

  const handlerClickModal = (e, status) => {
    onToggleCreate(status);
  }

  const onCreate = (e) => {
    e.preventDefault();

    setPostAction({
      title,
      shortDescription,
      description,
      url
    });

    onToggleCreate(false);
  }

  const commentsPost = posts.reduce((obj, item) => {
    const comPost = comments.filter(comment => String(comment.postId) === String(item.id));
    return { ...obj, [item.id]: comPost };
  }, {});

  return (
    <div className="page">
      <Modal isOpen={isCreate} onClose={(e) => handlerClickModal(e, false)}>
        <form onSubmit={onCreate} className="ui form">
          <div className="field">
            <label>Заголовок</label>
            <input onChange={(e) => onChangeTitle(e.target.value)} required placeholder="Заголовок" />
          </div>
          <div className="field">
            <label>Краткое описание</label>
            <input onChange={(e) => onChangeShortDescription(e.target.value)} required placeholder="Краткое описание" />
          </div>
          <div className="field">
            <label>Ссылка на фото</label>
            <input onChange={(e) => onChangeUrl(e.target.value)} placeholder="url" />
          </div>
          <div className="field">
            <label>Полное описание</label>
            <textarea onChange={(e) => onChangeDescription(e.target.value)} required placeholder="Полное описание" rows="3" />
          </div>
          <button type="submit" className="ui button">Создать</button>
        </form>
      </Modal>
      <div className="container">
        <PostsHeader onOpen={(e) => handlerClickModal(e, true)} onSearch={onSearch} />
        <div className="mt-20">
          <div className="ui link items">
            {
              Array.isArray(posts) && posts.map((post, i) => post.title && post.title.toLowerCase().includes(search.toLowerCase()) && (
                <PostCard {...post} commentsLength={commentsPost[String(post.id)] && commentsPost[post.id].length} key={post.id || i} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
  comments: state.comments.comments,
});

const mapDispatchToProps = {
  getPostsAction,
  setPostAction,
  getCommentsAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
