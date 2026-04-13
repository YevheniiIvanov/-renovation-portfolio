import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { PrivacyPolicyModal } from '../components/legal/PrivacyPolicyModal'

type PrivacyPolicyContextValue = {
  openPrivacyPolicy: () => void
  closePrivacyPolicy: () => void
}

const PrivacyPolicyContext = createContext<PrivacyPolicyContextValue | null>(
  null,
)

export function PrivacyPolicyProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openPrivacyPolicy = useCallback(() => setOpen(true), [])
  const closePrivacyPolicy = useCallback(() => setOpen(false), [])

  const value = useMemo(
    () => ({ openPrivacyPolicy, closePrivacyPolicy }),
    [openPrivacyPolicy, closePrivacyPolicy],
  )

  return (
    <PrivacyPolicyContext.Provider value={value}>
      {children}
      <PrivacyPolicyModal open={open} onClose={closePrivacyPolicy} />
    </PrivacyPolicyContext.Provider>
  )
}

export function usePrivacyPolicy(): PrivacyPolicyContextValue {
  const ctx = useContext(PrivacyPolicyContext)
  if (!ctx) {
    throw new Error('usePrivacyPolicy must be used within PrivacyPolicyProvider')
  }
  return ctx
}
