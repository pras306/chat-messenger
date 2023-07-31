import { Provider } from '@/components';
import './globals.css';

export const metadata = {
  title: 'Chat Messenger App',
  description: 'A simple web app for handling text, video and audio messages',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main bg-background">
            {children}
          </div>
        </Provider>
      </body>
    </html>
  )
}
