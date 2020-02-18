import React, { Component } from 'react';
import Input from "../UI/input/Input";
import firebase from 'firebase';
import styles from "./FireBaseWidget.module.css";

class FireBaseWidget extends Component {

  state = {
    formConfig: [{
      id: "title",
      type: "text",
      placeholder: "Title",
      value: ""
    }, {
      id: "description",
      type: "text",
      placeholder: "Description",
      value: ""
    }, {
      id: "file",
      type: "file",
      value: ""
    }],
    posts: null
  };

  componentDidMount() {
    const postsCollection = firebase.firestore().collection('posts');

    postsCollection.get().then(snapshot => {
      this.updatePosts(snapshot);
    });

    postsCollection.onSnapshot(doc => {
      this.updatePosts(doc.docs);
    });
  }

  updatePosts = (snapshot) => {
    const posts = [];
    snapshot.forEach(doc => {
      posts.push({
        id: doc.id,
        ...doc.data()
      });
    });
    this.setState({posts});
  };

  inputChangeHandler = (id, value) => {
    const updatedFormConfig = [...this.state.formConfig];
    let updatedFormItem = updatedFormConfig.find(item => item.id === id);
    const itemIndex = updatedFormConfig.indexOf(updatedFormItem);

    updatedFormItem = {
      ...updatedFormConfig.find(item => item.id === id),
      value
    };

    updatedFormConfig[itemIndex] = updatedFormItem;

    this.setState({ formConfig: updatedFormConfig });
  };

  handleAddClick = () => {
    const postsCollection = firebase.firestore().collection('posts');

    const title = this.state.formConfig[0].value;
    const description = this.state.formConfig[1].value;

    postsCollection.doc().set({
      title: title,
      description: description
    })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  handleDeleteClick = (id) => {
    const postsCollection = firebase.firestore().collection('posts');

    postsCollection.doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error)  => {
      console.error("Error removing document: ", error);
    });
  };

  render() {
    const { formConfig, posts } = this.state;

    return (
      <div>
        <h3>FireBase</h3>
        <div>
          { formConfig.map(item =>
            <Input key={item.id} {...item} onChange={this.inputChangeHandler}/>
          ) }
          <button onClick={this.handleAddClick}>Add Item</button>
        </div>
        <h1>Posts</h1>
        <div className={styles.posts}>
          {
            posts && posts.map(item =>
              <div key={item.id}>
                <h4>{item.title}</h4>
                <span>{item.description}</span>
                <button onClick={() => this.handleDeleteClick(item.id)}>Delete</button>
              </div>
            )
          }
        </div>
      </div>
    );
  }

}

export default FireBaseWidget;