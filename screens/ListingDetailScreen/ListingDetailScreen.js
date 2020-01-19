import PropTypes from "prop-types"
import React, { Component } from "react"
import { Image, StyleSheet } from "react-native"

import Button from "../../components/Button"
import { PaddedIcon, PageNoScroll, Spacer } from "../../components/Containers"
import {
  BodyText,
  ButtonText,
  SearchResultTopText,
  TitleText,
} from "../../components/Typography"
import Colors from "../../constants/Colors"
import MailManager from "../../lib/MailManager"


const styles = StyleSheet.create({
  image: {
    flex: 4,
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
    const { navigation } = this.props
    const { title, authorEmail } = navigation.state.params

    MailManager.composeAsync({
      recipients: [authorEmail],
      subject: `Response to your listing for ${title} on UCL Marketplace`,
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
        <TitleText>{`${title}`}</TitleText>
        <BodyText>{`ID: ${id}`}</BodyText>
        <BodyText>
          {`Posted by ${authorName} on ${date.substring(0, 10)}`}
        </BodyText>
        <Image
          source={{ uri: `${image}` }}
          style={styles.image}
        />
        <SearchResultTopText>
          {`Price: £${price}`}
        </SearchResultTopText>
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
