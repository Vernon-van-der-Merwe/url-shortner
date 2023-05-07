import { fire } from '../../../src/config/firebase'
import * as service from '../../../src/services/api/urlService'
import { CreateShortenedUrl, ShortenedUrl } from '@/model/ShortenedUrlModel'

export default async function create(req, res) {
  const { name, url } = JSON.parse(req.body) as CreateShortenedUrl
  const input = { name, url } as CreateShortenedUrl

  try {
    let result = await service.create(fire, input)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ err })
  }
}
