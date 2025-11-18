class User {
  constructor(id, email, name, password) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.student_id = null;
    this.password = password;
    this.phone = null;
    this.role = Role.USER;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

const Role = {
  USER: "user",
  ADMIN: "admin",
};

export default { User, Role };
