import * as PostApi from '../api/PostRequest.js'
export const getTimeLinePosts = (id) => async (dispatch) => {
    dispatch({ type: "RETRIEVING_START" })
    try {
        const { data } = await PostApi.getTimeLinePosts(id)
        // console.log('timeline server se nikal raha hu',data)
        dispatch({ type: "RETRIEVING_SUCCESS", data: data })
    } catch (error) {
        dispatch({ type: "RETRIEVING_FAIL" })
        console.log(error)
    }
}