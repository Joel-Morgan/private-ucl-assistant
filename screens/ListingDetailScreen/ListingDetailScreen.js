import PropTypes from "prop-types"
import React, { Component } from "react"
import { Image, StyleSheet } from "react-native"

import Button from "../../components/Button"
import { PaddedIcon, PageNoScroll, Spacer } from "../../components/Containers"
import {
  BodyText,
  ButtonText,
  TitleText,
} from "../../components/Typography"
import Colors from "../../constants/Colors"
import MailManager from "../../lib/MailManager"
import Styles from "../../styles/Containers"

const styles = StyleSheet.create({
  emptyImage: {
    height: 200,
    marginTop: 25,
  },
})

class ListingDetailScreen extends Component {
  static propTypes = {
    authorEmail: PropTypes.string,
    authorName: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    navigation: PropTypes.shape().isRequired,
    price: PropTypes.string,
    title: PropTypes.string,
  }

  static defaultProps = {
    authorEmail: ``,
    authorName: ``,
    date: ``,
    description: ``,
    id: ``,
    image: ``,
    price: ``,
    title: ``,
  }

  sendEmail = () => {
    // const { email } = this.state
    const authorEmail = this.props.navigation.state.params

    MailManager.composeAsync({
      recipients: [authorEmail],
    })
  }

  static navigationOptions = {
    title: `Listing`,
  }

  render() {
    const {
      id,
      title,
      description,
      price,
      image,
      authorName,
      date,
    } = this.props.navigation.state.params

    return (
      <PageNoScroll>
        <TitleText>{`${title} : ${id}`}</TitleText>
        <Image
          source={{ uri: `${image}` }}
          resizeMethod="scale"
          style={[Styles.image, styles.emptyImage]}
          resizeMode="contain"
        />
        <BodyText>
          {`By ${authorName} on ${date.substring(0, 10)}`}
        </BodyText>
        <BodyText>
          {`Price: ${price}`}
        </BodyText>
        <BodyText>
          {description}
        </BodyText>
        <Spacer />
          <Button onPress={this.sendEmail}>
            <PaddedIcon name="mail" size={24} color={Colors.pageBackground} />
            <ButtonText>Email to enquire</ButtonText>
          </Button>
      </PageNoScroll>
    )
  }
}

export default ListingDetailScreen
