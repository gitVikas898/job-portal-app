import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayout from './layouts/app-layout'
import LandingPage from './pages/landing-page'
import Onboarding from './pages/onboarding'
import Job from './pages/Job'
import Joblisting from './pages/job-listing'
import Myjobs from './pages/Myjobs'
import PostJobs from './pages/Post-jobs'
import Savedjobs from './pages/Saved-jobs'

function App() {

  const router = createBrowserRouter([
    {
      element:<AppLayout></AppLayout>,
      children:[
        {
          path:"/",
          element:<LandingPage></LandingPage>,
        },
        {
          path:"/onboarding",
          element:<Onboarding></Onboarding>,
        },
        {
          path:"/job",
          element:<Job></Job>,
        }
        ,
        {
          path:"/myjobs",
          element:<Myjobs></Myjobs>,
        }
        ,
        {
          path:"/saved",
          element:<Savedjobs></Savedjobs>,
        },
        {
          path:"/post",
          element:<PostJobs></PostJobs>,
        }
        ,
        {
          path:"/list",
          element:<Joblisting></Joblisting>,
        }
      ]
    }
  ])

  return <RouterProvider router={router}></RouterProvider>
}

export default App
