/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils"

/**
 * Lightweight, dependency-free tooltip.
 * Wrap any trigger element; shows `label` on hover/focus.
 * Accessible: the label is exposed via aria + appears on keyboard focus.
 */
const Tooltip = ({ label, side = "top", className, children }) => {
  const sideClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  }

  return (
    <span className="group/tooltip relative inline-flex">
      {children}
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-50 whitespace-nowrap rounded-md border border-border bg-popover px-2.5 py-1 text-xs font-medium text-popover-foreground opacity-0 shadow-md transition-all duration-150 group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100",
          sideClasses[side],
          className
        )}
      >
        {label}
      </span>
    </span>
  )
}

export { Tooltip }
