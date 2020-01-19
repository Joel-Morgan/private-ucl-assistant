// import PropTypes from "prop-types"
import React, { Component } from "react"
import { StyleSheet, View } from "react-native"

import MarketplaceCard from "../../components/Card/MarketplaceCard"
import { Page } from "../../components/Containers"
import { TitleText } from "../../components/Typography"
import ApiManager from "../../lib/ApiManager"
import { SearchInput } from "../../components/Input";

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
})

const MIN_QUERY_LENGTH = 4
const SEARCH_DELAY = 500

class MarketplaceScreen extends Component {
  constructor() {
    super()
    this.state = {
      listingsList: [],
      search: '',
    }
  }

  componentDidMount() {
    ApiManager.marketplace
      .getListings()
      .then((listing) => {
        this.setState({ listingsList: listing })
      })
  }

  onChangeText = (searchstring: String) => {
    if (searchstring.length >= MIN_QUERY_LENGTH) {
      clearTimeout(this.searchTimer)
      this.searchTimer = setTimeout(
        () => console.log("gi"),
        SEARCH_DELAY,
      )
    }
    this.setState({ search: searchstring })
  }

  clear = () => this.setState({ search: ``, listingsList: [] })

    static navigationOptions = {
      title: `Marketplace`,
    }

    render() {
      const { listingsList, search } = this.state
      return (
            <Page>
                <View style={styles.container}>
                <TitleText>Marketplace</TitleText>
                <SearchInput
                  placeholder="Search for a listing title..."
                  // onChangeQuery={this.onChangeText}
                  clear={ console.log("no u") }
                />
                </View>
                
                    {listingsList.map((listing) => (
                      <MarketplaceCard
                        listingTitle={listing.listing_title}
                        listingDescription={listing.listing_description}
                        listingPrice={listing.listing_price}
                        listingImage={listing.listing_image}
                        listingID={listing.listingID}
                        authorName={listing.author_name}
                        authorEmail={listing.author_email}
                        pubDate={listing.pub_date}
                      />
                    ))}
            </Page>
      )
    }
}

export default MarketplaceScreen
