const { sequelize } = require('../models');

beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true});
});

afterAll(async () => {
    await sequelize.close();
});

test('should create a new user', async () => {
    const User = sequelize.models.User;

    const user = await User.create({firstName: 'João', username: 'joao123', email: 'joao@test.com', password:'password'})
    expect(user).toBeDefined();
    expect(user.firstName).toBe('João');
})

test('invalid user should not be created', async () => {
    const User = sequelize.models.User;

    const invalidUser = {
        firstName: 'João',
        email: '',
        password: ''
    };
    
    await expect(User.create(invalidUser)).rejects.toThrow();
});

test('should not create user with same username', async () => {
    const User = sequelize.models.User;
    const userData1 = {
        firstName: 'Maria',
        username: 'maria123',
        email: 'maria@test.com',
        password: 'password',
    }

    const userData2 = {
        firstName: 'Maria Helena',
        username: 'maria123',
        email: 'mariahelena@test.com',
        password: 'password',
    }

    await User.create(userData1);
    await expect(User.create(userData2)).rejects.toThrow();
});

test('should not create user with same email', async () => {
    const User = sequelize.models.User;
    const userData1 = {
        firstName: 'Lucas',
        username: 'lucas123',
        email: 'lucas@test.com',
        password: 'password',
    }

    const userData2 = {
        firstName: 'Lucas',
        username: 'lucaas',
        email: 'lucas@test.com',
        password: 'password',
    }

    await User.create(userData1);
    await expect(User.create(userData2)).rejects.toThrow();
});

