import { charitiesResponse } from '../static/charities.js'
import { backendAPI }  from '../config.js'

import axios from 'axios';


export const getCharities = () => {
  return charitiesResponse.objects
}