import { store } from '../../app/store'
import { notesApiSlice } from '../notes/notesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {

        store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true }))
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))

        // console.log('subscribing')
        // //subscription
        // const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate()) //manual subscription
        // const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

        // return () => {
        //     console.log('unsubscribing')
        //     notes.unsubscribe()
        //     users.unsubscribe() //unsubscribe for unprotected pages
        // }
    }, [])

    return <Outlet />
}
export default Prefetch