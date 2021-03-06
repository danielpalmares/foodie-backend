import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { IAuthenticationRequestDTO } from './AuthenticationDTO';
import { JWT_SECRET, JWT_EXPIRATION } from '../../../config/jwt';

export class AuthenticationUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IAuthenticationRequestDTO) {
    Object.entries(data).map(data => {
      if (!data[1].replace(/\s+/g, '')) throw new Error('Fields are invalid.');
    });

    const { username, password } = data;

    const user = await this.usersRepository.findToAuthenticate(username);
    if (!user) throw new Error('Username wrong. Please try again.');

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect)
      throw new Error('Password wrong. Please try again.');

    const userData = {
      id: user.user_id,
      name: user.name,
      username: user.username,
    };

    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '48h' });
    return token;
  }
}
