import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';

const UserList = () => {
  const initialList = [
    {
      Name: "Pratyush",
      Phone: "6205453460",
      Email: "pratyush1662@gmail.com",
      Type: "Recruiter",
      Location: "Gurgaon",
      Function: "Talent Acquisition"
    },
    {
      Name: "Ayushi",
      Phone: "8210063475",
      Email: "ayushi1662@gmail.com",
      Type: "Employee",
      Location: "Noida",
      Function: "Software Tester"
    },
    {
      Name: "Anand",
      Phone: "8210063475",
      Email: "anand1662@gmail.com",
      Type: "Manager",
      Location: "Hyderabad",
      Function: "Project Manager"
    },
    {
      Name: "Henry",
      Phone: "8210063475",
      Email: "henry1662@gmail.com",
      Type: "Founder",
      Location: "Mumbai",
      Function: "Management"
    }
  ];

  const [userList, setUserList] = useState(initialList);
  const [filteredUsers, setFilteredUsers] = useState(initialList);
  const [searchText, setSearchText] = useState("");
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [currentUser, setCurrentUser] = useState(null);


 

  const handleSearchTextChange = (e) => {
    const newSearchText = e.target.value;
    setSearchText(newSearchText);

    const filtered = userList.filter(user =>
      user.Email.toLowerCase().includes(newSearchText.toLowerCase())
    );

    setFilteredUsers(filtered);
  };

  const handleSuggestionClick = (email) => {
    const user = userList.find(user => user.Email === email);
    setSearchText(user.Email);
    setFilteredUsers([user]);
  };

  const handleAddClick = () => {
    setIsAddClicked(true);
    setFormMode('add');
    setCurrentUser(null);
  };

  const handleEditClick = (user) => {
    setIsAddClicked(true);
    setFormMode('edit');
    setCurrentUser(user);
  };

  const handleCancel = () => {
    setIsAddClicked(false);
    setCurrentUser(null);
  };

  const handleFormSubmit = (newUser) => {
    if (formMode === 'add') {
      if (userList.some((u) => u.Email === newUser.Email)) {
        alert('Duplicate email is not allowed');
        return;
      }
      setUserList((prevUserList) => {
        const updatedList = [...prevUserList, newUser];
        setFilteredUsers(updatedList);
        return updatedList;
      });
    } else if (formMode === 'edit') {
      setUserList(prevUserList => {
        const updatedList = prevUserList.map(u =>
          u.Email === currentUser.Email ? newUser : u
        );
        setFilteredUsers(updatedList);
        return updatedList;
      });
    }
    setIsAddClicked(false);
  };

  return (
    isAddClicked ? (
      <UserForm onSubmit={handleFormSubmit} initialValues={currentUser || {}} onCancel={handleCancel} />
    ) : (
      <div className='p-5 flex-col'>
        <div className='flex justify-between'>
          <h2 className='p-2 font-bold self-center text-2xl text-green-500'>Manage Users</h2>
          <button onClick={handleAddClick} className='p-2 border-4 bg-green-500 flex justify-between'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill self-center" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
            </svg>
            <span className='pl-2'>Add</span>
          </button>
        </div>

        <div className='flex flex-col mt-5'>
          <input
            className='p-2 border-2 border-gray-200 rounded-md'
            type='text'
            placeholder='Search by email'
            value={searchText}
            onChange={handleSearchTextChange}
          />
          {searchText && (
            <ul className='border border-gray-200 mt-2'>
              {filteredUsers.map((user, index) => (
                <li
                  key={index}
                  className='p-2 hover:bg-gray-200 cursor-pointer'
                  onClick={() => handleSuggestionClick(user.Email)}
                >
                  {user.Email} - {user.Name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className='container mx-auto my-8'>
          <table className='min-w-full border-collapse'>
            <thead>
              <tr>
                <th className='py-2 px-4 border-b'>Name</th>
                <th className='py-2 px-4 border-b'>Phone</th>
                <th className='py-2 px-4 border-b'>Email</th>
                <th className='py-2 px-4 border-b'>Role</th>
                <th className='py-2 px-4 border-b'>Location</th>
                <th className='py-2 px-4 border-b'>Department</th>
                <th className='py-2 px-4 border-b'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td className='py-2 px-4 border-b'>{user.Name}</td>
                  <td className='py-2 px-4 border-b'>{user.Phone}</td>
                  <td className='py-2 px-4 border-b'>{user.Email}</td>
                  <td className='py-2 px-4 border-b'>{user.Type}</td>
                  <td className='py-2 px-4 border-b'>{user.Location}</td>
                  <td className='py-2 px-4 border-b'>{user.Function}</td>
                  <td className='py-2 px-4 border-b'>
                    <button
                      className='bg-blue-500 text-white px-4 py-2 rounded'
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
};

export default UserList;
