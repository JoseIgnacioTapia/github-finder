import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGithubUsersItems } from '../../features/github/githubUsers.js';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';

function UserResults() {
  const { users, loading } = useSelector(state => state.githubApi);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGithubUsersItems());
  }, [dispatch]);

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default UserResults;
