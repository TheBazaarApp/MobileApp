import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {GiftedChat, Actions, Bubble} from 'react-native-gifted-chat';
import CustomActions from './CustomActions';
import CustomView from './CustomView';
import { database } from '../firebase/firebaseApp';

var currentMessages = [
{
  _id: Math.round(Math.random() * 1000000),
  text: 'Yes, and I use Gifted Chat!',
  createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
  user: {
    _id: 1,
    name: 'Developer',
  },
  sent: true,
  received: true,
  // location: {
  //   latitude: 48.864601,
  //   longitude: 2.398704
  // },
},
{
  _id: Math.round(Math.random() * 1000000),
  text: 'Are you building a chat app?',
  createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
  user: {
    _id: 2,
    name: 'React Native',
  },
},
];

var oldMessages = [
{
  _id: Math.round(Math.random() * 1000000),
  text: 'It uses the same design as React, letting you compose a rich mobile UI from declarative components https://facebook.github.io/react-native/',
  createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
  user: {
    _id: 1,
    name: 'Developer',
  },
},
{
  _id: Math.round(Math.random() * 1000000),
  text: 'React Native lets you build mobile apps using only JavaScript',
  createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
  user: {
    _id: 1,
    name: 'Developer',
  },
},
];

export default class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);
    this._isAlright = null;
    this.listenForMessages = this.listenForMessages.bind(this);
  }

  listenForMessages() {
     let messageRoot = database.ref().child(this.props.user.college + "/user/" + this.props.user._id + "/messages/all/" + this.props.chattingUser._id)
     messageRoot.on('child_added', function(snapshot) {
       console.log("We found a message!")
       console.log(snapshot.val())
       this.setState((previousState) => {
         return {
           messages: GiftedChat.append(previousState.messages, snapshot.val())
         };
       })
     }.bind(this));
  }

  componentWillMount() {
    this.listenForMessages()
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });

    if (this._isMounted === true) {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.prepend(previousState.messages, oldMessages),
          loadEarlier: false,
          isLoadingEarlier: false,
        };
      });
    }
  }

  // var currentMessages = [
  // {
  //   _id: Math.round(Math.random() * 1000000),
  //   text: 'Yes, and I use Gifted Chat!',
  //   createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
  //   user: {
  //     _id: 1,
  //     name: 'Developer',
  //   },
  //   sent: true,
  //   received: true,
  //   // location: {
  //   //   latitude: 48.864601,
  //   //   longitude: 2.398704
  //   // },
  // },

  onSend(messages = []) {
    const messageKeyReceiver = database.ref().child(this.props.user.college + "/user/" + this.props.user._id + "/messages/all/" + this.props.chattingUser._id).push().key

    const messageKeySender = database.ref().child(this.props.chattingUser.college + "/user/" + this.props.chattingUser._id + "/messages/all/" + this.props.user._id).push().key

    const recentsUpdateReceiver = {
      name: this.props.user.name,
      timestamp: messages[0].createdAt
    }

    const recentsUpdateUser = {
      name: this.props.chattingUser.name,
      timestamp: messages[0].createdAt
    }
    var newMessageSender = {}
    var newMessageReceiver = {}
    if (messages[0].image) {
      newMessageReceiver = {
        _id: messageKeyReceiver,
        image: messages[0].image,
        createdAt: messages[0].createdAt,
        user: {
                _id: this.props.user._id,
                name: this.props.user.name,
                avatar: this.props.user.avatar
        }
      }
      newMessageSender = {
        _id: messageKeyReceiver,
        image: messages[0].image,
        createdAt: messages[0].createdAt,
        user: {
                _id: this.props.user._id,
                name: this.props.user.name,
                avatar: this.props.user.avatar
        }
      }
    }
    else if (messages[0].location) {
      newMessageReceiver = {
        _id: messageKeyReceiver,
        location: messages[0].location,
        createdAt: messages[0].createdAt,
        user: {
                _id: this.props.user._id,
                name: this.props.user.name,
                avatar: this.props.user.avatar
        }
      }
      newMessageSender = {
        _id: messageKeyReceiver,
        location: messages[0].location,
        createdAt: messages[0].createdAt,
        user: {
                _id: this.props.user._id,
                name: this.props.user.name,
                avatar: this.props.user.avatar
        }
      }
    }
    else {
      newMessageReceiver = {
        _id: messageKeyReceiver,
        text: messages[0].text,
        createdAt: messages[0].createdAt,
        user: {
                _id: this.props.user._id,
                name: this.props.user.name,
                avatar: this.props.user.avatar
        }
      }
      newMessageSender = {
        _id: messageKeyReceiver,
        text: messages[0].text,
        createdAt: messages[0].createdAt,
        user: {
                _id: this.props.user._id,
                name: this.props.user.name,
                avatar: this.props.user.avatar
        }
      }
    }
    var childUpdates = {}
    childUpdates[this.props.user.college + "/user/" + this.props.user._id + "/messages/recents/" + this.props.chattingUser._id] = recentsUpdateUser
    childUpdates[this.props.chattingUser.college + "/user/" + this.props.chattingUser._id + "/messages/recents/" + this.props.user._id] = recentsUpdateReceiver
    childUpdates[this.props.user.college + "/user/" + this.props.user._id + "/messages/all/" + this.props.chattingUser._id + '/' + messageKeySender] = newMessageSender
    childUpdates[this.props.chattingUser.college + "/user/" + this.props.chattingUser._id + "/messages/all/" + this.props.user._id + '/' + messageKeyReceiver] = newMessageReceiver
    database.ref().update(childUpdates);
  }

  // answerDemo(messages) {
  //   if (messages.length > 0) {
  //     if ((messages[0].image || messages[0].location) || !this._isAlright) {
  //       this.setState((previousState) => {
  //         return {
  //           typingText: 'React Native is typing'
  //         };
  //       });
  //     }
  //   }
  //
  //   setTimeout(() => {
  //     if (this._isMounted === true) {
  //       if (messages.length > 0) {
  //         if (messages[0].image) {
  //           this.onReceive('Nice picture!');
  //         } else if (messages[0].location) {
  //           this.onReceive('My favorite place');
  //         } else {
  //           if (!this._isAlright) {
  //             this._isAlright = true;
  //             this.onReceive('Alright');
  //           }
  //         }
  //       }
  //     }
  //
  //     this.setState((previousState) => {
  //       return {
  //         typingText: null,
  //       };
  //     });
  //   }, 1000);
  // }
  //
  // onReceive(text) {
  //   const messageKey = database().ref().child(college + "/user/" + user._id + "/messages").push().key
  //   const newMessage = {
  //     _id: messageKey,
  //     text: text,
  //     createdAt: new Date(),
  //     user: {
  //             _id: this.props.chattingUser._id,
  //             name: this.props.chattingUser.name,
  //             avatar: this.props.chattingUser.avatar
  //     }
  //   }
  //   const recentsUpdateUser = {
  //     name: this.props.chattingUser.name,
  //     timestamp: new Date()
  //   }
  //   const recentsUpdateReceiver = {
  //     name: this.props.chattingUser.name,
  //     timestamp: new Date()
  //   }
  //   this.setState((previousState) => {
  //     return {
  //       messages: GiftedChat.append(previousState.messages, newMessage)
  //     };
  //   });
  //   childUpdates[this.props.user.college + "/user/" + this.props.user._id + "/messages/recents/" + this.props.chattingUser._id] = recentsUpdateUser
  //   childUpdates[this.props.chattingUser.college + "/user/" + this.props.chattingUser._id + "/messages/recents/" + this.props.user._id] = recentsUpdateReceiver
  //   childUpdates[this.props.user.college + "/user/" + this.props.user._id + "/messages/all/" + messageKey] = newMessage
  //   childUpdates[pros.chattingUser.college + "/user/" + this.props.chattingUser._id + "/messages/all/" + messageKey] = newMessage
  //   database.ref().update(childUpdates);
  // }

  renderCustomActions(props) {
    if (Platform.OS === 'ios') {
      return (
        <CustomActions
          {...props}
        />
      );
    }
    const options = {
      'Action 1': (props) => {
        alert('option 1');
      },
      'Action 2': (props) => {
        alert('option 2');
      },
      'Cancel': () => {},
    };
    return (
      <Actions
        {...props}
        options={options}
      />
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }

  renderCustomView(props) {
    return (
      <CustomView
        {...props}
      />
    );
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        loadEarlier={this.state.loadEarlier}
        onLoadEarlier={this.onLoadEarlier}
        isLoadingEarlier={this.state.isLoadingEarlier}

        user={this.props.user}

        renderActions={this.renderCustomActions}
        renderBubble={this.renderBubble}
        renderCustomView={this.renderCustomView}
        renderFooter={this.renderFooter}
      />
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});
