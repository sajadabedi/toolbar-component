import { ReactNode } from 'react'

export interface ToolbarContextValue {
  activeItemId: string | null
  setActiveItemId: (id: string | null) => void
  registerContent: (id: string, content: ReactNode) => void
  motionDirection: number
  focusedItemId: string | null
  setFocusedItemId: (id: string | null) => void
}

export interface TriggerProps {
  icon: ReactNode
  tooltip: string
  itemId?: string
}
