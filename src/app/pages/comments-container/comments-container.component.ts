import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Icomment } from 'src/app/modles/comment.interface';
import { iuser } from 'src/app/modles/user.interface';
import { CommentsService } from 'src/app/services/comments.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'comments-container',
  templateUrl: './comments-container.component.html',
  styleUrls: ['./comments-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsContainerComponent implements OnInit, OnDestroy{
  comments$: Observable<Icomment[]>
  currUser$: Observable<iuser>
  currUser: iuser
  subscription: Subscription

  constructor(private commentsService: CommentsService, private userService: UsersService) {
  
   }
  users: iuser[] = this.userService.getUsers()

  ngOnInit(): void {
    this.commentsService.loadComments()
    this.comments$ = this.commentsService.comments$
    this.subscription = this.userService.user$.subscribe(user => {
      
      this.currUser = user
    })
  }
  setCurrUser(ev) {
    this.userService.setCurrUser(ev)
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }
}
