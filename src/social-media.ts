import { BigInt, bigInt } from "@graphprotocol/graph-ts";
import {
  PostCreated as PostCreatedEvent,
  PostLiked as PostLikedEvent,
} from "../generated/SocialMedia/SocialMedia";
import { PostCreated, PostLiked } from "../generated/schema";

export function handlePostCreated(event: PostCreatedEvent): void {
  let entity = new PostCreated(event.params.id.toString());
  entity.SocialMedia_id = event.params.id;
  entity.content = event.params.content;
  entity.owner = event.params.owner;
  entity.likes = event.params.likes;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePostLiked(event: PostLikedEvent): void {
  let entity = new PostLiked(
    event.params.postId.toString()
    // event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.postId = event.params.postId;
  entity.postOwner = event.params.postOwner;
  entity.likeGiver = event.params.likeGiver;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
  let post = PostCreated.load(event.params.postId.toString());
  if (post) {
    const one = new BigInt(1);
    const likes = post.likes;
    post.likes = likes.plus(one);
    post.save();
  }
}
