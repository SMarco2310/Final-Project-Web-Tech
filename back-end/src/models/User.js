class User {
  constructor(email, name, password, phone, role) {
    this.email = email;
    this.name = name;
    this.student_id = null;
    this.password = password;
    this.phone = null;
    this.role = role;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

const Role = {
  USER: "user",
  ADMIN: "admin",
};

export default { User, Role };
