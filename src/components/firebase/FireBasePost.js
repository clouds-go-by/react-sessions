import React, { PureComponent } from 'react';
import loadingImage from '../assets/loading.webp';
import placeholderImage from '../assets/placeholder.png';
import {getStorageRef} from "./FirebaseUtils";
import Input from "../UI/input/Input";


export class FireBasePost extends PureComponent {

  state = {
    url: null,
    loading: false
  };

  storageRef = getStorageRef();

  componentDidMount() {
    const { item } = this.props;

    if (item.imageURL) {
      this.setState({ loading: true });
      this.storageRef.child(item.imageURL).getDownloadURL().then(url => {
        this.setState({
          url,
          loading: false
        });
      }).catch(function(error) {
        console.log("error loading image:", error);
      });
    }
  }

  handleInputChange = (id, type, value, ref) => {
    this.props.onItemFileUpdate(this.props.item, ref.files[0]);
  };

  render() {
    const { item, onDelete } = this.props;
    const { url, loading } = this.state;

    const imageSrc = loading ? loadingImage : !url ? placeholderImage : url;

    return (
      <div key={item.id}>
        <img src={imageSrc} width={50} height={50} alt="icon"/>
        { url === null && <Input id="file" type="file" onChange={this.handleInputChange}/> }
        <h4>{item.title}</h4>
        <div>{item.description}</div>
        <button onClick={() => onDelete(item)}>Delete</button>
      </div>
    );
  }
}

export default FireBasePost;