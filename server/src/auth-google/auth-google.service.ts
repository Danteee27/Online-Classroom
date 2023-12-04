import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SocialInterface } from '../social/interfaces/social.interface';
import { AuthGoogleLoginDto } from './dto/auth-google-login.dto';

@Injectable()
export class AuthGoogleService {
  constructor() {}

  async getProfileByToken(
    loginDto: AuthGoogleLoginDto,
  ): Promise<SocialInterface> {
    const userInfo = await axios
      .get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${loginDto.access_token}` },
      })
      .then((res) => res.data);

    return {
      id: userInfo.sub,
      email: userInfo.email,
      firstName: userInfo.familyName,
      lastName: userInfo.givenName,
    };
  }
}
