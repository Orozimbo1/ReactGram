// Redux
import { resetMessage } from "../slices/photoSlice"

const useResetComponentMessage = (dispatch) => {
  return () => {
    setTimeout(() => {
      dispatch(resetMessage())
    }, 2000)
  }
}

export default useResetComponentMessage