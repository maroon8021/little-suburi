// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const now = new Date()
  if(req.method === 'GET') {
    res.status(200).json({ parama: `parama: ${now.toISOString()}`, paramb: `paramb: ${now.getTime()}` })
  }else if(req.method === 'POST') {
    const { parama, paramb } = req.body
    res.redirect(307, `/redirected?parama=${parama}&paramb=${paramb}`)
  }
  res.status(200).json({ name: 'John Doe' })
}
