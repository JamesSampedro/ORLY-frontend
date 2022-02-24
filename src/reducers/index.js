import {combineReducers} from 'redux'

import contactUs from './contactUs';
import users from './users'
import auth from './Auth'
import services from './Services'
import admin from './Admin'

export const reducers =  combineReducers({
    contactUs,
    users,
    auth,
    services,
    admin
})

