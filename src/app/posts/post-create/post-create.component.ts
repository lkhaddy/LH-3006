import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Post } from '../post.model';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  post: Post;
  private mode = 'create';
  private postId: string;

  constructor(public postsService: PostService, public route: ActivatedRoute){}

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.post = {id: postData._id, title: postData.title, content: postData.content };
        });
      } else{
        this.mode = 'create';
        this.postId = null;
      }

    });
  }


  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post: Post = {
      id: form.value.id,
      title: form.value.title,
      content: form.value.content
  };
    if (this.mode === 'create') {
      this.postsService.addPosts(form.value.title, form.value.content);
    } else{
      this.postsService.updatePost(this.postId, form.value.title, form.value.content)
    }
    form.resetForm();
  }
}
