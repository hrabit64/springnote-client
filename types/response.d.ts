export interface UserResponse {
  uid: string
  display_name: string
  admin: boolean
}

export const isUserResponse = (arg: any): arg is UserResponse => {
  return (
    typeof arg.uid === 'string' &&
    typeof arg.display_name === 'string' &&
    typeof arg.admin === 'boolean'
  )
}

export interface ErrorResponse {
  timestamp: string
  status: string
  title: string
  message: string
  path: string
}

export const isErrorResponse = (arg: any): arg is ErrorResponse => {
  return (
    typeof arg.timestamp === 'string' &&
    typeof arg.status === 'string' &&
    typeof arg.title === 'string' &&
    typeof arg.message === 'string' &&
    typeof arg.path === 'string'
  )
}

//posts

export interface PostSimpleResponse {
  id: number
  title: string
  thumbnail: string
  created_at: string
  last_updated_at: string
  enabled: boolean
  post_type: {
    id: number
    name: string
  }
  series: {
    id: number
    name: string
  }
  tags: {
    id: number
    name: string
  }[]
  links: {
    self: {
      href: string
    }
    delete: {
      href: string
    }
    update: {
      href: string
    }
    update_status: {
      href: string
    }
  }
}

export const isPostSimpleResponse = (arg: any): arg is PostSimpleResponse => {
  return (
    typeof arg.id === 'number' &&
    typeof arg.title === 'string' &&
    typeof arg.thumbnail === 'string' &&
    typeof arg.created_at === 'string' &&
    typeof arg.last_updated_at === 'string' &&
    typeof arg.enabled === 'boolean' &&
    arg.post_type !== undefined &&
    arg.series !== undefined &&
    arg.tags !== undefined &&
    arg.links !== undefined
  )
}

export interface PostResponse {
  id: number
  title: string
  thumbnail: string
  content: string
  created_at: string
  last_updated_at: string
  enabled: boolean
  post_type: {
    id: number
    name: string
  }
  series: {
    id: number
    name: string
  }
  tags: {
    id: number
    name: string
  }[]
  links: {
    self: {
      href: string
    }
    delete: {
      href: string
    }
    update: {
      href: string
    }
    update_status: {
      href: string
    }
  }
}

export interface PagePostSimpleResponse {
  _embedded: {
    posts: PostSimpleResponse[]
  }
  _links: {
    self: {
      href: string
    }
  }
  page: {
    number: number
    size: number
    totalElements: number
    totalPages: number
  }
}

export interface PagePostResponse {
  _embedded: {
    posts: PostResponse[]
  }
  _links: {
    self: {
      href: string
    }
  }
  page: {
    number: number
    size: number
    totalElements: number
    totalPages: number
  }
}

export const isPagePostSimpleResponse = (
  arg: any
): arg is PagePostSimpleResponse => {
  return (
    arg._embedded !== undefined &&
    arg._links !== undefined &&
    arg.page !== undefined
  )
}

export interface PostDetailResponse {
  id: number
  title: string
  thumbnail: string
  content: {
    editor_text: string
    plain_text: string
  }
  created_at: string
  last_updated_at: string
  enabled: boolean
  post_type: {
    id: number
    name: string
  }
  series: {
    id: number
    name: string
  }
  tags: {
    id: number
    name: string
  }[]
  _links: {
    self: {
      href: string
    }
    delete: {
      href: string
    }
    update: {
      href: string
    }
    update_status: {
      href: string
    }
  }
}

export const isPostDetailResponse = (arg: any): arg is PostDetailResponse => {
  return (
    typeof arg.id === 'number' &&
    typeof arg.title === 'string' &&
    typeof arg.thumbnail === 'string' &&
    arg.content !== undefined &&
    typeof arg.created_at === 'string' &&
    typeof arg.last_updated_at === 'string' &&
    typeof arg.enabled === 'boolean' &&
    arg.post_type !== undefined &&
    arg.series !== undefined &&
    arg.tags !== undefined &&
    arg._links !== undefined
  )
}
