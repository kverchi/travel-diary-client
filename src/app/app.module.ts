import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LOCAL_STORAGE } from 'ngx-webstorage-service';
import { USER_SERVICE_STORAGE, UserService } from './services/user.service';

/*The layout package provides utilities to build responsive UIs that react to screen-size changes.*/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import {
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatExpansionModule
} from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMugHot, faHeart,
    faTh, faThList,
    faSignInAlt, faUserPlus,
    faPlaneDeparture, faMapMarked,
    faSearch, faWindowClose, faPen,
    faHiking, faCalendarAlt, faArchway, faComments,
    faCogs, faEdit, faTrashAlt, faArrowCircleLeft, faSave,
    faUpload
} from '@fortawesome/free-solid-svg-icons';

import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';

import { EditorModule } from '@tinymce/tinymce-angular';

import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '@cloudinary/angular-5.x';

import cloudinaryConfiguration from '../cloudinary.config';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
    HttpClient,
    HttpClientModule,
    HTTP_INTERCEPTORS
} from '@angular/common/http';

import { NavigationBarComponent } from './ui/navigation-bar/navigation-bar.component';
import { BottomBarComponent } from './ui/bottom-bar/bottom-bar.component';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegistrationComponent } from './registration/registration.component';
import { PostsComponent } from './posts/posts.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationInterceptor } from './interceptors/AuthenticationInterceptor';
import { ResourceNotFoundInterceptor } from './interceptors/ResourceNotFoundInterceptor';
import { BooksComponent } from './books/books.component';
import { MultimediaComponent } from './multimedia/multimedia.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SavePostComponent } from './save-post/save-post.component';
import { PostsService } from "./services/posts.service";
import { ImageService } from "./services/image.service";
import { UserInfoComponent } from './action-info/action-info.component';

library.add(faHeart, faMugHot,
    faTh, faThList,
    faSignInAlt, faUserPlus,
    faPlaneDeparture, faMapMarked,
    faSearch, faWindowClose, faPen,
    faHiking, faCalendarAlt, faArchway, faComments,
    faCogs, faEdit, faTrashAlt, faArrowCircleLeft, faSave,
    faUpload
);

// AoT requires an exported function for factories
// More: https://www.npmjs.com/package/@ngx-translate/core#aot
export function HttpLoaderFactory(httpClient:HttpClient) {
    return new TranslateHttpLoader(httpClient);
}
export const cloudinaryLib = {
    Cloudinary: Cloudinary
};
/* Access modifiers in TypeScript:
 * Everything in a class is public if not specified.
 * Everything in a module is private unless export keyword is used.*/

/*An NgModule describes how the application parts fit together.

 Every application has at least one Angular module,
 the root module that you bootstrap to launch the application.
 By convention, it is usually called AppModule.*/
@NgModule({
    /* The module's declarations array tells Angular which components belong to that module.
     As you create more components, add them to declarations.*/
    declarations: [
        AppComponent,
        LoginComponent,
        LogoutComponent,
        RegistrationComponent,
        NavigationBarComponent,
        BottomBarComponent,
        PostsComponent,
        BooksComponent,
        MultimediaComponent,
        PostDetailComponent,
        NotFoundComponent,
        SavePostComponent,
        UserInfoComponent
    ],
    /* The module's imports array tells Angular about other NgModules that
     this particular module needs to function properly.*/
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        CommonModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        LeafletModule.forRoot(),
        EditorModule,
        CloudinaryModule.forRoot(cloudinaryLib, {
            cloud_name: 'travel-diary',
            upload_preset: 'nw4fh32r'
        }),
        BrowserAnimationsModule,
        LayoutModule,
        FlexLayoutModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatMenuModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatListModule,
        MatGridListModule,
        FontAwesomeModule,
        MatMenuModule
    ],
    /* The providers array is where you list the services the app needs.
     When you list services here, they are available app-wide.
     You can scope them when using feature modules and lazy loading.*/
    providers: [
        CookieService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthenticationInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ResourceNotFoundInterceptor,
            multi: true
        },
        UserService,
        PostsService,
        ImageService,
        {provide: USER_SERVICE_STORAGE, useExisting: LOCAL_STORAGE}

    ],
    /* The providers array is where you list the services the app needs.
     When you list services here, they are available app-wide.
     You can scope them when using feature modules and lazy loading.*/
    bootstrap: [AppComponent]
})
export class AppModule {
}


