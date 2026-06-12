import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Upload,
  BarChart3,
  Target,
  Wand2,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/authStore'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Separator } from '@/components/ui/separator'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/upload', label: 'Upload Resume', icon: Upload },
  { path: '/analysis', label: 'Analysis', icon: BarChart3 },
  { path: '/job-match', label: 'Job Match', icon: Target },
  { path: '/rewriter', label: 'AI Rewriter', icon: Wand2 },
  { path: '/profile', label: 'Profile', icon: User },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || 'U'

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col transition-all duration-300 ease-in-out',
        'glass-strong border-r border-white/[0.06]',
        collapsed ? 'w-[72px]' : 'w-[260px]'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg gradient-primary">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        {!collapsed && (
          <span className="gradient-text text-xl font-bold tracking-tight animate-fade-in">
            Resiqo
          </span>
        )}
      </div>

      <Separator className="opacity-20" />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon

          const linkContent = (
            <Link
              to={item.path}
              onMouseEnter={() => setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}
              className={cn(
                'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'gradient-primary text-white shadow-lg shadow-primary/20'
                  : 'text-muted-foreground hover:bg-white/[0.06] hover:text-foreground'
              )}
            >
              {/* Active indicator glow */}
              {isActive && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-purple-500/20 blur-xl" />
              )}

              <Icon
                className={cn(
                  'relative z-10 h-5 w-5 shrink-0 transition-transform duration-200',
                  hoveredItem === item.path && !isActive && 'scale-110'
                )}
              />

              {!collapsed && (
                <span className="relative z-10 truncate">{item.label}</span>
              )}
            </Link>
          )

          if (collapsed) {
            return (
              <Tooltip key={item.path} delayDuration={0}>
                <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                <TooltipContent side="right" className="glass">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            )
          }

          return <div key={item.path}>{linkContent}</div>
        })}
      </nav>

      <Separator className="opacity-20" />

      {/* User section */}
      <div className="p-3">
        <div
          className={cn(
            'flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white/[0.06]',
            collapsed && 'justify-center'
          )}
        >
          <Avatar className="h-8 w-8 shrink-0 border border-primary/30">
            <AvatarFallback className="bg-primary/20 text-xs font-semibold text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>

          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium">{user?.name || 'User'}</p>
              <p className="truncate text-xs text-muted-foreground">{user?.email || ''}</p>
            </div>
          )}

          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Collapse toggle */}
      <div className="absolute -right-3 top-20">
        <Button
          variant="outline"
          size="icon"
          onClick={onToggle}
          className="h-6 w-6 rounded-full border-border/50 bg-background shadow-md hover:bg-primary/10 hover:border-primary/30"
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </Button>
      </div>
    </aside>
  )
}
