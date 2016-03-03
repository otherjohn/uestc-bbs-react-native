import React, {
  Component,
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import moment from 'moment';
import styles from '../styles/components/_Comment';
import { CommentButton } from './common';
import { parseContentWithImage } from '../utils/app';

export default class Comment extends Component {
  render() {
    let {
      reply_name,
      userTitle,
      icon,
      position,
      reply_content,
      posts_date,
      is_quote,
      quote_content
    } = this.props.comment;

    posts_date = moment(+posts_date).startOf('minute').fromNow();

    return (
      <View style={styles.commentItem}>
        <View style={styles.authorInfo}>
          <Image
           style={styles.avatar}
           source={{uri: icon}} />
          <View style={styles.author}>
            <Text style={styles.name}>{reply_name}</Text>
            <Text style={styles.level}>{userTitle}</Text>
          </View>
          <Text style={styles.floor}>#{position}</Text>
        </View>
        <View style={styles.comment}>
          {!!is_quote &&
            <View style={styles.quote}>
              <Text style={styles.quoteContent}>{quote_content}</Text>
            </View>
          }
          {reply_content.map((content, index) => {
            switch (content.type) {
              // text
              case 0:
              default:
                return <Text key={index}
                             style={styles.commentSection}>
                         {parseContentWithImage(content.infor)}
                       </Text>;
              // pic
              case 1:
                return <Image key={index}
                              style={[styles.commentSection, styles.commentImage]}
                              source={{uri: content.originalInfo}} />
            }
          })}
        </View>
        <View style={styles.other}>
          <CommentButton
            style={styles.reply}
            onPress={() => this.props.openReplyModal()}/>
          <Text style={styles.date}>{posts_date}</Text>
        </View>
      </View>
    );
  }
}
