// import PropTypes from "prop-types"
import React, { Component } from "react"

import MarketplaceCard from "../../components/Card/MarketplaceCard"
// import { MarketplaceCard } from "../../components/Card/MarketplaceCard"
import { Page } from "../../components/Containers"
import { TitleText } from "../../components/Typography"
import ApiManager from "../../lib/ApiManager"

class MarketplaceScreen extends Component {
  constructor() {
    super()
    this.state = {
      listingsList: [],
    }
  }

  async componentDidMount() {
    ApiManager.marketplace
      .getListings()
      .then((listing) => {
        this.setState({ listingsList: listing })
      })
  }

    static navigationOptions = {
      header: null,
    }

    render() {
      const { listingsList } = this.state
      const { navigation } = this.props
      return (
            <Page mainTabPage>
                <TitleText>Marketplace</TitleText>
                    {listingsList.map((listing) => (
                      <MarketplaceCard
                        key={listing.listingID}
                        listingTitle={listing.listing_title}
                        listingDescription={listing.listing_description}
                        listingPrice={listing.listing_price.toString()}
                        listingImage={listing.listing_image}
                        listingID={listing.listing_id}
                        authorName={listing.author_name}
                        authorEmail={listing.author_email}
                        pubDate={listing.pub_date}
                        navigation={navigation}
                      />
                    ))}
            </Page>
      )
    }
}

export default MarketplaceScreen
