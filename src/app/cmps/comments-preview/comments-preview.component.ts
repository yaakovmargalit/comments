import {  ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'comments-preview',
  templateUrl: './comments-preview.component.html',
  styleUrls: ['./comments-preview.component.scss'],
})
export class CommentsPreviewComponent implements OnInit {
  @Input() comment: any
  isAns: boolean = false
  newCommemtTxt = ''
  constructor(private userService: UsersService,
    private commentService: CommentsService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }
  toggelAns(ev) {
    ev.stopPropagation()
    this.isAns = !this.isAns
  }
  onAddComment(ev) {
    ev.preventDefault()
    if(!this.newCommemtTxt)return
    this.commentService.addComment({
      by: this.userService.getCurrUser(),
      txt: this.newCommemtTxt,
      ownerId: this.userService.getCurrUser().id,
      parentCommentId: this.comment.id,
      createdAt: Date.now()
    })
  }
  checkUser() {
    return this.userService.checkLogin(this.comment.by.id)
  }

  onDeleteComment(ev) {
    ev.stopPropagation()
    this.commentService.deleteComment(this.comment.id)
  }
  onEditComment(ev) {
    ev.stopPropagation()
    this.comment.txt = prompt('New value')
    if(!this.comment.txt)return
    this.commentService.editComment(this.comment)
  }
}
