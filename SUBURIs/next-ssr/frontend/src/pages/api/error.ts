import type { NextApiRequest, NextApiResponse } from 'next'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if(true){
  //   throw new Error('error')
  // }
  res.status(404).send({})
}
