import axios from "axios";
const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'
const options = {
  params: {
    bl_latitude: '11.847676',
    tr_latitude: '12.838442',
    bl_longitude: '109.095887',
    tr_longitude: '109.149359',

  },
  headers: {
    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
    'x-rapidapi-key': '180d308f58msh50d1a7ece6642ffp15bdedjsn56bd27c194fa'
  }
};
export const getPlacesData = async (type, ne, sw) => {
  // console.log(ne.lng,sw)
  let bllat = sw.lat
  let bllng = sw.lng
  let trlat = ne.lat
  let trlng = ne.lng
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: bllat,
        tr_latitude: trlat,
        bl_longitude: bllng,
        tr_longitude: trlng,

      },
      headers: {
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': 'bc911b1621mshd72a3541ac45f0ap132a14jsn61342dc8d4d9'
      }
    })
    //  console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}