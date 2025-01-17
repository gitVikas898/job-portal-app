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
import ProtectedRoute from './components/protected-route'
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
          element:<ProtectedRoute><Onboarding></Onboarding></ProtectedRoute>,
        },
        {
          path:"/job",
          element:<ProtectedRoute><Job></Job></ProtectedRoute> ,
        }
        ,
        {
          path:"/myjobs",
          element:<ProtectedRoute><Myjobs></Myjobs></ProtectedRoute>,
        }
        ,
        {
          path:"/saved-jobs",
          element:<ProtectedRoute>
            <Savedjobs></Savedjobs>
          </ProtectedRoute>,
        },
        {
          path:"/post-job",
          element:<ProtectedRoute>
            <PostJobs></PostJobs>
          </ProtectedRoute>,
        }
        ,
        {
          path:"/jobs",
          element:<ProtectedRoute>
            <Joblisting></Joblisting>
          </ProtectedRoute>,
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
