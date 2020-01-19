import { MaterialCommunityIcons } from "@expo/vector-icons"
import PropTypes from "prop-types"
import React from "react"
import { Image, StyleSheet, View, Alert, DeviceEventEmitter } from 'react-native'

import { ApiManager } from "../../lib"
import Styles from "../../styles/Containers"
import { SmallButton } from "../Button"
import { Horizontal, Spacer } from "../Containers"
import {
  SearchResultBottomText, SubtitleText,
} from "../Typography"
import Card from "."

const styles = StyleSheet.create({
  emptyImage: {
    height: 200,
    marginTop: 25,
  },
  listingView: {
    flex: 1,
    marginLeft: 8,
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
  deleteable,
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
      <View style={styles.listingView}>
        <SubtitleText>
          <MaterialCommunityIcons name="currency-gbp" />
          {listingPrice}
        </SubtitleText>
        <SearchResultBottomText>{listingDescription}</SearchResultBottomText>
        <Spacer/>
      </View>
      </Horizontal>
      {deleteable ? (
        <SmallButton onPress={() => deleteListing(listingId, navigation)}>
          Delete Item
        </SmallButton>
      ) : null}


    </Card>
)

const deleteListing = async (listingId, navigation) => {
  Alert.alert(
    'Are you sure you want to delete this listing?',
    'This cannot be reversed!',
    [
      {text: 'Yes', onPress: () => {
        ApiManager.marketplace.deleteListing(listingId) 
        // DeviceEventEmitter.emit('listener-fuck-you-no-ads-please', (e)=>{})
        navigation.goBack()
        navigation.navigate('OwnListings')

      }
      },
      {text: 'No', onPress:() => console.log('Cancel pressed'), style: 'cancel',},
    ],
  );
  
}


MarketplaceCard.propTypes = {
  authorEmail: PropTypes.string,
  authorName: PropTypes.string,
  listingDescription: PropTypes.string,
  listingId: PropTypes.string,
  listingImage: PropTypes.string,
  listingPrice: PropTypes.string,
  listingTitle: PropTypes.string,
  navigation: PropTypes.func,
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
