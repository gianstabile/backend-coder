export default class GetCurrentUserDTO {
  constructor(user) {
    this.name = user.name;
    this.email = user.email;
    this.rol = user.rol;
    this.cart = user.cart;
  }
}
