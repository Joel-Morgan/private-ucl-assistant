import PropTypes from "prop-types"
import React, { Component } from "react"
import { StyleSheet, View } from "react-native"

import { SmallButton } from "../../components/Button"
import MarketplaceCard from "../../components/Card/MarketplaceCard"
import { Horizontal, Page } from "../../components/Containers"
// import { SearchInput } from "../../components/Input"
import { TextInput } from '../../components/Input'
import { TitleText } from "../../components/Typography"
import ApiManager from "../../lib/ApiManager"

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },

  textInput: {
    flex: 1,
    marginRight: 10,
  },
})


class MarketplaceScreen extends Component {
  static propTypes = {
    clear: PropTypes.func,
    navigation: PropTypes.func,
  }

  static defaultProps = {
    clear: () => {
    },
    navigation: () => {
    },
  }


  constructor(props) {
    super(props)
    this.state = {
      listingsList: [],
      search: ``,
    }
  }

  componentDidMount() {
    ApiManager.marketplace
      .getListings()
      .then((listing) => {
        this.setState({ listingsList: listing })
      })
  }


  navigateToMakeListing = () => {
    const { navigation: { navigate } } = this.props
    navigate(`MakeListing`)
  }

  onQueryChange = (query) => {
    clearTimeout(this.searchTimer)
    this.searchTimer = setTimeout(
      () => console.log(query),
      this.SEARCH_DELAY,
    )
    // this.setState({ query })
  }


  // onChangeText = (searchstring: String) => {
  //   if (searchstring.length >= MIN_QUERY_LENGTH) {
  //     clearTimeout(this.searchTimer)
  //     this.searchTimer = setTimeout(
  //       () => console.log(`gi`),
  //       SEARCH_DELAY,
  //     )
  //   }
  //   this.setState({ search: searchstring })
  // }

  onQueryChange = (search) => {
    this.setState({ search })
  }

  // clear = () => this.setState({ listingsList: [], search: `` })
  clear = () => {
    console.log(`hi:`)
    const { clear } = this.props
    clear()
    this.setState({ listingsList: [], search: `` })
    console.log(this.state)
  }

    static navigationOptions = {
      title: `Marketplace`,
    }

    render() {
      const { listingsList, search } = this.state
      return (
            <Page>
                <View style={styles.container}>
                <TitleText>Marketplace</TitleText>

                  <View>
                    <Horizontal>
                      <TextInput
                        style={styles.textInput}
                        placeholder="Search for a listing..."
                        onChangeText={this.onQueryChange}
                        clearButtonMode="always"
                        value={search}
                        // ref={this.searchInput}
                      />
                      {search.length > 0 ? (
                        <SmallButton onPress={this.clear}>Clear</SmallButton>
                      ) : null}
                    </Horizontal>
                  </View>

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
                    <SmallButton onPress={this.navigateToMakeListing}>
                      Post an item
                    </SmallButton>
            </Page>
      )
    }
}

export default MarketplaceScreen
