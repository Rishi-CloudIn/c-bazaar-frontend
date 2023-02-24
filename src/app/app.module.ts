import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { initializeApp } from 'firebase/app';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoginComponent } from './pages/authentication/login/login.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { OnboardComponent } from './pages/authentication/onboard/onboard.component';
import { EmiCalculatorComponent } from './pages/emi-calculator/emi-calculator.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { DashboardComponent } from './pages/reports/dashboard/dashboard.component';
import { CommonOfferComponent } from './pages/offers/common-offer/common-offer.component';
import { LoansComponent } from './pages/offers/loans/loans.component';
import { CreditCardComponent } from './pages/offers/credit-card/credit-card.component';
import { ProfileComponent } from './pages/account/profile/profile.component';
import { EmptyComponent } from './components/empty/empty.component';
import { InsurenceComponent } from './pages/offers/insurence/insurence.component';
import { InvestmentComponent } from './pages/offers/investment/investment.component';
import { GeneralInfoComponent } from './pages/information/general-info/general-info.component';
import { CreditFactorsComponent } from './pages/reports/credit-factors/credit-factors.component';
import { OfferDetailsComponent } from './pages/offers/offer-details/offer-details.component';
import { CountDirective } from './pages/reports/dashboard/count.directive';
import { DragDropDirective } from './directives/drag-and-drop-file.directive';
import { PersonalDetailsComponent } from './pages/application/personal-details/personal-details.component';
import { TermsComponent } from './pages/application/terms/terms.component';
import { StepsSideNavComponent } from './pages/application/steps-side-nav/steps-side-nav.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { DocumentUploadComponent } from './pages/application/document-upload/document-upload.component';
import { PersonalDocsUploadComponent } from './pages/application/personal-docs-upload/personal-docs-upload.component';
import { PreviewComponent } from './pages/application/preview/preview.component';
import { RequiredDocsComponent } from './pages/application/required-docs/required-docs.component';
import { PreviewDocsComponent } from './pages/application/preview-docs/preview-docs.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ESignUploadComponent } from './pages/application/e-sign-upload/e-sign-upload.component';
import { PopupsComponent } from './components/popups/popups.component';
import { ApplicationCompleteComponent } from './pages/application/application-complete/application-complete.component';
import { MyApplicationsComponent } from './pages/account/my-applications/my-applications.component';
import { FaqComponent } from './pages/account/faq/faq.component';
import { ContactComponent } from './pages/account/contact/contact.component';
import { EmiChartComponent } from './pages/emi-calculator/emi-chart/emi-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DsaLoginComponent } from './pages/dsa/dsa-login/dsa-login.component';
import { DsaForgotPasswordComponent } from './pages/dsa/dsa-forgot-password/dsa-forgot-password.component';
import { DsaRegisterComponent } from './pages/dsa/dsa-register/dsa-register.component';
import { UserSelectionComponent } from './pages/authentication/user-selection/user-selection.component';
import { DsaDashboardComponent } from './pages/dsa/dsa-dashboard/dsa-dashboard.component';
import { DsaSidenavComponent } from './pages/dsa/dsa-sidenav/dsa-sidenav.component';
import { DsaProfileComponent } from './pages/dsa/dsa-profile/dsa-profile.component';
import { LandingComponent } from './landing/landing.component';
import { BanksComponent } from './pages/dsa/banks/banks.component';
import { DsaApplicationsComponent } from './pages/dsa/dsa-applications/dsa-applications.component';
import { DsaOffersComponent } from './pages/dsa/dsa-offers/dsa-offers.component';
import { DsaOnboardComponent } from './pages/dsa/dsa-onboard/dsa-onboard.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { DsaApplicationTermComponent } from './pages/dsa/dsa-application-term/dsa-application-term.component';
import { FoSidenavComponent } from './pages/fo/fo-sidenav/fo-sidenav.component';
import { DsaApplicationPersonalDetailsComponent } from './pages/dsa/dsa-application-term/dsa-application-personal-details/dsa-application-personal-details.component';
import { DsaDocsUploadComponent } from './pages/dsa/dsa-application-term/dsa-docs-upload/dsa-docs-upload.component';
import { DsaPreviewComponent } from './pages/dsa/dsa-application-term/dsa-preview/dsa-preview.component';
import { DsaPreviewDocsComponent } from './pages/dsa/dsa-application-term/dsa-preview-docs/dsa-preview-docs.component';
import { DsaSignComponent } from './pages/dsa/dsa-application-term/dsa-sign/dsa-sign.component';
import { DsaCompleteApplicationComponent } from './pages/dsa/dsa-application-term/dsa-complete-application/dsa-complete-application.component';
import { TopNavDsaComponent } from './components/top-nav-dsa/top-nav-dsa.component';
import { FoApplicationsComponent } from './pages/fo/fo-applications/fo-applications.component';
import { ReinitiateDocsComponent } from './pages/application/reinitiate-docs/reinitiate-docs.component';
import { EmiMobCalcComponent } from './pages/emi-calculator/emi-mob-calc/emi-mob-calc.component';
initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    OnboardComponent,
    EmiCalculatorComponent,
    SideNavComponent,
    DashboardComponent,
    CommonOfferComponent,
    LoansComponent,
    ProfileComponent,
    CreditCardComponent,
    EmptyComponent,
    InsurenceComponent,
    InvestmentComponent,
    GeneralInfoComponent,
    CreditFactorsComponent,
    OfferDetailsComponent,
    CountDirective,
    DragDropDirective,
    PersonalDetailsComponent,
    TermsComponent,
    StepsSideNavComponent,
    TopNavComponent,
    DocumentUploadComponent,
    PersonalDocsUploadComponent,
    PreviewComponent,
    RequiredDocsComponent,
    PreviewDocsComponent,
    LoaderComponent,
    ESignUploadComponent,
    PopupsComponent,
    ApplicationCompleteComponent,
    MyApplicationsComponent,
    FaqComponent,
    ContactComponent,
    EmiChartComponent,
    DsaLoginComponent,
    DsaForgotPasswordComponent,
    DsaRegisterComponent,
    UserSelectionComponent,
    DsaDashboardComponent,
    DsaSidenavComponent,
    DsaProfileComponent,
    LandingComponent,
    BanksComponent,
    DsaApplicationsComponent,
    DsaOffersComponent,
    DsaOnboardComponent,
    DsaApplicationTermComponent,
    FoSidenavComponent,
    DsaApplicationPersonalDetailsComponent,
    DsaDocsUploadComponent,
    DsaPreviewComponent,
    DsaPreviewDocsComponent,
    DsaSignComponent,
    DsaCompleteApplicationComponent,
    TopNavDsaComponent,
    FoApplicationsComponent,
    ReinitiateDocsComponent,
    EmiMobCalcComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    MatSliderModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    HttpClientModule,
    NgSelectModule,
    NgApexchartsModule,
    NgHttpLoaderModule.forRoot(),
    // LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
