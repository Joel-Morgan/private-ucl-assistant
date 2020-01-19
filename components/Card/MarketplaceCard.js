import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import PropTypes from "prop-types"
import React from "react"
import { Image, StyleSheet } from 'react-native'

import { BodyText } from "../Typography"
import Card from "."
import Styles from "../../styles/Containers"

const styles = StyleSheet.create({
  emptyImage: {
    height: 200,
    marginTop: 25,
  },
})

const MarketplaceCard = ({
  listingTitle,
  listingDescription,
  listingPrice,
  listingImage,
  key,
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
          id: key,
          image: listingImage,
          price: listingPrice,
          title: listingTitle,
        })
      }}
    >
      <BodyText>
          {listingDescription}
      </BodyText>
      <BodyText>
          <MaterialCommunityIcons name="currency-gbp" />
          {listingPrice}
      </BodyText>
      <Image 
        source={{ uri: `${listingImage}` }} 
        resizeMethod="scale"
        style={[Styles.image, styles.emptyImage]}
        resizeMode="center"
      />
    </Card>
)

MarketplaceCard.propTypes = {
  authorEmail: PropTypes.string,
  authorName: PropTypes.string,
  listingDescription: PropTypes.string,
  key: PropTypes.string,
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
  key: `Error Defaults`,
  listingImage: `Error Defaults`,
  listingPrice: `Error Defaults`,
  listingTitle: `Error Defaults`,
  pubDate: `Error Defaults`,
}

export default MarketplaceCard
