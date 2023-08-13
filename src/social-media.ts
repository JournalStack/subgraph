import {
  PostCreated as PostCreatedEvent,
  PostLiked as PostLikedEvent,
} from "../generated/SocialMedia/SocialMedia";
import { PostCreated, PostLiked } from "../generated/schema";

export function handlePostCreated(event: PostCreatedEvent): void {
  let entity = new PostCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
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
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.postId = event.params.postId;
  entity.postOwner = event.params.postOwner;
  entity.likeGiver = event.params.likeGiver;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
