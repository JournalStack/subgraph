import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { PostCreated, PostLiked } from "../generated/SocialMedia/SocialMedia"

export function createPostCreatedEvent(
  id: BigInt,
  content: string,
  owner: Address,
  likes: BigInt
): PostCreated {
  let postCreatedEvent = changetype<PostCreated>(newMockEvent())

  postCreatedEvent.parameters = new Array()

  postCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  postCreatedEvent.parameters.push(
    new ethereum.EventParam("content", ethereum.Value.fromString(content))
  )
  postCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  postCreatedEvent.parameters.push(
    new ethereum.EventParam("likes", ethereum.Value.fromUnsignedBigInt(likes))
  )

  return postCreatedEvent
}

export function createPostLikedEvent(
  postId: BigInt,
  postOwner: Address,
  likeGiver: Address
): PostLiked {
  let postLikedEvent = changetype<PostLiked>(newMockEvent())

  postLikedEvent.parameters = new Array()

  postLikedEvent.parameters.push(
    new ethereum.EventParam("postId", ethereum.Value.fromUnsignedBigInt(postId))
  )
  postLikedEvent.parameters.push(
    new ethereum.EventParam("postOwner", ethereum.Value.fromAddress(postOwner))
  )
  postLikedEvent.parameters.push(
    new ethereum.EventParam("likeGiver", ethereum.Value.fromAddress(likeGiver))
  )

  return postLikedEvent
}
