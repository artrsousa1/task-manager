const request = require('supertest');
const app = require('../server');
const jwt = require('jsonwebtoken');

let token;

beforeAll(async () => {
    token = jwt.sign({ id: 1, username: 'admin' }, process.env.ACCESS_TOKEN_SECRET);
});

afterAll(() => {
    
});

it('should create a new task', async () => {
    const response = await request(app)
        .post('/api/task')
        .set('Authorization', `Bearer ${token}`)
        .send({title: 'Task 1', status: 'pending', description: 'Description of task 1'})
    
    expect(response.statusCode).toBe(201);
});

it('should not create a task without title', async () => {
    const response = await request(app)
        .post('/api/task')
        .set('Authorization', `Bearer ${token}`)
        .send({status: 'pending', description: 'Description of task 1'})
    
    expect(response.statusCode).toBe(400);
});

it('should get all tasks', async () => {
    const response = await request(app)
        .get('/api/task')
        .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
});

it('should update a task', async () => {
    const testTask = await request(app)
        .post('/api/task')
        .set('Authorization', `Bearer ${token}`)
        .send({title: 'Task title', status: 'pending', description: 'Description of task'});
    
    const taskId = testTask.body.data.id;

    const response = await request(app)
        .put(`/api/update_task/${taskId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({title: 'Task title updated', status: 'done', description: 'Description of task updated'});
    
    expect(response.statusCode).toBe(200);
});

it('should delete a task', async () => {
    const testTask = await request(app)
        .post('/api/task')
        .set('Authorization', `Bearer ${token}`)
        .send({title: 'Task title', status: 'pending', description: 'Description of task'});
    
    const taskId = testTask.body.data.id;

    const response = await request(app)
        .delete(`/api/delete_task/${taskId}`)
        .set('Authorization', `Bearer ${token}`);
    
    expect(response.statusCode).toBe(200);
});

it('should return 404 for invalid task id', async() => {
    const response = await request(app)
        .put('/api/update_task/9999999')
        .set('Authorization', `Bearer ${token}`)
        .send({title: 'Task title', status:'pending', description: 'Description of task'});
    
    expect(response.statusCode).toBe(404);
})

it('should return 403 when a user tries to update another users task', async () => {
    const userToken = jwt.sign({id: 2, username: 'otherUser'}, process.env.ACCESS_TOKEN_SECRET);

    const newTask = await request(app)
        .post('/api/task')
        .set('Authorization', `Bearer ${token}`)
        .send({title: 'Task title', status:'pending', description: 'Description of task'});

    const taskId = newTask.body.data.id;

    const response = await request(app)
        .put(`/api/update_task/${taskId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({title: 'Task title updated', status: 'done', description: 'Description of task updated'});
    
    expect(response.statusCode).toBe(403);
});

it('should return 403 when a user triees to delete another users taks', async() => {
    const userToken = jwt.sign({id: 2, username: 'otherUser'}, process.env.ACCESS_TOKEN_SECRET);

    const newTask = await request(app)
        .post('/api/task')
        .set('Authorization', `Bearer ${token}`)
        .send({title: 'Task title', status:'pending', description: 'Description of task'});

    const taskId = newTask.body.data.id;

    const response = await request(app)
        .delete(`/api/delete_task/${taskId}`)
        .set('Authorization', `Bearer ${userToken}`)

    expect(response.statusCode).toBe(403);
});