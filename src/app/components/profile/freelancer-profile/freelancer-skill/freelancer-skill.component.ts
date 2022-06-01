import { Skill } from './../../../../models/skill';
import { ToastrService } from 'ngx-toastr';
import { SkillService } from './../../../../services/skill.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Freelancer } from './../../../../models/freelancer';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-freelancer-skill',
  templateUrl: './freelancer-skill.component.html',
  styleUrls: ['./freelancer-skill.component.css'],
})
export class FreelancerSkillComponent implements OnInit {
  @Input() freelancer: Freelancer = {};
  skillAddForm: FormGroup;
  selectedSkill: Skill = {};

  constructor(
    private formBuilder: FormBuilder,
    private skillService: SkillService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createSkillAddForm();
  }

  createSkillAddForm() {
    this.skillAddForm = this.formBuilder.group({
      freelancerId: [this.freelancer.id, Validators.required],
      name: ['', Validators.required],
    });
  }

  addSkill() {
    if (this.skillAddForm.valid) {
      let skillModel = Object.assign({}, this.skillAddForm.value);
      this.skillService.add(skillModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.freelancer.skills.push(response.data);
          this.ngOnInit();
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message, 'Hata');
        }
      );
    } else {
      this.toastrService.warning(
        'Lütfen tüm alanları eksiksiz doldurun',
        'Dikkat'
      );
    }
  }

  selectSkill(skill: Skill) {
    this.selectedSkill = skill;
  }

  deleteSkill(id: number) {
    if (this.selectedSkill) {
      this.skillService.delete(id).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.freelancer.skills = this.freelancer.skills.filter(
            (x) => x.id != id
          );
          this.ngOnInit();
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message, 'Hata');
        }
      );
    }
  }
}
