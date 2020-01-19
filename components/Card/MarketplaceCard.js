import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import PropTypes from "prop-types"
import React from "react"
import { Image, StyleSheet, View } from 'react-native'

import { BodyText, SubtitleText, SearchResultTopText, SearchResultBottomText } from "../Typography"
import Card from "."
import Styles from "../../styles/Containers"
import { Horizontal } from "../Containers"

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
  listingId,
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
          id: listingId,
          image: listingImage,
          price: listingPrice,
          title: listingTitle,
        })
      }}
    >
      <Horizontal>
      <Image 
        source={{ uri: `${listingImage}` }} 
        resizeMethod="resize"
        style={[Styles.image, styles.emptyImage]}
        resizeMode="cover"
      />
      <View style={{flex: 1, marginLeft: 8}}>
        <SearchResultTopText> 
          <MaterialCommunityIcons name="currency-gbp" />
          {listingPrice}
          </SearchResultTopText>
        <SearchResultBottomText>{listingDescription}</SearchResultBottomText>
      </View>
      </Horizontal>
      
    </Card>
)

MarketplaceCard.propTypes = {
  authorEmail: PropTypes.string,
  authorName: PropTypes.string,
  listingDescription: PropTypes.string,
  listingId: PropTypes.string,
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
  listingId: `Error Defaults`,
  listingImage: `Error Defaults`,
  listingPrice: `Error Defaults`,
  listingTitle: `Error Defaults`,
  pubDate: `Error Defaults`,
}

export default MarketplaceCard
