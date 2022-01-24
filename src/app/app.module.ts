import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CommentsContainerComponent } from './pages/comments-container/comments-container.component';
import { CommentsPreviewComponent } from './cmps/comments-preview/comments-preview.component';
import { CommentsComponent } from './cmps/comments/comments.component';
import { TimeAgoPipe } from './services/time-ago.pipe';
import { UserInputComponent } from './cmps/user-input/user-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CommentsContainerComponent,
    CommentsPreviewComponent,
    CommentsComponent,
    TimeAgoPipe,
    UserInputComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
