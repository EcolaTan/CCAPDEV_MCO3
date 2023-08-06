import { Component, Input, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/data_types/user';
import { ProfileService } from 'src/app/data-services/profile.service';
import { Settings } from 'src/app/data_types/settings';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {
  @Input() activeUser!: User;
  password_modal_open = false;
  bannerImageSrc: string | ArrayBuffer | null = null;
  avatarImageSrc: string | ArrayBuffer | null = null;

  settings = this.formBuilder.group({
    display_name: ["", [Validators.maxLength(30), Validators.required]],
    about: ["", [Validators.maxLength(200)]],
  });

  display_name_counter = 30;
  about_counter = 200;

  constructor(private formBuilder: NonNullableFormBuilder, private profileService: ProfileService, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.settings.get("display_name")?.valueChanges.subscribe((value) => {
      if (value !== undefined) {
        this.display_name_counter = 30 - value!.length;
      }
    });

    this.settings.get("about")?.valueChanges.subscribe((value) => {
      if (value !== undefined) {
        this.about_counter = 200 - value!.length;
      }
    });
  }

  listenCloseEvent(closeEvent: boolean) {
    this.password_modal_open = closeEvent;
  }

  togglePasswordModal() {
    this.password_modal_open = true;
  }
  
  onAvatarContainerClick(): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
  
    fileInput.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
  
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.avatarImageSrc = reader.result;
        };
        reader.readAsDataURL(file);
  
        const formData = new FormData();
        formData.append('file', file);
        this.http.post(`https://ccpadev-mco3.onrender.com/user/${this.activeUser._id}/settings/avatar`, formData).subscribe(response => {
        });
      }
    });
    fileInput.click();
  }

  async onSubmit(event: Event) {
    event.preventDefault()

    const settings = new Settings((this.settings.value.display_name! === "") ? this.activeUser.name : this.settings.value.display_name!, this.settings.value.about!)
    this.profileService.updateUserSettings(settings);
    this.settings.reset()
    this.router.navigate([""])
  }
}
