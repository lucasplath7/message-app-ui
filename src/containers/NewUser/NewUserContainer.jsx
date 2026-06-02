import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions/index.js'
import NewUser from '../../components/NewUser/NewUser.jsx'

function NewUserContainer() {
  const dispatch = useDispatch()
  const { user, loading, error } = useSelector((state) => state.user)

  // Once a user has been successfully created, stop rendering the component
  if (user) return null

  function handleSubmit(userData) {
    dispatch(actions.createUser(userData))
  }

  return (
    <NewUser
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  )
}

export default NewUserContainer

