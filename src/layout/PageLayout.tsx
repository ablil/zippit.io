import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Head from 'next/head'
import React, { FC, PropsWithChildren } from 'react'

const PageLayout: FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        {children}
        <Footer />
      </main>
    </>
  )
}

export default PageLayout