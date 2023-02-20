import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getGithubUsersSearch } from '../../features/github/githubUsers';
import { setAlert, clearAlert } from '../../features/alert/alert';

function UserSearch() {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const handleChange = e => setText(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();

    if (text === '') {
      dispatch(setAlert({ message: 'Please enter something', type: 'error' }));

      setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
    } else {
      dispatch(getGithubUsersSearch(text));

      setText('');
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="Search"
                value={text}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserSearch;
