// import PropTypes from "prop-types"
import * as ImagePicker from 'expo-image-picker'
import React, { Component } from "react"
import {
  SafeAreaView, ScrollView, StyleSheet, Text,
  View,
} from 'react-native'
import HorizontalLine
  from "react-native-svg-charts/src/chart-decorators/horizontal-line"
import { connect } from "react-redux"

import Button from "../../components/Button"
import { Horizontal } from "../../components/Containers"
import { TextInput } from "../../components/Input"
import { TitleText } from "../../components/Typography"
import { ApiManager } from "../../lib"
import Styles from "../../styles/Button"


const styles = StyleSheet.create({
  pick_stuff: {
    marginTop: 25,
  },

})

export class MakeListingScreen extends Component {
  constructor() {
    super()
    this.state = {
      author_email: ``,
      author_name: ``,
      listing_description: ``,
      listing_image: ``,
      listing_price: ``,
      listing_title: ``,
    }
  }

  componentDidMount() {
    const { user: { email }, user: { fullName } } = this.props

    this.setState({
      author_email: email,
      author_name: fullName,
    })
  }

  static mapStateToProps = (state) => ({
    user: state.user,
  })

  render() {
    const { user } = this.props
    // todo: ADD THE UNDER TEXT LIVE CHARACTER COUNT UPDATER
    return (
        <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
        <ScrollView style={{ marginHorizontal: `10%` }}>
        <TitleText>
Make a listing for
{` `}
{user.fullName}
        </TitleText>
        <Text>Listing title (60 chars max)</Text>
        <TextInput
          style={{
            height: `10%`,
          }}
          value={this.state.listing_title}
          maxLength={60}
          onChangeText={(listing_title) => this.setState({ listing_title })}
        />
        <Text>Listing description (240 chars max)</Text>

        <TextInput
          style={{
            height: `20%`,
          }}
          multiline
          numberOfLines={5}
          maxLength={240}
          value={this.state.listing_description}
          onChangeText={(listing_description) => this.setState({ listing_description })}
        />

        <Horizontal>
        <Text
          style={{
            alignContent: `flex-start`,
            marginRight: `auto`,
          }}
        >
          Listing price
        </Text>

          <Text>
            £
          </Text>
        <TextInput
          style={{
            height: `80%`, minWidth: 25, width: `50%`,
          }}
          value={this.state.listing_price}
          onChangeText={(listing_price) => this.setState({ listing_price })}
        />
        </Horizontal>

        <Button
          onPress={this._pickImage}
        >
          Pick an image from camera roll
        </Button>
        <Text />
        <Button
          onPress={this.submit}
        >
          Submit
        </Button>

        </ScrollView>
        </SafeAreaView>
    )
  }

    submit = async () => {
      const params = this.state

      await ApiManager.marketplace.postListing(params)
    }

    _pickImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      })

      if (!result.cancelled) {
        this.setState({
          listing_image: result.uri,
        })
      }
    };
}

// export default MakeListingScreen
export default connect(
  MakeListingScreen.mapStateToProps,
)(MakeListingScreen)
