import { Injectable } from '@angular/core';

import { BehaviorSubject, map, Observable } from 'rxjs';
import { Icomment } from '../modles/comment.interface';
import * as commentsJson from '../../assets/comments.json';
import { UsersService } from './users.service';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private commentsDB: Icomment[] = commentsJson.default


  private _comments$ = new BehaviorSubject<Icomment[]>([])
  public comments$ = this._comments$.asObservable()
  constructor(private usersService: UsersService) { }

  public loadComments(): void { //Loads the responses and prepares them for presentation
    const locals: Icomment[] = JSON.parse(localStorage.getItem('comments'))
    if (!locals || !locals.length) {
      localStorage.setItem('comments', JSON.stringify(this.commentsDB))
    }
    this.commentsDB = JSON.parse(localStorage.getItem('comments'))
    this._comments$.next(this.buildComments())
  }

  public buildComments() {//Constructs the responses 
    const comments = []
    this.commentsDB.forEach(comment => {
      if (!comment.parentCommentId) {
        comments.push({
          ...comment,
          by: this.usersService.getById(comment.ownerId),
          comments: this.buildNested(comment)
        })
      }
    })
    return comments.sort((a, b) => new Date( b.createdAt).getTime() - new Date( a.createdAt).getTime() )
  }

  public buildNested(comment) {//Constructs the responses nested by recursion
    const nes = []
    this.commentsDB.forEach(comm => {
      if (comm.parentCommentId == comment.id) {
        nes.push({
          ...comm,
          by: this.usersService.getById(comm.ownerId),
          comments: this.buildNested(comm) || null
        })
      }
    })
    return nes.sort((a, b) => new Date( b.createdAt).getTime() - new Date( a.createdAt).getTime() )

  }

  public addComment(newComment) {
    newComment.id =this._makeId()
    this.commentsDB.push(newComment)    
    localStorage.setItem('comments', JSON.stringify(this.commentsDB))
    this._comments$.next(this.buildComments())
  }

  public editComment(comment) {
    comment.createdAt = Date.now()
    const idx = this.commentsDB.findIndex(comm => comm.id === comment.id)
    this.commentsDB.splice(idx, 1, comment)
    localStorage.setItem('comments', JSON.stringify(this.commentsDB))
    this._comments$.next(this.buildComments())

  }

  public deleteComment(commentId) {//Delete the selected response and all its children by recursion
    this.commentsDB = this.commentsDB.filter(comm => comm.id !== commentId)
    this.commentsDB.forEach(comm => {
      if (comm.parentCommentId === commentId) {
        this.deleteComment(comm.id)
      }
    })
    localStorage.setItem('comments', JSON.stringify(this.commentsDB))
    this._comments$.next(this.buildComments())
  }

  private _makeId(length = 5) {
    var text = "";
    var possible = "0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return +text;
  }
}
