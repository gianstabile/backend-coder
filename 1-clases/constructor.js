class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = [];
    this.mascotas = [];
  }
  //método para el nombre completo
  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }
  //método para agregar una mascota
  addMascota(mascota) {
    this.mascotas = [...this.mascotas, mascota];
  }
  //métodos para contar la cantidad de mascotas
  countMascotas() {
    return this.mascotas.length;
  }
  //método para agregar un libro
  addBook(titulo, autor) {
    this.libros = [...this.libros, { titulo, autor }];
  }
  //método para mostrar los libros
  getBookNames() {
    const bookName = this.libros.map((item) => item.titulo);
    return bookName;
  }
}

// crear un nuevo usuario
const usuario = new Usuario("Gianni", "Stabile");

//agregar mascotas
usuario.addMascota("Canario");
usuario.addMascota("Hámster");
usuario.addMascota("Gato");

//agregar libros
usuario.addBook("Ulises", "James Joyce");
usuario.addBook("Sobre héroes y tumbas", "Ernesto Sábato");
usuario.addBook("La insoportable levedad del ser", "Milan Kundera");

//imprimimos por consola los datos del usuario
console.log("Nombre completo: " + usuario.getFullName());
console.log("Número de mascotas: " + usuario.countMascotas());
console.log("Libros en su haber: " + usuario.getBookNames());
