import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-profie-pic',
  templateUrl: './profie-pic.component.html',
  styleUrls: ['./profie-pic.component.scss']
})
export class ProfiePicComponent implements OnInit {

  profilePics: Array<any> = new Array<any>();

  constructor(
    public dialogRef: MatDialogRef<ProfiePicComponent>,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.firebaseService.getProfile()
    .subscribe(data => this.profilePics = data);
  }

  close(profilePic){
    this.dialogRef.close(profilePic);
  }

}
