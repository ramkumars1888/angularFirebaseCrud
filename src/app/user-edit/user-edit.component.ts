import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ProfiePicComponent } from "../profie-pic/profie-pic.component";
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  editUserForm: FormGroup;
  item: any;

  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'surname': [
      { type: 'required', message: 'Surname is required.' }
    ],
    'age': [
      { type: 'required', message: 'Age is required.' },
    ]
  };

  constructor(
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    })
  }

  createForm() {
    this.editUserForm = this.fb.group({
      name: [this.item.name, Validators.required],
      surname: [this.item.surname, Validators.required],
      age: [this.item.age, Validators.required]
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProfiePicComponent, {
      height: '400px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.item.avatar = result.link;
      }
    });
  }

  onSubmit(value){
    value.avatar = this.item.avatar;
    value.age = Number(value.age);
    this.firebaseService.updateUser(this.item.id, value)
    .then(
      res => {
        this.router.navigate(['/home']);
      }
    )
  }

  delete(){
    this.firebaseService.deleteUser(this.item.id)
    .then(
      res => {
        this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
      }
    )
  }

  cancel(){
    this.router.navigate(['/home']);
  }

}
