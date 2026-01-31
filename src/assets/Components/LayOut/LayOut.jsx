import React , {memo} from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function LayOut({children}) {
  return (
    <div>
        <Header />
        {children}
        <Footer />
    </div>
  )
}

export default memo(LayOut);
