import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Family } from './family';
import { FamilyService } from './family.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
   
  public families: Family[];
  public editFamily: Family;
  public deleteFamily: Family;
  constructor(private familyService:FamilyService) { }
  ngOnInit(): void {
   
    this.getFamily();
  }

  public getFamily(): void {
    this.familyService.getFamily().subscribe((response:Family[]) =>{
      this.families=response;
    },(error:HttpErrorResponse)=>{
      alert(error.message);
    })
  }

  public searchFamily(key:string):void{
    console.log(key);
   const results:Family[] =[];
   for(const familyee of this.families){
     if(familyee.familyName.toLowerCase().indexOf(key.toLowerCase())!==-1
     ||familyee.jobTitle.toLowerCase().indexOf(key.toLowerCase())!==-1
     ||familyee.email.toLowerCase().indexOf(key.toLowerCase())!==-1){
       results.push(familyee);
     }
   }
   this.families=results;
   if(results.length===0 || !key){
     this.getFamily();
   }
  }

  public updateFamily(family:Family):void{
    document.getElementById('edit-form-cicked').click();
    this.familyService.updateFamily(family).subscribe((response:Family)=>{
      console.log(response);
      this.getFamily();

    },(error:HttpErrorResponse)=>{
      alert(error.message);

    })
   
  }
  public addFamily(form:NgForm):void{
    document.getElementById('add-form-cicked').click();
    this.familyService.addFamily(form.value).subscribe((response:Family)=>{
      console.log(response);
      this.getFamily();
      form.reset();

    },(error:HttpErrorResponse)=>{
      console.log(error.message);
    });
  }

  public deleteFamilyByID(deleteId:number):void{
    document.getElementById('delete-form-cicked').click();
    this.familyService.deleteFamily(deleteId).subscribe((response:void)=>{
       this.getFamily();
    },(error:HttpErrorResponse)=>{
      alert(error.message);
    });

  }

  public openModal(family:Family,event:string):void{
    const container = document.getElementById('main-conatiner');
    const button = document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-bs-toggle','modal');
    if(event === 'add'){
      button.setAttribute('data-bs-target','#exampleModal');
    }
    if(event === 'edit'){
      this.editFamily=family;
      button.setAttribute('data-bs-target','#editModal');
    }
    if(event === 'delete'){
      this.deleteFamily=family;
      button.setAttribute('data-bs-target','#deleteModal');
    }

    container.appendChild(button);
    button.click();
  }
}
