import * as React from 'react'
import { ToolbarContextValue } from './types'

export const ToolbarContext = React.createContext<
  ToolbarContextValue | undefined
>(undefined)

// Custom hook to use Toolbar context
export const useToolbarContext = () => {
  const context = React.useContext(ToolbarContext)
  if (!context) {
    throw new Error('Toolbar components must be used within a Toolbar.Root')
  }
  return context
}

export const handleKeyboardNavigation = (
  event: React.KeyboardEvent,
  {
    itemIds,
    focusedItemId,
    activeItemId,
    setFocusedItemId,
    setActiveItemId,
    setDirection,
  }: {
    itemIds: string[]
    focusedItemId: string | null
    activeItemId: string | null
    setFocusedItemId: (id: string | null) => void
    setActiveItemId: (id: string | null) => void
    setDirection: (direction: number) => void
  }
) => {
  const currentFocusIndex = itemIds.indexOf(focusedItemId || '')
  let newFocusedId: string | null = null

  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      if (currentFocusIndex > 0) {
        newFocusedId = itemIds[currentFocusIndex - 1]
      } else if (currentFocusIndex === -1 && itemIds.length > 0) {
        newFocusedId = itemIds[0]
      }
      break
    case 'ArrowRight':
      event.preventDefault()
      if (currentFocusIndex < itemIds.length - 1) {
        newFocusedId = itemIds[currentFocusIndex + 1]
      } else if (currentFocusIndex === -1 && itemIds.length > 0) {
        newFocusedId = itemIds[0]
      }
      break
    case 'Enter':
    case ' ':
      event.preventDefault()
      if (focusedItemId) {
        const newIndex = itemIds.indexOf(focusedItemId)
        const oldIndex = itemIds.indexOf(activeItemId || '')
        setDirection(
          oldIndex !== -1 && newIndex !== -1 ? newIndex - oldIndex : 0
        )
        setActiveItemId(focusedItemId === activeItemId ? null : focusedItemId)
      }
      break
    case 'Escape':
      event.preventDefault()
      setActiveItemId(null)
      setFocusedItemId(null)
      break
  }

  if (newFocusedId) {
    setFocusedItemId(newFocusedId)
    // Find and focus the button element
    const button = document.querySelector(
      `[data-item-id="${newFocusedId}"] button`
    )
    if (button instanceof HTMLElement) {
      button.focus()
    }
  }
}
