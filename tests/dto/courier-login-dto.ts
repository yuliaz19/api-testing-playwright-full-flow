export class CourierLoginDto {
  username: string
  password: string
  courierId: number

  private constructor(username: string, password: string, courierId: number) {
    this.username = username
    this.password = password
    this.courierId = courierId
  }

  static createCourierLogin(): CourierLoginDto {
    return new CourierLoginDto('user1', 'password1', 2818)
  }
}
