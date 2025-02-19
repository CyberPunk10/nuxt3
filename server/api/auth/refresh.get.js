import { getCookie } from 'h3'
import { getRefreshTokenByToken } from '../../db/refreshToken'
import { decodeRefreshToken, generateTokens } from '../../utils/jwt'
import { getUserById } from '../../db/users'

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, 'refresh_token')

  if (!refreshToken) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Refresh token is invalid'
    }))
  }

  const rToken = await getRefreshTokenByToken(refreshToken)

  if (!rToken) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Refresh token is invalid'
    }))
  }

  const token = decodeRefreshToken(refreshToken)

  if (!token) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Refresh token is invalid'
    }))
  }

  try {
    const user = await getUserById(token.userId)

    const { accessToken } = generateTokens(user)

    return { access_token: accessToken }
  } catch (error) {
    console.log('[ Error /api/auth/refresh.get.js ]: ', error);
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    }))
  }
})
