import { set } from 'firebase/database'
import { defineStore } from 'pinia'
import type { CommentResponse } from '~/types/comment-response'
import { getEmptyComment } from '~/types/comment-response.d'

export const useCommentSidebarStore = defineStore('comment-sidebar', () => {
  const listOpen = ref(false)
  const replyOpen = ref(false)

  const parentComment: CommentResponse = ref(getEmptyComment())
  const targetPostId = ref(-1)

  const listToggle = () => {
    listOpen.value = !listOpen.value
  }

  const setParentComment = (comment: CommentResponse) => {
    parentComment.value = comment
  }

  const replyToggle = (newReplyTargetId: number) => {
    replyOpen.value = !replyOpen.value
  }

  const setTargetPostId = (postId: number) => {
    targetPostId.value = postId
  }

  return {
    targetPostId,
    listOpen,
    listToggle,
    replyOpen,
    parentComment,
    replyToggle,
    setTargetPostId,
    setParentComment
  }
})

export type CommentSidebarStore = ReturnType<typeof useCommentSidebarStore>
