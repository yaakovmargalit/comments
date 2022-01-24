import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() comments;

  constructor(private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cd.markForCheck()

  }

}
