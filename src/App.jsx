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
import { ThemeProvider } from './components/theme-provider'
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
          path:"/saved-jobs",
          element:<Savedjobs></Savedjobs>,
        },
        {
          path:"/post-job",
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

  return(
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router}></RouterProvider>
     </ThemeProvider>
  ) 
}

export default App
