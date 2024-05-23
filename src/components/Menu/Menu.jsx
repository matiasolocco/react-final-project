import React from 'react'


function Menu({ listUsers }) {
  return (
    <div>
      <h1>Week Menu</h1>
      <ul>
        {listUsers.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
export default Menu
