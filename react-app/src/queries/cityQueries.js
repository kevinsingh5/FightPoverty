import { citiesResponse } from '../static/cities.js'
import { backendAPI }  from '../config.js'

import axios from 'axios';


export const getCities = () => {
  return citiesResponse.objects
}