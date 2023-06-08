import Storage from '@itzsunny/storageapi'

export const session = new Storage('SESSION')
export const local = new Storage('LOCAL')


export const USER_KEY = 'user-info'