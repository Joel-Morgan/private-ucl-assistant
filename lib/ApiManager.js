import axios from "axios"
import { encode as btoa } from "base-64"

import {
  EQUIPMENT_URL,
  FREE_ROOMS_URL,
  LISTINGS_URL,
  ROOMBOOKINGS_URL,
  ROOMS_URL,
  SITES_URL,
  TIMETABLE_URL,
  WORKSPACES_URL,
} from "../constants/API"
import ErrorManager from "./ErrorManager"
import LocalisationManager from './LocalisationManager'


const roomsController = {
  getBookings: async (
    token = null,
    {
      roomid,
      siteid,
      date = LocalisationManager.getMoment().format(`YYYYMMDD`),
    },
  ) => {
    if (!roomid || !siteid) {
      throw new Error(`Must specify roomid and siteid`)
    }
    try {
      const results = await axios.get(ROOMBOOKINGS_URL, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          date,
          roomid,
          siteid,
        },
      })
      if (!results.data.content.ok) {
        throw new Error(results.data.content.error)
      }
      return results.data.content.bookings
    } catch (error) {
      ErrorManager.captureError(error)
      throw error
    }
  },
  getEmptyRooms: async (
    token = null,
    {
      startDateTime = (new Date()).toISOString(),
      endDateTime = (
        LocalisationManager
          .getMoment()
          .add(1, `hours`)
          .toISOString()
      ),
    } = {},
  ) => {
    try {
      const results = await axios.get(FREE_ROOMS_URL, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          endDateTime,
          startDateTime,
        },
      })
      if (!results.data.content.ok) {
        throw new Error(results.data.content.error)
      }
      return results.data.content.free_rooms
    } catch (error) {
      ErrorManager.captureError(error)
      throw error
    }
  },
  getEquipment: async (token = null, { roomid, siteid }) => {
    if (!roomid || !siteid) {
      throw new Error(`Must specify roomid and siteid`)
    }
    try {
      const results = await axios.get(EQUIPMENT_URL, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          roomid,
          siteid,
        },
      })
      if (!results.data.content.ok) {
        throw new Error(results.data.content.error)
      }
      return results.data.content.equipment
    } catch (error) {
      ErrorManager.captureError(error)
      throw error
    }
  },
  getSites: async (token = null) => {
    try {
      const results = await axios.get(SITES_URL, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      if (!results.data.content.ok) {
        throw new Error(results.data.content.error)
      }
      return results.data.content.sites
    } catch (error) {
      ErrorManager.captureError(error)
      throw error
    }
  },
  search: async (token = null, query) => {
    if (query && query.length < 3) {
      return {}
    }
    try {
      const results = await axios.get(ROOMS_URL, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          query,
        },
      })
      if (!results.data.content.ok) {
        throw new Error(results.data.content.error)
      }
      return results.data.content.rooms
    } catch (error) {
      ErrorManager.captureError(error)
      throw error
    }
  },
}

const workspacesApi = axios.create({
  baseURL: WORKSPACES_URL,
})

const workspacesController = {
  getLiveImage: async (token = null, { surveyId, mapId }) => {
    try {
      const result = await workspacesApi.get(`/getliveimage/map.svg`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          map_id: mapId,
          survey_id: surveyId,
        },
        responseType: `arraybuffer`,
      })
      const image = btoa(
        new Uint8Array(result.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ``,
        ),
      )
      // there may be no need to base64 SVGs
      // but I have yet to test this extensively
      // https://css-tricks.com/probably-dont-base64-svg/
      return `data:image/svg+xml;base64,${image}`
    } catch (error) {
      ErrorManager.captureError(error)
      throw error
    }
  },
  getSummary: async (token = null) => {
    try {
      const { data, headers } = await workspacesApi.get(`/summary`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      if (!data.content || data.error !== ``) {
        throw new Error(data.error || `There was a problem`)
      }
      return {
        data: data.content,
        lastModified: LocalisationManager.parseToMoment(
          headers[`last-modified`],
        ),
      }
    } catch (error) {
      ErrorManager.captureError(error)
      throw error
    }
  },
  getWorkspaces: async (token = null) => {
    try {
      const { data, headers } = await workspacesApi.get(`/`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      if (!data.content || data.error !== ``) {
        throw new Error(data.error)
      }
      return {
        data: data.content,
        lastModified: LocalisationManager.parseToMoment(
          headers[`last-modified`],
        ),
      }
    } catch (error) {
      ErrorManager.captureError(error)
      throw error
    }
  },
}

const timetableApi = axios.create({
  baseURL: TIMETABLE_URL,
})

const timetableController = {
  getPersonalTimetable: async (
    token = null,
    date = LocalisationManager.getMoment(),
  ) => {
    const datePart = date ? `?date=${date.format(`YYYY-MM-DD`)}` : ``
    const headers = {
      authorization: `Bearer ${token}`,
    }
    ErrorManager.addDetail({ headers })
    const results = await timetableApi.get(datePart, { headers })
    if (!results.data.content.ok || results.data.error !== ``) {
      throw new Error(
        results.data.error
        || `There was a problem fetching your personal timetable`,
      )
    }
    const { data: { content: { timetable } } } = results
    Object.keys(timetable).forEach((day) => {
      const dayTimetable = timetable[day]
      timetable[day] = {
        lastModified: LocalisationManager.parseToMoment(
          results.headers[`last-modified`],
        ),
        timetable: dayTimetable,
      }
    })
    return timetable
  },
  getPersonalWeekTimetable: async (
    token = null,
    date = LocalisationManager.getMoment().startOf(`isoweek`),
  ) => {
    const queryParam = `?date=${date.format(`YYYY-MM-DD`)}`
    const headers = {
      authorization: `Bearer ${token}`,
    }
    ErrorManager.addDetail({ headers })
    const results = await timetableApi.get(`/week/${queryParam}`, {
      headers,
    })
    if (results.data.error !== ``) {
      throw new Error(
        results.data.error
        || `An error occurred when fetching your personal weekly timetable`,
      )
    }
    const { data: { content: { timetable } } } = results
    // eslint-disable-next-line sonarjs/no-identical-functions
    Object.keys(timetable).forEach((day) => {
      const dayTimetable = timetable[day]
      timetable[day] = {
        lastModified: LocalisationManager.parseToMoment(
          results.headers[`last-modified`],
        ),
        timetable: dayTimetable,
      }
    })
    return timetable
  },
}

const marketplaceController = {
  deleteListing: async (listingId) => {
    
    axios.delete(`${LISTINGS_URL}/${listingId.toString()}`)
    console.log(listingId)
  },
  getListings: async (params) => {
    const results = await axios.get(`${LISTINGS_URL}?search=${params}`)
    if (!results.data) {
      throw new Error(results.data)
    }
    return results.data
  },
  getOwnListings: async (user_email, params) => {
    const results = await axios.get(`${LISTINGS_URL}?search=${params}&user=${user_email}`)
    if (!results.data) {
      throw new Error(results.data)
    }
    return results.data
  },
  getSingleListing: async (
    listingid,
  ) => {
    const results = await axios.get(`${LISTINGS_URL}/${listingid}`)
    if (results.data.error !== ``) {
      throw new Error(
        results.data.error
        || `Cannot fetch listing`,
      )
    }
    return results.data.content
  },
  postListing: async (
    listing,
  ) => {
    const formData = new FormData()
    formData.append(`author_email`, listing.author_email)
    formData.append(`author_name`, listing.author_name)
    formData.append(`listing_title`, listing.listing_title)
    formData.append(`listing_description`, listing.listing_description)
    formData.append(`listing_price`, listing.listing_price)
    let ext = listing.listing_image.split(`.`)
    ext = ext[ext.length - 1]
    formData.append(`listing_image`,
      {
        name: `image.${ext}`,
        type: `image/${ext}`,
        uri: listing.listing_image,
      })
    console.log(formData)
    return axios.post(LISTINGS_URL, formData, {
      headers: {
        Accept: `application/json`,
        'Content-Type': `multipart/form-data`,
      },
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err.response)
    })
  },
}

export default {
  marketplace: marketplaceController,
  rooms: roomsController,
  timetable: timetableController,
  workspaces: workspacesController,
}
