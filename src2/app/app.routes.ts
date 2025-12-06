import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { DashboardComponent } from './dashboard/dashboard';
import { HomeComponent } from './dashboard/home/home';
import { CourseJourneyComponent } from './dashboard/course-journey/course-journey';

import { InternshipsComponent } from './dashboard/internships/internships';
import { FinancialAidComponent } from './dashboard/financial-aid/financial-aid';
import { CourseMaterialComponent } from './dashboard/course-material/course-material';
import { FocusAreasComponent } from './dashboard/focus-areas/focus-areas';
import { MentorChatComponent } from './dashboard/mentor-chat/mentor-chat';

export const routes: Routes = [
    { path: '', component: LandingPage },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'course-journey', component: CourseJourneyComponent },
            { path: 'internships', component: InternshipsComponent },
            { path: 'financial-aid', component: FinancialAidComponent },
            { path: 'course-material', component: CourseMaterialComponent },
            { path: 'focus-areas', component: FocusAreasComponent },
            { path: 'mentor-chat', component: MentorChatComponent }
        ]
    }
];
