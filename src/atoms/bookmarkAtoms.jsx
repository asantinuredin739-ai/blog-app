import { atom } from 'jotai'

// Stores the list of bookmarked posts
export const bookmarksAtom = atom([])

// Stores posts created locally by the user (not sent to the API)
export const localPostsAtom = atom([])