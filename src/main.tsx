import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SignupForm } from './components/signForm.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SignupForm />
    < App/>
  </StrictMode>,
)
