import { fire } from '../../../src/config/firebase'
import * as service from '../../../src/services/api/urlService'
import { CreateShortenedUrl, ShortenedUrl } from '@/model/ShortenedUrlModel'

export default async function api(req, res) {
  const { id } = JSON.parse(req.body)

  try {
    let result = await service.removeItem(fire, id)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ err })
  }
}
