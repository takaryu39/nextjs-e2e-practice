import MonitorSession from './components/monitor-session'
import NavBar from './components/nav-bar'
import './globals.css'
import { Provider } from './provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <MonitorSession />
          <NavBar />
          {children}
        </Provider>
      </body>
    </html>
  )
}
