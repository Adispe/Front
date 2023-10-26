import { Component } from '@angular/core';

interface UserProfile {
  name: string;
  email: string;
  bio: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: UserProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'I am a software developer passionate about Angular and web technologies.'
  };
}
