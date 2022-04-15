import { getSessionToken } from '@shopify/app-bridge-utils'
import { useAppBridge } from '@shopify/app-bridge-react'
import { useMutation } from 'react-query'
import { request } from 'graphql-request'

export const useShopifyMutation = (query) => {
  const app = useAppBridge()

  const {mutateAsync, ...mutationProps} = useMutation(async (variables) => {
    const sessionToken = await getSessionToken(app)
    const headers = new Headers({})

    headers.append('Authorization', `Bearer ${sessionToken}`)
    headers.append('X-Requested-With', 'XMLHttpRequest')
    const response = await request('/api/graphql', query, variables, headers)
    return response
  })

  return [mutateAsync, mutationProps]
}