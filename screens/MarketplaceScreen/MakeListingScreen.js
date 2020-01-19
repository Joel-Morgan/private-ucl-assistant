// import PropTypes from "prop-types"
import * as ImagePicker from 'expo-image-picker'
import React, { Component } from "react"
import {
  Button, SafeAreaView, ScrollView, Text,
} from 'react-native'
import { connect } from "react-redux"

import { TextInput } from "../../components/Input"
import { TitleText } from "../../components/Typography"
import { ApiManager } from "../../lib"


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

    return (
        <SafeAreaView style={{ alignItems: `center`, flex: 1, justifyContent: `center` }}>
        <ScrollView>
        <TitleText>Make a Listing</TitleText>
        <Text>{user.fullName}</Text>
        <Text>Listing title</Text>
        <TextInput
          style={{
            borderColor: `gray`, borderWidth: 1, height: 40, margin: 15, width: `80%`,
          }}
          value={this.state.listing_title}
          onChangeText={(listing_title) => this.setState({ listing_title })}
        />
        <Text>Listing description</Text>

        <TextInput
          style={{
            borderColor: `gray`, borderWidth: 1, height: 80, margin: 15, width: `80%`,
          }}
          multiline
          numberOfLines={4}
          value={this.state.listing_description}
          onChangeText={(listing_description) => this.setState({ listing_description })}
        />

        <Text>Listing price</Text>

        <TextInput
          style={{
            borderColor: `gray`, borderWidth: 1, height: 40, margin: 15, width: `20%`,
          }}
          value={this.state.listing_price}
          onChangeText={(listing_price) => this.setState({ listing_price })}
        />

        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        <Text />
        <Button
          title="Submit"
          onPress={this.submit}
        />

        </ScrollView>

        </SafeAreaView>
    )
  }

    submit = async () => {
      const params = this.state

      await ApiManager.marketplace.postListing(params)
    }

    _pickImage = async () => {
      console.log(this.state.listing_title)
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      })

      console.log(result)

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
