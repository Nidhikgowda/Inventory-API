// Very simple helper to create a user object

export function createUser({ id, name, email, password, role }) {
  return { id, name, email, password, role };
}