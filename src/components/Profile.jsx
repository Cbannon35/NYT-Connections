import React from 'react'

import { clearItems } from '../utils/indexedDB'

const Profile = () => {
    return (
        <div>
            <h1>Profile</h1>

            <button onClick={clearItems}>Clear Items</button>
        </div>
    )
}

export default Profile