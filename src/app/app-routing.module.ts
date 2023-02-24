import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { AuthGuard } from './guards/auth.guard';
import { LandingComponent } from './landing/landing.component';
import { ContactComponent } from './pages/account/contact/contact.component';
import { FaqComponent } from './pages/account/faq/faq.component';
import { MyApplicationsComponent } from './pages/account/my-applications/my-applications.component';
import { ProfileComponent } from './pages/account/profile/profile.component';
import { ApplicationCompleteComponent } from './pages/application/application-complete/application-complete.component';
import { ESignUploadComponent } from './pages/application/e-sign-upload/e-sign-upload.component';
import { PersonalDetailsComponent } from './pages/application/personal-details/personal-details.component';
import { PersonalDocsUploadComponent } from './pages/application/personal-docs-upload/personal-docs-upload.component';
import { PreviewDocsComponent } from './pages/application/preview-docs/preview-docs.component';
import { PreviewComponent } from './pages/application/preview/preview.component';
import { ReinitiateDocsComponent } from './pages/application/reinitiate-docs/reinitiate-docs.component';
import { RequiredDocsComponent } from './pages/application/required-docs/required-docs.component';
import { TermsComponent } from './pages/application/terms/terms.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { OnboardComponent } from './pages/authentication/onboard/onboard.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { UserSelectionComponent } from './pages/authentication/user-selection/user-selection.component';
import { BanksComponent } from './pages/dsa/banks/banks.component';
import { DsaApplicationPersonalDetailsComponent } from './pages/dsa/dsa-application-term/dsa-application-personal-details/dsa-application-personal-details.component';
import { DsaApplicationTermComponent } from './pages/dsa/dsa-application-term/dsa-application-term.component';
import { DsaCompleteApplicationComponent } from './pages/dsa/dsa-application-term/dsa-complete-application/dsa-complete-application.component';
import { DsaDocsUploadComponent } from './pages/dsa/dsa-application-term/dsa-docs-upload/dsa-docs-upload.component';
import { DsaPreviewDocsComponent } from './pages/dsa/dsa-application-term/dsa-preview-docs/dsa-preview-docs.component';
import { DsaPreviewComponent } from './pages/dsa/dsa-application-term/dsa-preview/dsa-preview.component';
import { DsaSignComponent } from './pages/dsa/dsa-application-term/dsa-sign/dsa-sign.component';
import { DsaApplicationsComponent } from './pages/dsa/dsa-applications/dsa-applications.component';
import { DsaDashboardComponent } from './pages/dsa/dsa-dashboard/dsa-dashboard.component';
import { DsaForgotPasswordComponent } from './pages/dsa/dsa-forgot-password/dsa-forgot-password.component';
import { DsaLoginComponent } from './pages/dsa/dsa-login/dsa-login.component';
import { DsaOffersComponent } from './pages/dsa/dsa-offers/dsa-offers.component';
import { DsaOnboardComponent } from './pages/dsa/dsa-onboard/dsa-onboard.component';
import { DsaProfileComponent } from './pages/dsa/dsa-profile/dsa-profile.component';
import { DsaRegisterComponent } from './pages/dsa/dsa-register/dsa-register.component';
import { EmiCalculatorComponent } from './pages/emi-calculator/emi-calculator.component';
import { EmiMobCalcComponent } from './pages/emi-calculator/emi-mob-calc/emi-mob-calc.component';
import { FoApplicationsComponent } from './pages/fo/fo-applications/fo-applications.component';
import { HomeComponent } from './pages/home/home.component';
import { GeneralInfoComponent } from './pages/information/general-info/general-info.component';
import { CommonOfferComponent } from './pages/offers/common-offer/common-offer.component';
import { CreditCardComponent } from './pages/offers/credit-card/credit-card.component';
import { InsurenceComponent } from './pages/offers/insurence/insurence.component';
import { InvestmentComponent } from './pages/offers/investment/investment.component';
import { LoansComponent } from './pages/offers/loans/loans.component';
import { OfferDetailsComponent } from './pages/offers/offer-details/offer-details.component';
import { CreditFactorsComponent } from './pages/reports/credit-factors/credit-factors.component';
import { DashboardComponent } from './pages/reports/dashboard/dashboard.component';
import { ProfileResolverService } from './resolvers/profile-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'user_selection',
    component: UserSelectionComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: UserSelectionComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'onboard',
    component: OnboardComponent,
    resolve: [ProfileResolverService],
    canActivate: [AuthGuard],
  },
  {
    path: 'emi',
    component: EmiCalculatorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'faq',
    component: FaqComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'info',
    component: GeneralInfoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my_applications',
    component: MyApplicationsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'drag',
    component: PersonalDetailsComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'nav',
    component: SideNavComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    // component: DashboardComponent,
    children: [
      {
        path: 'credit-factors',
        component: CreditFactorsComponent,
      },
    ],
    canActivate: [AuthGuard],
  },

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'offers',
    children: [
      {
        path: 'loan',
        component: LoansComponent,
      },
      {
        path: 'credit-card',
        component: CreditCardComponent,
      },
      {
        path: 'insurance',
        component: InsurenceComponent,
      },
      {
        path: 'investment',
        component: InvestmentComponent,
      },
    ],
    canActivate: [AuthGuard],
    resolve: [ProfileResolverService],
  },
  {
    path: 'offer/:id',
    component: OfferDetailsComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'offer/application',
    children: [
      {
        path: 'terms/:id',
        component: TermsComponent,
      },
      {
        path: 'details/:id',
        component: PersonalDetailsComponent,
      },
      {
        path: 'personal_docs/:id',
        component: PersonalDocsUploadComponent,
      },
      {
        path: 'required_docs/:id',
        component: RequiredDocsComponent,
      },
      {
        path: 'preview_details/:id',
        component: PreviewComponent,
      },
      {
        path: 'preview_documents/:id',
        component: PreviewDocsComponent,
      },
      {
        path: 'sign/:id',
        component: ESignUploadComponent,
      },
      {
        path: 'complete/:id',
        component: ApplicationCompleteComponent,
      },
    ],
    canActivate: [AuthGuard],
    resolve: [ProfileResolverService],
  },

  {
    path: 'dsa',
    children: [
      {
        path: 'login',
        component: DsaLoginComponent,
      },
      {
        path: 'signup',
        component: DsaRegisterComponent,
      },
      {
        path: 'forgot_password',
        component: DsaForgotPasswordComponent,
      },
      {
        path: 'dashboard',
        component: DsaDashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        component: DsaProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'banks',
        component: BanksComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'offers/:id',
        component: DsaOffersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'onboard',
        component: DsaOnboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'applications',
        component: DsaApplicationsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'apply/:id',
        canActivate: [AuthGuard],
        component: DsaApplicationTermComponent,
      },
      {
        path: 'details/:id',
        canActivate: [AuthGuard],
        component: DsaApplicationPersonalDetailsComponent,
      },
      {
        path: 'docs/:id',
        canActivate: [AuthGuard],
        component: DsaDocsUploadComponent,
      },
      {
        path: 'preview/:id',
        canActivate: [AuthGuard],
        component: DsaPreviewComponent,
      },
      {
        path: 'preview-docs/:id',
        canActivate: [AuthGuard],
        component: DsaPreviewDocsComponent,
      },
      {
        path: 'sign/:id',
        canActivate: [AuthGuard],
        component: DsaSignComponent,
      },
      {
        path: 'complete/:id',
        canActivate: [AuthGuard],
        component: DsaCompleteApplicationComponent,
      },
    ],
  },
  {
    path: 'fo',
    children: [
      {
        path: 'dashboard',
        component: DsaDashboardComponent,
      },
      {
        path: 'applications',
        component: FoApplicationsComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'reinitiated-docs/:id',
    component: ReinitiateDocsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'landing',
    component: LandingComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'emi_calculator',
    component: EmiMobCalcComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
