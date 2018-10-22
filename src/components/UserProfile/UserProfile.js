import React from 'react';
import styles from './UserProfile.module.css';
import Header from './Header/Header';
import Comments from './Comments/Comments';
import Modal from './Modal/Modal';
const comments = require('../../data.json');

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 121,
      following: 723,
      followers: 4433,
      comments: [],
      isLiked: false,
      isFollowed: false,
      showComments: true,
      showModal: false,
      addedComment: false,
    };
  }

  componentDidMount() {
    this.setState({
      comments: comments
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if((prevState.addedComment !== this.state.addedComment) && this.state.showComments) {
      document.getElementById('inputComment').value = '';
      setTimeout(() => {
        const list = document.getElementById('comList');
        list.lastElementChild.scrollIntoView({behavior: 'smooth'});
      }, prevState.showComments ? 0 : 400);
    }
    if(this.state.showModal) {
      const inputModal = document.getElementById('inputModal');
      inputModal.focus();
    }
  }

  handleHeartClick = () => {
    if(!this.state.isLiked) {
      this.setState({
        likes: this.state.likes + 1,
        isLiked: !this.state.isLiked
      })
    } else {
      this.setState({
        likes: this.state.likes -1,
        isLiked: !this.state.isLiked
      })
    }
  }

  handleFollowClick = () => {
    if(!this.state.isFollowed) {
      this.setState({
        followers: this.state.followers + 1,
        isFollowed: !this.state.isFollowed
      })
    } else {
      this.setState({
        followers: this.state.followers -1,
        isFollowed: !this.state.isFollowed
      })
    }
  }

  addComment = event => {
    // grabbing pressed key
    let pressed = event.key || event.keyCode;
    // create new comment if user pressed enter and input is not empty
    if ((pressed === 'Enter' || pressed === 13) && event.target.value) {
      const newComment = {
        username: 'John Doe',
        date:  Date.now(),
        content: event.target.value
      } 
      // update comments array based on previous state
      this.setState(prevState => ({
        comments: [...prevState.comments, newComment],
        showComments: true,
        addedComment: !prevState.addedComment
      }));
    }
  }

  toggleComments = () => {
    this.setState(prevState => ({
      showComments: !prevState.showComments
    }));
  }

  handleModalShow = () => {
    this.setState({
      showModal: true
    });
  }

  handleModalHide = () => {
    this.setState({
      showModal: false
    });
  }
  
  render() {
    return (
      <div className={styles.container}>
        <Header onHeartClick={this.handleHeartClick} onFollowClick={this.handleFollowClick} onShareClick={this.handleModalShow} likes={this.state.likes} following={this.state.following} followers={this.state.followers} isFollowed={this.state.isFollowed} isLiked={this.state.isLiked}/>
        <Comments onInput={this.addComment} onToggleComments={this.toggleComments} comments={this.state.comments}  showComments={this.state.showComments}/>
        <Modal onBtnClick={this.handleModalHide} showModal={this.state.showModal}/>
      </div>
    );
  }
}

export default UserProfile;