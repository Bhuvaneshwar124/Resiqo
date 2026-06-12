import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  BarChart3, 
  Target, 
  Wand2, 
  User, 
  LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Upload Resume', path: '/upload', icon: Upload },
  { name: 'Analysis', path: '/analysis', icon: BarChart3 },
  { name: 'Job Match', path: '/job-match', icon: Target },
  { name: 'AI Rewriter', path: '/rewriter', icon: Wand2 },
  { name: 'Profile', path: '/profile', icon: User },
];

export function SidebarContent() {
  const { user, logout } = useAuthStore();

  return (
    <div className="flex h-full flex-col bg-background/50 backdrop-blur-xl border-r">
      <div className="p-6">
        <h1 className="text-2xl font-bold gradient-text">Resiqo</h1>
        <p className="text-sm text-muted-foreground mt-1">AI Resume Analyzer</p>
      </div>
      
      <Separator className="opacity-50" />
      
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive 
                  ? 'bg-primary/10 text-primary glow-border' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="glass-card rounded-xl p-4 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium truncate">{user?.name}</span>
              <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden lg:flex h-screen w-72 flex-col fixed inset-y-0 z-50">
      <SidebarContent />
    </aside>
  );
}
