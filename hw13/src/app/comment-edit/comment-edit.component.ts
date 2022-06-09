import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../domain/comment';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css']
})
export class CommentEditComponent implements OnInit {

  bookId: string | null = '';
  
  formComment = new FormGroup({
    comment: new FormControl('', Validators.required)
  });

  get commentControl() {
    return this.formComment.controls['comment'];
  }

  constructor(private location: Location, private authService: AuthService, private route: ActivatedRoute, private commentService: CommentService) { }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');
  }

  onSubmit() {
    if (this.formComment.valid) {
      const comment: Comment = {
        id: null,
        text: this.commentControl.value,
        author: this.authService.userDetails.fullName,
        bookId: this.bookId
      }
      this.commentService.addComment(comment).subscribe(() => this.goBack());
    } else {
      Object.keys(this.formComment.controls).forEach(key => {
        this.formComment.controls[key].markAsDirty();
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

}
