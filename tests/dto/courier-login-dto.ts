import { LoginDto } from './login-dto'

export class CourierLoginDto extends LoginDto {
  courierId: number

  private constructor(username: string, password: string, courierId: number) {
    super(username, password)
    this.courierId = courierId
  }

  static createCourierLogin(): CourierLoginDto {
    return new CourierLoginDto('user1', 'password1', 2818)
  }
}
