import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Loader from "../assets/loader.gif"
import {ErrorBoundary} from "react-error-boundary"
import FallbackRender from '../Components/ErrorBoundary'
import GoToTop from '../Components/GoToTop/GoToTop'

const Homepage = lazy(() => import('./Homepage'))
const SingleProduct = lazy(() => import('./SingleProduct'))

const AllRoutes = () => {
  return (
    <div>
        <Navbar />
        <ErrorBoundary FallbackComponent={FallbackRender} onReset={() => {}}>
            <Suspense fallback={<img src={Loader} alt="" />}>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/:id" element={<SingleProduct />} />
                </Routes>
                <GoToTop />
            </Suspense>
        </ErrorBoundary>
    </div>
  )
}

export default AllRoutes