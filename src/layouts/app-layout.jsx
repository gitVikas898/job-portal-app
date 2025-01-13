import { Outlet } from "react-router-dom"

const AppLayout = () => {
  return (
    <div>app-layout
        <Outlet></Outlet>
    </div>
  )
}

export default AppLayout