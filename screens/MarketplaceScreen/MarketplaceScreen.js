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

  componentDidMount() {
    ApiManager.marketplace
      .getListings()
      .then((listing) => {
        this.setState({ listingsList: listing })
      })
  }

    static navigationOptions = {
      title: `Marketplace`,
    }

    render() {
      const { listingsList } = this.state
      return (
            <Page>
                <TitleText>Marketplace</TitleText>
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
