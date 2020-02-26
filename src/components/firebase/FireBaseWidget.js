import React, { Component } from 'react';
import Input from "../UI/input/Input";
import styles from "./FireBaseWidget.module.css";
import FireBasePost from "./FireBasePost";
import {getCollection, getStorageRef} from "./FirebaseUtils";

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
      value: "",
      file: null
    }],
    posts: null
  };

  postsCollection = getCollection('posts');
  storageRef = getStorageRef();

  componentDidMount() {
    this.postsCollection.get().then(snapshot => {
      this.updatePosts(snapshot);
    });

    this.postsCollection.onSnapshot(doc => {
      this.updatePosts(doc.docs);
    });
  }

  updatePosts = (snapshot) => {
    console.log("updatePosts");
    const posts = [];
    snapshot.forEach(doc => {
      posts.push({
        id: doc.id,
        ...doc.data()
      });
    });
    this.setState({posts});
  };

  inputChangeHandler = (id, type, value, ref) => {
    const updatedFormConfig = [...this.state.formConfig];
    let updatedFormItem = updatedFormConfig.find(item => item.id === id);
    const itemIndex = updatedFormConfig.indexOf(updatedFormItem);

    updatedFormItem = {
      ...updatedFormConfig.find(item => item.id === id),
      value,
      file: type === "file" ? ref.files && ref.files[0] : undefined
    };

    updatedFormConfig[itemIndex] = updatedFormItem;

    this.setState({ formConfig: updatedFormConfig });
  };

  handleAddClick = () => {
    const title = this.state.formConfig[0].value;
    const description = this.state.formConfig[1].value;
    const file = this.state.formConfig[2].file;

    if (file) {
      const storageFileRef = this.storageRef.child(`images/${file.name}`);
      storageFileRef.put(file).then(snapshot => {
        this.savePost(title, description, snapshot.metadata.fullPath);
      });
    }
    else {
      this.savePost(title, description);
    }


  };

  savePost = (title, description, imageURL) => {

    const post = {
      title,
      description
    };

    if (imageURL) {
      post.imageURL = imageURL;
    }

    this.postsCollection.doc().set(post)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  handleDeleteClick = (item) => {
    this.postsCollection.doc(item.id).delete().then(() => {
      console.log("Document successfully deleted!");

      const itemFileRef = this.storageRef.child(item.imageURL);

      itemFileRef.delete().then(() => {
        console.log("File successfully deleted.")
      });
    }).catch((error)  => {
      console.error("Error removing document: ", error);
    });
  };

  handleItemFileUpdate = (item, file) => {
    const storageFileRef = this.storageRef.child(`images/${file.name}`);
    storageFileRef.put(file).then(snapshot => {
      this.postsCollection.doc(item.id).update({
        imageURL: snapshot.metadata.fullPath
      });
    });
  };

  render() {
    const { formConfig, posts } = this.state;


    console.log("render");

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
              <FireBasePost key={ item.id }
                            item={ item }
                            onItemFileUpdate={ this.handleItemFileUpdate }
                            onDelete={this.handleDeleteClick}/>
            )
          }
        </div>
      </div>
    );
  }

}

export default FireBaseWidget;