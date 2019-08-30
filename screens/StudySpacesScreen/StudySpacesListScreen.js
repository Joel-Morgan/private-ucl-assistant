// @flow
import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { connect } from "react-redux"
import { generate } from "shortid"
import moment from "moment"
import PropTypes from "prop-types"
import { momentObj } from "react-moment-proptypes"
import memoize from "memoize-one"
import {
  BodyText,
  ErrorText,
} from "../../components/Typography"
import { Page } from "../../components/Containers"
import StudySpaceSearchResult from "./components/StudySpaceResult"
import StudySpaceFilters from './components/StudySpaceFilters'
import { fetchSeatInfos, setSearchQuery, setSortType } from "../../actions/studyspacesActions"
import { matchingStudySpacesSelector } from '../../selectors/studyspacesSelectors'
import { WORKSPACES_SORT_TYPES } from '../../constants/studyspacesConstants'

const styles = StyleSheet.create({
  flatList: {
    paddingVertical: 20,
  },
  page: {
    paddingTop: 0,
  },
})

class StudySpacesListScreen extends React.Component {
  static navigationOptions = {
    title: `All Study Spaces`,
  }

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    studyspaces: PropTypes.arrayOf(PropTypes.shape()),
    setQuery: PropTypes.func,
    searchQuery: PropTypes.string,
    lastUpdated: PropTypes.oneOfType([momentObj, PropTypes.string]),
    token: PropTypes.string,
    fetchInfo: PropTypes.func,
    sortType: PropTypes.string,
    setSort: PropTypes.func,
  }

  static defaultProps = {
    studyspaces: [],
    lastUpdated: null,
    setQuery: () => { },
    searchQuery: ``,
    token: ``,
    fetchInfo: () => { },
    sortType: WORKSPACES_SORT_TYPES.NAME,
    setSort: () => { },
  }

  static mapStateToProps = (state) => {
    const {
      studyspaces: {
        lastStatusUpdate,
        searchQuery = ``,
        sortType,
      },
      user: {
        token,
      },
    } = state
    return {
      studyspaces: matchingStudySpacesSelector(state),
      lastUpdated: lastStatusUpdate,
      token,
      searchQuery,
      sortType,
    }
  }

  static mapDispatchToProps = (dispatch) => ({
    fetchInfo: (ids, token) => dispatch(fetchSeatInfos(token, ids)),
    setQuery: (query: String) => dispatch(setSearchQuery(query)),
    clearQuery: () => dispatch(setSearchQuery(``)),
    setSort: (sortType: String) => dispatch(setSortType(sortType)),
  })

  static findErrorneousSpaces = (spaces) => spaces.filter(
    (space) => typeof space.fetchSeatInfoError === `string`
      && space.fetchSeatInfoError !== ``,
  )

  memoizeErrorneousSpaces = memoize(StudySpacesListScreen.findErrorneousSpaces)

  constructor(props) {
    super(props)
    this.state = {
      loadedSeatInfo: false,
      lastUpdated: `never`,
    }
    this.updateTextInterval = null
  }

  componentDidMount() {
    const { loadedSeatInfo } = this.state
    const { token } = this.props
    if (!loadedSeatInfo && token) {
      this.fetchSeatInfo()
    }
    this.updateTextInterval = setInterval(
      () => this.updateLastUpdatedText(),
      10000,
    )
  }

  componentDidUpdate(prevProps) {
    const { lastUpdated: currentUpdate } = this.props
    if (currentUpdate !== prevProps.lastUpdated) {
      this.updateLastUpdatedText()
    }
  }

  componentWillUnmount() {
    clearInterval(this.updateTextInterval)
  }

  updateLastUpdatedText = () => {
    const { lastUpdated } = this.props
    this.setState({
      lastUpdated: lastUpdated ? moment(lastUpdated).fromNow() : `never`,
    })
  }

  fetchSeatInfo = () => {
    this.setState({ loadedSeatInfo: true }, () => {
      const { studyspaces, fetchInfo, token } = this.props
      const ids = studyspaces.map((space) => space.id)
      setTimeout(() => fetchInfo(ids, token), 500)
    })
  }

  render() {
    const { lastUpdated, loadedSeatInfo } = this.state
    const {
      navigation,
      studyspaces,
      setQuery,
      searchQuery,
      sortType,
      setSort,
    } = this.props
    const errorneousSpaces = this.memoizeErrorneousSpaces(studyspaces)
    const isLoading = !loadedSeatInfo
      || studyspaces.reduce(
        (res, space) => res || space.isFetchingSeatInfo,
        false,
      )
    return (
      <Page
        mainTabPage
        refreshEnabled
        onRefresh={this.fetchSeatInfo}
        refreshing={isLoading}
        keyboardAvoidingViewStyle={styles.page}
        contentContainerStyle={styles.page}
      >
        {errorneousSpaces.length < 5 ? (
          errorneousSpaces.map((space) => (
            <ErrorText key={generate()}>
              Error fetching
              {` `}
              {space.name}
              {` `}
              {space.fetchSeatInfoError}
            </ErrorText>
          ))
        ) : (
            <ErrorText>Looks like there was an error trying to fetch live seating info.</ErrorText>
        )}

        <StudySpaceFilters
          query={searchQuery}
          onChangeQuery={setQuery}
          sortType={sortType}
          updateSortType={setSort}
        />

        <BodyText>
          Last updated:
          {` `}
          {lastUpdated}
        </BodyText>

        <FlatList
          data={studyspaces}
          contentContainerStyle={styles.flatList}
          keyExtractor={(item) => `${item.id}`}
          initialNumToRender={30}
          renderItem={({ item }) => (
            <StudySpaceSearchResult navigation={navigation} id={item.id} />
          )}
        />
      </Page>
    )
  }
}

export default connect(
  StudySpacesListScreen.mapStateToProps,
  StudySpacesListScreen.mapDispatchToProps,
)(StudySpacesListScreen)