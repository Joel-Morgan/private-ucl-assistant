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
  // listingID,
  authorName,
  authorEmail,
  pubDate,
}) => (
    <Card
      title={listingTitle}
      //  Have onpress leave the app and go to the Events page
       // onPress={() => { navigation.navigate(`ListingDetail`, {
       //  Identity: listingID,
       // }).catch((err) =>
     // console.error(`An error occurred`, err)) }}
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
          <Feather name="calendar" />
          {pubDate}
      </BodyText>

      <Image style={imgstyles.shooow} source={{ uri: `${listingImage}` }} />


    </Card>
)

MarketplaceCard.propTypes = {
  authorEmail: PropTypes.string,
  authorName: PropTypes.string,
  listingDescription: PropTypes.string,
  listingImage: PropTypes.string,
  listingPrice: PropTypes.string,
  listingTitle: PropTypes.string,
  pubDate: PropTypes.string,
}

MarketplaceCard.defaultProps = {
  authorEmail: `Error Defaults`,
  authorName: `Error Defaults`,
  listingDescription: `Error Defaults`,
  listingImage: `Error Defaults`,
  listingPrice: `Error Defaults`,
  listingTitle: `Error Defaults`,
  pubDate: `Error Defaults`,
}

export default MarketplaceCard
