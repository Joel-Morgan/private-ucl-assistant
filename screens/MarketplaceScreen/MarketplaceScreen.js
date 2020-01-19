import { Feather } from "@expo/vector-icons"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { StyleSheet, View } from "react-native"

import { RoundButton, SmallButton } from "../../components/Button"
import MarketplaceCard from "../../components/Card/MarketplaceCard"
import { Horizontal, Page } from "../../components/Containers"
import { Text, TextInput } from '../../components/Input'
import { TitleText } from "../../components/Typography"
import Colors from "../../constants/Colors"
import ApiManager from "../../lib/ApiManager"

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  marketplace:
    {
      marginRight: `auto`,
    },
  newItem:
    {
      marginLeft: `auto`,
    },
  textInput: {
    flex: 1,
    marginRight: 10,
  },


})

const SEARCH_DELAY = 250


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


  onChangeText = (searchstring) => {
    this.setState({ search: searchstring })
    clearTimeout(this.searchTimer)
    this.searchTimer = setTimeout(
      () => this.repopulate(),
      SEARCH_DELAY,
    )
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
                <RoundButton
                  icon="plus"
                  style={styles.newItem}
                  onPress={this.navigateToMakeListing}
                  buttonColor={Colors.accentColor}
                />
                <Feather name="user" size={32} onPress={() => navigation.navigate(`OwnListings`)} />


                  </Horizontal>
                  <View>
                    <Horizontal>
                      <TextInput
                        style={styles.textInput}
                        placeholder="Search for a listing..."
                        onChangeText={
                          (searchInput) => this.onChangeText(searchInput)
}
                        clearButtonMode="always"
                        value={search}
                        // ref={this.searchInput}
                      />
                      {search.length > 0 ? (
                        <SmallButton onPress={this.clear}>Clear</SmallButton>
                      ) : null}
                    </Horizontal>


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
                    />
                  ))}
                </View>
            </Page>
      )
    }
}


export default MarketplaceScreen
