import Git, { Repository } from 'nodegit'
import path from 'path'

export const repo = async ( p: string ) => {
  const relativePath = path.resolve( p )
  const repo = await Git.Repository.open( relativePath )
  return repo
}

export const branch = async ( repo: Repository, branchName: string ) => {
  const branch = await repo.getBranch( branchName )
  return branch
}

export const commitForTag = async ( repo: Repository, tagName: string ) => {
  const tag = await repo.getTagByName( tagName )
  const commit = await repo.getCommit( tag.targetId() )
  return commit
}

export default Git
