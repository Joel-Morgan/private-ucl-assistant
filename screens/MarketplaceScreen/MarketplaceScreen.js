// import PropTypes from "prop-types"
import React, { Component } from "react"

// import { MarketplaceCard } from "../../components/Card/MarketplaceCard"
import { Page } from "../../components/Containers"
import { TitleText } from "../../components/Typography"
// import ApiManager from "../../lib/ApiManager"

export class MarketplaceScreen extends Component {
//   constructor() {
//     super()
//     // this.state = {
//     //   listings: [],
//     // }
//   }

    static navigationOptions = {
      header: null,
      title: `Marketplace`,
    }

    render() {
      return (
            <Page>
                <TitleText>Marketplace</TitleText>
            </Page>
      )
    }
}

export default MarketplaceScreen
