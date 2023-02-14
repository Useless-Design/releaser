import {repo} from './utils/git'

repo( './' ).then( ( repo ) => {
  console.log( repo )
})
