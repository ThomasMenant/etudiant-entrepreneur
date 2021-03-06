import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function careerReducer(state = initialState.career, action) {
  switch (action.type) {
    case types.UPDATE_CAREER:
    case types.LOAD_CAREER_SUCCESS:
      return Object.assign({}, state.career, action.career )
    default:
      return state
  }
}
