import { fire } from '../../../src/config/firebase'
import * as service from '../../../src/services/api/urlService'
import { ShortenedUrl } from '@/model/ShortenedUrlModel'


export default async function get(req, res) {

    try {
        let result = await service.getAll(fire) as ShortenedUrl[]
        res.status(200).json(result)
    } catch (err) {
        console.log(err);
        res.status(500).json({ err })
    }
}
