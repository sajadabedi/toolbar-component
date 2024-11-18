import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import * as React from 'react'
import { cn } from '../lib/utils'

const TooltipProvider = TooltipPrimitive.Provider
const TooltipRoot = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-md bg-gray-900 dark:bg-neutral-900 border border-gray-800 dark:border-neutral-800/40 px-2 py-1 text-xs text-gray-50',
      'animate-in fade-in-0 zoom-in-95',
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export {
  TooltipRoot as Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
}
