import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent implements OnInit {
  @Input() currUser
  newComment: ''
  constructor(private commemtService:CommentsService) { }

  ngOnInit(): void {
  }
  onAddComment(ev) {
    ev.preventDefault()
    console.log(this.newComment);
    
    this.commemtService.addComment({
      by: this.currUser,
      txt: this.newComment,
      ownerId: this.currUser.id,
      parentCommentId: null,
      createdAt: Date.now()
    })
    this.newComment=''
  }

}
