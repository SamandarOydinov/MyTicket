export const customerStub = () => {
  return {
    id: 1,
    firstname: 'customerfirst1',
    lastname: 'customerlast1',
    phone: '998999999999',
    password: '12345678',
    birth_date: new Date(),
    email: 'customer1@gmail.uz',
    gender: 'erkak',
    langId: 1,
    hashedRefreshToken: 'someHashedToken',
  };
};
