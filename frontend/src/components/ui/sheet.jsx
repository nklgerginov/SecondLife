import React from "react"
import { cn } from "../../lib/utils"
import { X } from "lucide-react"

const SheetContext = React.createContext({
  onOpenChange: () => {},
})

const Sheet = ({ open, onOpenChange, children, ...props }) => {
  if (!open) return null

  return (
    <SheetContext.Provider value={{ onOpenChange }}>
      <div className="fixed inset-0 z-50">
        <div
          className="fixed inset-0 bg-black/50"
          onClick={() => onOpenChange && onOpenChange(false)}
        />
        <div {...props}>{children}</div>
      </div>
    </SheetContext.Provider>
  )
}

const SheetContent = React.forwardRef(
  ({ className, children, onOpenChange, ...props }, ref) => {
    const context = React.useContext(SheetContext)
    const handleClose = onOpenChange || context.onOpenChange

    return (
      <div
        ref={ref}
        className={cn(
          "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          className
        )}
        {...props}
      >
        <button
          onClick={() => handleClose && handleClose(false)}
          className={cn(
            "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          )}
          type="button"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    )
  }
)
SheetContent.displayName = "SheetContent"

export { Sheet, SheetContent }

