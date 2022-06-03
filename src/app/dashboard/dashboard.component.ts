import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public users : any;
  orderHeader!:string
  isDescOrder : boolean = true;
  searchText: any = {name:'',mobile:''};

  searchString : any;
  p:number = 1;

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.getUserdata();
  }
  getUserdata(){
    this.service.getUser()
    .subscribe(res => {
      this.users = res;
      console.log(this.users);
      
    })
  }
  deleteUserdata(id:any){
    if(confirm("Are you sure to delete")){
      this.service.deleteUser(id)
      .subscribe(res =>{
        alert("Data successfully deleted");
        this.getUserdata();
      })
    }
  }
  sort(headerName:string){
    this.isDescOrder = !this.isDescOrder;
    this.orderHeader = headerName;
  }

}
