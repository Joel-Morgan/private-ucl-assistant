import { Feather } from "@expo/vector-icons"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { StyleSheet, View } from "react-native"

import { SmallButton } from "../../components/Button"
import MarketplaceCard from "../../components/Card/MarketplaceCard"
import { Horizontal, Page } from "../../components/Containers"
import { Text, TextInput } from '../../components/Input'
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

const MIN_QUERY_LENGTH = 1
const SEARCH_DELAY = 500

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
    this.repopulate()
  }

  repopulate = () => {
    const { search } = this.state
    ApiManager.marketplace
      .getListings(search)
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


  onChangeText = (searchstring: String) => {
    this.setState({ search: searchstring })

    if (searchstring.length >= MIN_QUERY_LENGTH) {
      clearTimeout(this.searchTimer)
      this.searchTimer = setTimeout(
        () => this.repopulate(),
        SEARCH_DELAY,
      )
    }
  }

  // onQueryChange = (search) => {
  //   this.setState({ search })
  // }

  // clear = () => this.setState({ listingsList: [], search: `` })
  clear = () => {
    const { clear } = this.props
    clear()
    this.setState({ listingsList: [], search: `` })
    setTimeout(() => this.repopulate(), 100)
  }

    static navigationOptions = {
      header: null,
    }

    render() {
      const { listingsList, search } = this.state
      const { navigation } = this.props
      return (
            <Page
              mainTabPage
              refreshEnabled
              onRefresh={this.repopulate}
            >
                <View style={styles.container}>
                  <Horizontal style={{ flex: 1, justifyContent: `space-between` }}>
                <TitleText>Marketplace</TitleText>
                <Feather name="user" size={32} onPress={() => navigation.navigate(`OwnListings`)} />

                  </Horizontal>
                  <View>
                    <Horizontal>
                      <TextInput
                        style={styles.textInput}
                        placeholder="Search for a listing..."
                        onChangeText={(search) => this.onChangeText(search)}
                        clearButtonMode="always"
                        value={this.state.search}
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
                        authorName={listing.author_name}
                        authorEmail={listing.author_email}
                        pubDate={listing.pub_date}
                        navigation={navigation}
                        listingId={listing.listing_id}
                        deleteable={false}
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
