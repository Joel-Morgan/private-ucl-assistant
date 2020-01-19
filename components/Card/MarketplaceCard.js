import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import PropTypes from "prop-types"
import React from "react"
import { Image, StyleSheet } from 'react-native'

import { BodyText } from "../Typography"
import Card from "."

const imgstyles = StyleSheet.create({
  shooow: {
    height: 200,
    width: 50,
  },
})

const MarketplaceCard = ({
  listingTitle,
  listingDescription,
  listingPrice,
  listingImage,
  listingID,
  authorName,
  authorEmail,
  pubDate,
  navigation,
}) => (
    <Card
      title={listingTitle}
      // Have onpress leave the app and go to the listings page
      onPress={() => {
        navigation.navigate(`ListingDetail`, {
          authorEmail,
          authorName,
          date: pubDate,
          description: listingDescription,
          id: listingID,
          image: listingImage,
          price: listingPrice,
          title: listingTitle,
        })
      }}
    >
      <BodyText>
          <Feather name="user" />
          {authorName}
      </BodyText>
      <BodyText>
          {listingDescription}
      </BodyText>
      <BodyText>
          {authorEmail}
      </BodyText>
      <BodyText>
          <MaterialCommunityIcons name="currency-gbp" />
          {listingPrice}
      </BodyText>

      <BodyText>
          <Feather name="date-range" />
          {` `}
          {pubDate.substring(0, 10)}
      </BodyText>

      <Image style={imgstyles.shooow} source={{ uri: `${listingImage}` }} />


    </Card>
)

MarketplaceCard.propTypes = {
  authorEmail: PropTypes.string,
  authorName: PropTypes.string,
  listingDescription: PropTypes.string,
  listingID: PropTypes.string,
  listingImage: PropTypes.string,
  listingPrice: PropTypes.string,
  listingTitle: PropTypes.string,
  navigation: PropTypes.shape().isRequired,
  pubDate: PropTypes.string,
}

MarketplaceCard.defaultProps = {
  authorEmail: `Error Defaults`,
  authorName: `Error Defaults`,
  listingDescription: `Error Defaults`,
  listingID: `Error Defaults`,
  listingImage: `Error Defaults`,
  listingPrice: `Error Defaults`,
  listingTitle: `Error Defaults`,
  pubDate: `Error Defaults`,
}

export default MarketplaceCard
