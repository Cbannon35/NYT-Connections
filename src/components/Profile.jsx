import React, { useState, useEffect, useMemo, useRef } from 'react'
import { clearItems, getItem } from '../utils/indexedDB'
import { END_DATE } from '../utils/constants'
import { motion } from 'framer-motion'
import { minidenticon } from 'minidenticons'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import BottomSheet from './BottomSheet';

const MinidenticonImg = ({ username, saturation, lightness, ...props }) => {
    const svgURI = useMemo(
        () => 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(username, saturation, lightness)),
        [username, saturation, lightness]
    )
    return (<img src={svgURI} alt={username} {...props} />)
}

const formatDate = (date) => {
    return date.toISOString().split('T')[0]
}

const Profile = () => {
    // look in localStorage for username
    const storage_name = localStorage.getItem('username')
    const [username, setUsername] = useState(storage_name !== null ? storage_name : 'username')
    const [deleteDrawerOpen, setDeleteDrawerOpen] = useState(false)

    const [gamesCompleted, setGamesCompleted] = useState(0)
    const [gamesStarted, setGamesStarted] = useState(0)
    const [gamesWon, setGamesWon] = useState(0)
    const [gamesLost, setGamesLost] = useState(0)
    const [totalGames, setTotalGames] = useState(0)

    useEffect(() => {
        let startDate = new Date(END_DATE)
        let endDate = new Date()
        let total = 0
        for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
            let date = formatDate(new Date(d))
            total++
            getItem(date).then((game) => {
                if (game !== undefined && game.game !== undefined) {
                    setGamesStarted(started => started + 1)
                    if (game.game.solved) {
                        setGamesWon(won => won + 1)
                        setGamesCompleted(completed => completed + 1)
                    }
                    if (game.game.lost) {
                        setGamesLost(lost => lost + 1)
                        setGamesCompleted(completed => completed + 1)
                    }
                }
            })
        }
        setTotalGames(total)
    }, [])



    const setRandomUsername = () => {
        // random string with random length between 5 and 10
        const randomUsername = Math.random().toString(36).substring(2, Math.floor(Math.random() * 6) + 5)
        setUsername(randomUsername)
        localStorage.setItem('username', randomUsername)
    }
    return (
        <>
            <div className='flex flex-col justify-center items-center mt-20 gap-4'>
                <MinidenticonImg username={username} saturation={90} lightness={50} width={128} height={128} className="rounded-full border-black border-2" />

                <button onClick={() => setRandomUsername()}><svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></button>

                <>
                    <div className='flex gap-2 items-center'>
                        Games Started:
                        <CircularProgressbar value={gamesStarted / totalGames} text={`${gamesStarted}/${totalGames}`} className='w-20' />
                    </div>
                    <div className='flex gap-2 items-center'>
                        Games Completed:
                        <CircularProgressbar value={gamesCompleted / totalGames} text={`${gamesCompleted}/${totalGames}`} className='w-20' />
                    </div>

                    <div className='flex gap-2 items-center'>
                        Wins: {gamesWon} Losses: {gamesLost}
                    </div>
                </>




                <motion.button
                    className="px-[15px] rounded-full font-semibold min-w-[5.5em] h-[3em] w-40 text-white bg-black flex justify-center items-center gap-2 select-none"
                    style={{ backgroundColor: "FC716B" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setDeleteDrawerOpen(true)}
                >

                    <>Delete Stats <svg width="24px" height="24px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#FFFFFF"><path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></>
                </motion.button>

                <p>...more coming soon!</p>
            </div >
            <BottomSheet title="Delete Stats" isVisible={deleteDrawerOpen} onClose={() => setDeleteDrawerOpen(false)}>
                <div className="flex flex-col gap-4 items-center">
                    <h1 className="text-3xl font-extralight">Are you sure?</h1>
                    <button onClick={() => clearItems()}>Yes</button>
                    <button onClick={() => setDeleteDrawerOpen(false)}>No</button>
                </div>
            </BottomSheet>
        </>
    )
}

export default Profile