import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FriendsComponent } from './components/friends/friends.component';
import { YourDayComponent } from './components/your-day/your-day.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { JournalComponent } from './components/journal/journal.component';
import { CalloriesMonitorComponent } from './components/callories-monitor/callories-monitor.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent  },
  { path: 'register', component: RegisterComponent  },
  { path: 'app', component: SidebarComponent, children:
     [{ path: 'friends', component: FriendsComponent  },
    { path: 'your-day', component: YourDayComponent  },
    { path: 'achievements', component: AchievementsComponent  },
    { path: 'journal', component: JournalComponent  },
    { path: 'callories-monitor', component: CalloriesMonitorComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'profile', component: ProfileComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
