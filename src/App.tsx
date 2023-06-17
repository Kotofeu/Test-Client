import { Router } from './Router';
import { observer } from 'mobx-react-lite'
import './styles/style.scss'
import useRequest from './utils/hooks/useRequest';
import { check, getUserById } from './http/userAPI';
import { useEffect } from 'react';
import { userStore } from './store';
import Loader from './UI/Loader/Loader';
const App = observer(() => {
  const [
    user,
    userIsLoading,
    userError,
    userChekExecute
  ] = useRequest<any>(check);
  useEffect(() => {
    userChekExecute();
  }, [])
  useEffect(() => {
    if (user?.id && !userError) {
      if (user.role) {
        userStore.setIsAdmin(user.role)
      }
      getUserById(user.id).then(data => userStore.setUser(data))
    }
  }, [user])
  if (userIsLoading) {
    return (
      <Loader />
    )
  }
  return (
    <Router />
  );
})

export default App;
