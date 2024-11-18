import React from 'react'

export default function Registration() {
  return (
    <div>
         <h1>  Registration FORM</h1>
         <form action='/submit' method='POST'>
         <label htmlFor="username">Name:       </label>
  <input type="text" name="username" id="username" />

  <br />
  <br />
  <label htmlFor="email">Email:             </label>
  <input type="text" name="email" id="email" />
  <br />
  <br />
  <label htmlFor="password">Password:           </label>
  <input type="text" name="password" id="password" />
  <br />
  <br />
  <label htmlFor="coverImage">Cover Image:         </label>
  <input type="file" name="coverImage" id="coverImage" />
  <br />
  <br />
  <label htmlFor="avatar">Avatar:           </label>
  <input type="file" name="avatar" id="avatar" />
  <br />
  <br />

  <input type="submit" value="submit" />
         </form>

    </div>
  )
}
