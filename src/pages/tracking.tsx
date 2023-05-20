import getZippitApi from '@/api';
import React, { FormEventHandler, useState } from 'react'

const api = getZippitApi()

const TrackingPage = () => {
  const [identifier, setIdentifier] = useState('')
  const [hits, setHits] = useState<number|undefined>()
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<Error | undefined>()

  const handleSubmit: FormEventHandler = async (evt) => { 
    evt.preventDefault();
    setHits(undefined)
    setLoading(true)
    setErr(undefined)

    try {
      const hits = await api.getHits(identifier)
      setHits(hits)
    } catch(error: any) {
      setErr(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <header className='text-center text-primary text-2xl my-8'>
        Submit a URL identifier, and check how many times it has been visited
      </header>

      <form onSubmit={handleSubmit} className='input-wrapper max-w-md mx-auto'>
        <input type="text" className='input px-4' required={true} placeholder='identifier zd3js92jd' value={identifier} onChange={evt => setIdentifier(evt.target.value)} />
        <button type="submit" className='shorten'>submit</button>
      </form>

      <div className='flex items-center justify-center mt-4'>
        {loading && <span>loading ...</span>}
        {err && <span>An unexpected error occured, or your identifier does NOT exists!</span>}
        {hits && <span className='text-3xl'>URL has been hit <span className='text-primary'>{hits}</span> time(s)</span>}
      </div>
    </>
  )
}

export default TrackingPage